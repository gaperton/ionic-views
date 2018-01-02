import { Application } from './view'
import { Screen1 } from './screen1'
import { Screen2 } from './screen2'

class MultiScreenApp extends Application {
    screen1 = new Screen1();
    screen2 = new Screen2();

    onMount(){
        this.screen = this.screen2; // Same as Application.switchTo( 'screen1' );

        document.onkeypress = this.switchScreens;
    }

    switchScreens = ({ key }) => {
        if( key === 'down' ){
            Application.switchTo( this.screen === this.screen1 ? 'screen2' : 'screen1' );
        }
    }
    
}

MultiScreenApp.start();