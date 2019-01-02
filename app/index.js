import { memory } from "system";
import { Application } from './view'
import { Screen1 } from './screen1'
import { Screen2 } from './screen2'

class MultiScreenApp extends Application {
    // List all screens
    screens = { Screen1, Screen2 }

    // "down" key handler
    onKeyDown(){
        // Switch between two screens we have.
        Application.switchTo( this.screen.constructor === Screen1 ? 'Screen2' : 'Screen1' );
    }
}

// Start the application with Screen1.
MultiScreenApp.start( 'Screen1' );

console.log("Start: " + memory.js.used + "/" + memory.js.total);
