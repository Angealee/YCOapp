import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Setting from './pages/Setting';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Quiz">
            <Quiz />
          </Route>
          <Route path="/Setting">
            <Setting/>
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">

          /* Home Tab */
          <IonTabButton tab="Home" href="/Home">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Quarter</IonLabel>
          </IonTabButton>

          /* Quiz Tab */
          <IonTabButton tab="Quiz" href="/Quiz">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Quiz</IonLabel>
          </IonTabButton>

          /* Setting Tab */
          <IonTabButton tab="Setting" href="/Setting">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
