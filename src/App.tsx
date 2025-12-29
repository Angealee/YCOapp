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

// Quarter pages
import Quarter1 from './pages/quarter/Quarter1';
import Quarter1Lesson from './pages/lessons/Quarter1Aralin1';
// import Quarter2 from './pages/quarter/Quarter2';
// import Quarter2Lesson from './pages/quarter/Quarter2Lesson';
// import Quarter3 from './pages/quarter/Quarter3';
// import Quarter3Lesson from './pages/quarter/Quarter3Lesson';
// import Quarter4 from './pages/quarter/Quarter4';
// import Quarter4Lesson from './pages/quarter/Quarter4Lesson';


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

// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          {/* Core Tabs */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/setting" component={Setting} />

              {/* Quarter 1 */}
              <Route exact path="/quarter/1" component={Quarter1} />
              <Route exact path="/quarter/1/aralin/:id" component={Quarter1Lesson} />
              
              <Route exact path="/quarter1">
                <Quarter1 />
              </Route>


              {/* Quarter 2 */}
              {/* <Route exact path="/quarter/2" component={Quarter2} />
              <Route exact path="/quarter/2/aralin/:id" component={Quarter2Lesson} /> */}

              {/* Quarter 3 */}
              {/* <Route exact path="/quarter/3" component={Quarter3} />
              <Route exact path="/quarter/3/aralin/:id" component={Quarter3Lesson} /> */}

              {/* Quarter 4 */}
              {/* <Route exact path="/quarter/4" component={Quarter4} /> */}
              {/* <Route exact path="/quarter/4/aralin/:id" component={Quarter4Lesson} /> */}

          {/*Default Route */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

        </IonRouterOutlet>

        <IonTabBar slot="bottom">

          {/* Home Tab */}
          <IonTabButton tab="Home" href="/home">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Quarter</IonLabel>
          </IonTabButton>

          {/* Quiz Tab */}
          <IonTabButton tab="Quiz" href="/quiz">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Quiz</IonLabel>
          </IonTabButton>

          {/* Setting Tab */}
          <IonTabButton tab="Setting" href="/setting">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
