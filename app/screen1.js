import { View, $at } from './view'
import clock from 'clock'

const $ = $at( '#screen-1' );

export function Screen1(){
    show( $() ); // Extract #screen-1 element.

    // Element group.
    time = time();

    // The view state.
    seconds = 0;

    useClock( 'seconds', () =>{
        seconds++;
        render()
    });

    return function render(){
        time( seconds );
    }
}

function useClock( resolution, cb ){
    clock.granularity = resolution;
    clock.ontick = () => cb;

    onUnmount( () => {
        clock.granularity = 'off';
        clock.ontick = null;
    });
}

function useKey( key, cb ){
    const prevCb = _handlers[ key ];
    _handlers[ key ] = cb;
    
    onUnmount( () => {
        _handlers[ key ] = prevCb;
    });
}

// Elements group
function time(){
    const minutes = $( '#minutes' ),
          seconds = $( '#seconds' );

    return secs => {
        minutes.text = ( secs / 60 ) | 0;
        seconds.text = secs % 60;
    }
}