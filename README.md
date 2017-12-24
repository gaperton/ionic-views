# Ionic Views

An application for the Fitbit Ionic can quickly become a mess. This micro-framework provides basic support for View and subview patterns in less than 100 LOCs, providing the necessary structure to keep the view layer code manageable when your application grows.

## Installation

Copy `view.js` file to your project.

## API

This is really the tiny library, and its more about programming convention and design rules than the funtionality. Don't be afraid to read the code, there's almost nothing to read.

### DOM selectors

#### `function` $( selector )

jQuery-style `$` selector to access SVG DOM elements. Just two simple selectors are supported:

- `$( '#id-of-an-element' )` - will call `document.getElementById( 'id-of-an-element' )`
- `$( '.class-name' )` - will call `document.getElementsByClassName( 'class-name' )`

When called without arguments, returns the `document`.

```javascript
import { $ } from './view'

// Will search for #element globally
$( '#element' ).style.display = 'inline';
```

#### `function` $at( id-selector )

Create the $-function to search in the given DOM subtree.
Used to enforce DOM elements isulation for different views.

When called without arguments, returns the root element.

```javascript
import { $at } from './view'

const $ = $at( '#myscreen' );

// Make #element visible
$().style.display = 'inline';

// Will search descendants of #myscreen only
$( '#element' ).style.display = 'inline';
```

### `pattern` Elements Group

To group SVG elements just wrap them in the class as shown below.
This pattern allows caching of the references to SVG elements and must be preferred
to ad-hoc elements lookups.

Elements group is the lightweight alternative to subviews, and should be preferred to subviews when possible.

```javascript
class Time {
  minutes = $( '#minutes' );
  seconds = $( '#seconds' );
  
  render( seconds ){
    this.minutes.text = Math.floor( seconds / 60 );
    this.seconds.text = ( seconds % 60 ).toFixed( 2 );
  }
}

// Use an element group from the View...
class Timer extends View {
  time = new Time();
  ...
  
  render(){
    ...
    this.time.render( this.seconds )
  }
}
```

### `class` View 

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
import { $at } from './view'
const $ = $at( '#timer' );

class Timer extends View {
  el = $();
  
  onMount(){
    clock.granularity = "seconds";
    clock.ontick = this.onTick;
  }
  
  ticks = 0;
  onTick = () => {
    this.ticks++;
    this.render();
  }
  
  minutes = $( '#minutes' );
  seconds = $( '#seconds' );
  render(){
    const { ticks } = this;
    this.minutes.text = Math.floor( ticks / 60 );
    this.seconds.text = ( ticks % 60 ).toFixed( 2 );
  }
  
  onUnmount(){
    clock.granularity = "off";
    clock.ontick = null;
  }
}
```

### `class` Application

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

## Project structure

Application may consist of several screens. The following project structure is recommended for this case:

- `app/` <- standard app folder
  - `index.js` <- `Application` subclass class, which will switch the screens
  - `view.js` <- copy this file to your project
  - `screen1.js` <- each screen is defined as `View` subclass
  - `screen2/` <- if there are many modules related to the single screen, group them to the folder
  - ...
- `resources/` <- standard resources folder
  - `index.gui` <- include screens SVG files with `<link rel="import" href="screen/index.gui" />`
  - `widgets.gui` <- include screens CSS files with `<link rel="stylesheet" href="screen/styles.css" />`
  - `screen1.gui` <- put SVG for your screens to different files
  - `screen2/` <- group SVG, CSS, and images used by a screen to a folder


