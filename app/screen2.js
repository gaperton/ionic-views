import { View, $at } from './view'

const $ = $at( '#screen-2' );

export class Screen1 extends View {
    el = $();

    onMount(){
        // TODO: insert subviews...
        // TODO: subscribe for events...
    }

    onUnmount(){
        // TODO: unsubscribe from events...
    }

    onRender(){
        // TODO: put DOM manipulations here...
        // Call this.render() to update UI.
    }
}

