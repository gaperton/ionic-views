import { View, $at } from './view'

// Create the root selector for the view...
const $ = $at( '#screen-2' );

export class Screen2 extends View {
    // Specify the root view element.
    // When set, it will be used to show/hide the view on mount and unmount.
    el = $();

    // Lifecycle hook executed on `view.mount()`.
    onMount(){
        // TODO: insert subviews...
        // TODO: subscribe for events...
    }

    // Lifecycle hook executed on `view.unmount()`.
    onUnmount(){
        // TODO: unsubscribe from events...
    }

    // Custom UI update logic, executed on `view.render()`.
    onRender(){
        // TODO: put DOM manipulations here...
        // Call this.render() to update UI.
    }
}

