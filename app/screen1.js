import { View, $at } from './view'
import clock from 'clock'

const $ = $at( '#screen-1' );

export class Screen1 extends View {
    // Root view element used to show/hide the view.
    el = $(); // Just the #screen-1 element.

    // Element group.
    time = new Time();

    // The view state.
    seconds = 0;

    onMount(){
        // Subscribe for the clock...
        clock.granularity = 'seconds';
        clock.ontick = this.onTick;
    }

    onTick = () => {
        // Update the state and force render.
        this.seconds++;
        this.render();
    }

    onRender(){
        // Render the elements group.
        this.time.render( this.seconds );
    }

    onUnmount(){
        // Unsubscribe from the clock
        clock.granularity = 'off';
        clock.ontick = null;
    }
}

// Elements group. Used to group the DOM elements and their update logic together.
class Time {
    // Elements...
    minutes = $( '#minutes' );
    seconds = $( '#seconds' );
    
    // UI update method(s). Can have any name, it's just the pattern.
    // Element groups have no lifecycle hooks, thus all the data required for UI update
    // must be passed as arguments.
    render( seconds ){
      this.minutes.text = ( seconds / 60 ) | 0;
      this.seconds.text = seconds % 60;
    }
}