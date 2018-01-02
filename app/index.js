import { Application } from './view'
import { Screen1 } from './screen1'
import { Screen2 } from './screen2'

class MultiScreenApp extends Application {
    screen1 = new Screen1();
    screen2 = new Screen2();

    // Called once on application's start...
    onMount(){
        // Set initial screen.
        // Same as Application.switchTo( 'screen1' ), which might be used to switch screen from anywhere.
        this.screen = this.screen2; 

        document.onkeypress = this.onKeyPress;
    }

    // Event handler, must be pinned down to the class to preserve `this`.
    onKeyPress = ({ key }) => {
        if( key === 'down' ){
            // Just switch between two screens we have.
            Application.switchTo( this.screen === this.screen1 ? 'screen2' : 'screen1' );
        }
    }
    
}

// Create and start the application.
MultiScreenApp.start();