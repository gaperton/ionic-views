import { View, $at } from './view'
import { clock } from 'clock'

const $ = $at( '#screen-1' );

export class Screen1 extends View {
    el = $();
    time = $( '#current-time' );

    onMount(){
        clock.granularity = 'seconds';
        clock.ontick = () => this.render();
    }

    onUnmount(){
        clock.granularity = 'off';
        clock.ontick = null;
    }

    onRender(){
        this.time.text = new Date();
    }
}

