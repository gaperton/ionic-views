/// <reference path="./types.d.ts" />
import document from 'document';
import { display } from 'display';

export function $( q : string, el : any = document ){
  const queries = q.split( /\s+/ );

  let res : any = el;

  for( let i = 0; i < queries.length; i++ ){
    const q = queries[ i ];
    
    if( q[ 0 ] === '#' ){
      res = res.getElementById( q.substr( 1 ) );
    }
    else{
      res = [ res ];

      for( ; i < queries.length; i++ ){
        res = dooFind( queries[ i ], res ); 
      }

      break;
    }
  }

  return res;
}

function dooFind( q, elements ) {
  const head = q[0];
  let res = [];

  for( let el of elements ){
    if( head === '#' ){
      const found = el.getElementById( q.substr( 1 ) )
      found && res.push( found );
    }
    else{
      res = res.concat( head === '.' ? 
        el.getElementsByClassName( q.substr( 1 ) ) : 
        el.getElementsByTypeName( q )
      );
    }
  }

  return res;
}

export function $wrap( element ){
  return selector => selector ? $( selector, element ) : element;
}

export function $at( selector ){
  return $wrap( $( selector ) );
}

function show( view, yes ){
  const { el } = view;
  if( el ) el.style.display = yes ? 'inline' : 'none';  
}

function mount( view ){
  show( view, true );
  view.onMount( view.options );
}

function unmount( view ){
  for( let subview = this.child; subview; subview = subview.next ){
    unmount( subview );
  }

  this.child = void 0;
    
  view.onUnmount();
  show( view, false );
}

export class View {
  constructor( public options : object ){
    if( options ) this.options = options;
  }

  protected next : View
  protected child : View

  onRender : () => void
  
  insert( subview ){
    subview.next = this.child;
    this.child = subview;

    mount( subview );
    return this;
  }

  remove( subview ){
    for( let child = this.child, prev : View = this; child; prev = child, child = child.next ){
      if( child === subview ){
        prev.next = child.next;
        unmount( child );
        break;
      }
    }
  }

  render(){
    if( display.on ){
      for( let subview = this.child; subview; subview = subview.next ){
        subview.render();
      }

      this.onRender();
    }
  }
}

const ViewProto = View.prototype;
ViewProto.onKeyDown = ViewProto.onKeyUp = ViewProto.onMount = ViewProto.onUnmount = ViewProto.onRender = function(){};

export class Application extends View {
  get screen(){ return this.child }

  setScreen( s ){
    this.remove( this.child );

    // Poke the display so it will be on after the screen switch...
    display.poke();

    this.insert( s ).render();    
  }
  
  // Switch the screen
  static instance : Application;

  static switchTo( screenName ){
    const { instance } = Application;
    instance.setScreen( new instance.screens[ screenName ]() );
  }

  static start( screen ){
    // Instantiate and mount an application.
    const app = Application.instance = new this();
    Application.switchTo( screen );
    mount( app );
    
    // Refresh UI when the screen in on.
    display.onchange = () => {
      app.render();
    }
    
    document.onkeypress = ({ key }) => {
      if( key === 'down' ) app.onKeyDown();
      else if( key === 'up' ) app.onKeyUp();
    }
  }

  onKeyDown(){
    this.screen.onKeyDown(); 
  }

  onKeyUp(){
    this.screen.onKeyUp(); 
  }
}
