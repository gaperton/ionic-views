import document from "document";
import { display } from "display";

// Main DOM search method.
export function $( query, el ){
  const selectors = query.match(/\.|#|\S+/g);
  let root = el || document;
  
  for( let i = 0; root && i < selectors.length; i++ ){
    const s = selectors[ i ];
    root = s === '#' ? $id( selectors[ ++i ], root ) :
           s === '.' ? $classAndType( 'getElementsByClassName', selectors[ ++i ], root ) :
                       $classAndType( 'getElementsByTypeName', s, root );
  }

  return root;
}

// Search subtrees by id...
function $id( id, arr ){
  if( Array.isArray( arr ) ){
    const res = [];

    for( let el of arr ){
      const x = el.getElementById( id );
      if( x ) res.push( x );
    }
  
    return res;
  }

  return arr.getElementById( id );
}

// Search subtrees by class or type...
function $classAndType( method, arg, arr ){
  if( Array.isArray( arr ) ){
    const res = [];

    for( let el of arr ){
      for( let el2 of el[ method ]( arg ) ){
        res.push( el2 );
      }
    }
  
    return res;
  }

  return arr[ method ]( arg );
}

export function $wrap( element ){
  return selector => selector ? $( selector, element ) : element;
}

$.wrap = $wrap;

export function $at( selector ){
  return $wrap( $( selector ) );
}

$.at = $at;

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
