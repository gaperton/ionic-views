# Ionic Views

An application for the Fitbit Ionic can quickly become a mess. This micro-framework provides basic support for View and subview patterns in less than 100 LOCs, providing the necessary structure to keep the view layer code manageable when your application grows.

## Installation

Copy `view.js` file to your project.

## Architecture

### Elements Group

To group SVG elements wrap them in the class.

```javascript
class Time {
  minutes = $( '#minutes' );
  seconds = $( '#seconds' );
  
  render( seconds ){
    this.minutes.text = Math.floor( seconds / 60 );
    this.seconds.text = ( seconds % 60 ).toFixed( 2 );
  }
}
```

### View

View is the stateful group of elements. The difference from the elements group is that views can me contained in each other and they have `onMount`/`onUnmount` lifecycle hooks. API:

- `view.el` - root view element. Used to show and hide the view.
- `view.mount()` - make the `subview.el` visible, call the `subview.onMount()` hook.
- `view.onMount()` - place to insert subviews and register events listeners.
- `view.render()` - render the view and all of its subviews.
- `view.unmount()` - hide the `subview.el`, unmount all the subviews, call the `view.onUnmount()` hook.
- `view.onUnmount()` - place to unregister events listeners.
- `view.insert( subview )` - insert and mount the subview.
- `view.remove( subview )` - remove the unmount the subview.

Example:

```javascript
const $ = $at( '#timer' );

class Timer extends View {
  el = $();
  
  onMount(){
    clock.granularity = "seconds";
    clock.ontick = this.onTick;
  }
  
  seconds = 0;
  onTick = () => {
    this.seconds++;
    this.render();
  }
  
  render(){
    this.minutes.text = Math.floor( seconds / 60 );
    this.seconds.text = ( seconds % 60 ).toFixed( 2 );
  }
  
  onUnmount(){
    clock.granularity = "off";
    clock.ontick = null;
  }
}
```

### Application

Application is the main view having the single `screen` subview.
It's the singleton which is globally accessible through the `Application.instance` variable.

```javascript
class MyApp extends Application {
  onMount(){
    this.screen = new LoadingView();
  }
  
  screen1(){
    this.screen = new Screen2View();
  }
  
  screen2(){
    this.screen = new Screen2View();
  }
}

MyApp.start();

...
// To switch the screen, use:
Application.instance.screen2();
```

## API Reference

### DOM selectors

```javascript
import { $, $at } from './view'
```

#### `function` $( selector )

Search DOM globally.

#### `function` $at( selector )

Create the function to search in the DOM subtree.
