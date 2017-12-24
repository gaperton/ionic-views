import document from "document";

/**
 * Search for the DOM element globally.
 */
export const $ = $wrap( document );

/**
 * Create $ function to search in the DOM subtree.
 */
export function $at( selector ){
  return $wrap( $( selector ) );
}

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

/**
 * View class
 */
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

/**
 * Application singleton
 */
export class Application extends View {
  set screen( view ){
    if( this._screen ) this.remove( this._screen );
    this.insert( this._screen = view ).render();
  }
  
  get screen(){ return this._screen; }
  
  static instance = null;

  static start(){
    const app = Application.instance = new this();
    app.mount();
  }
}
