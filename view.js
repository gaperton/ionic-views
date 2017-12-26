import document from "document";
import { display } from "display";

export const $ = $wrap( document );

export function $wrap( element ){
  return selector => {
    if( selector ){
      const symbol = selector.substr( 1 );
      return selector[ 0 ] === '.' ?
            element.getElementsByClassName( symbol ) :
            element.getElementById( symbol );            
    }

    return element;
  }
}

export function $at( selector ){
  return $wrap( $( selector ) );
}

export class View {
  // el = $( '#your-view-id' )
  _subviews = [];

  constructor( options = {} ){
    this.options = options;
  }
  
  mount(){
    const { el } = this;
    if( el ) el.style.display = 'inline';
    this.onMount( this.options );
    return this;
  }

  // Callback called when view is mounted.
  onMount(){}
  
  insert( subview ){
    this._subviews.push( subview );
    return subview.mount();
  }

  unmount(){
    for( let subview of this._subviews ){
      subview.unmount();
    }
    
    this._subviews = [];
    
    this.onUnmount();
    
    const { el } = this;
    if( el ) el.style.display = 'none';
  }    
  
  // Callback called before view will be removed.
  onUnmount(){}

  remove( subview ){
    const { _subviews } = this;
    _subviews.splice( _subviews.indexOf( subview ), 1 );
    subview.unmount();
  }

  render(){
    for( let subview of this._subviews ){
      subview.render();
    }
  }    
}

export class Application extends View {
  // Current application screen.
  set screen( view ){
    if( this._screen ) this.remove( this._screen );
    this.insert( this._screen = view ).render();
  }
  
  get screen(){ return this._screen; }
  
  // Switch the screen
  static switchTo( screenName ){
    // Poke the display so it will be on after the screen switch...
    display.poke();
    const { instance } = Application;
    instance.screen = instance[ screenName ];
  }

  render(){
    // Prevent render when screen is off.
    if( display.on ){
      super.render();
    }
  }

  // Application is the singleton. Here's the instance.
  static instance = null;

  static start(){
    // Instantiate and mount an application.
    const app = Application.instance = new this();
    app.mount();
    
    // Refresh UI when the screen in on.
    display.onchange = () => {
      app.render();
    }
  }
}
