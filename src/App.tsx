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
import { ellipse, square, triangle, pencilOutline, homeSharp, createSharp, settings, settingsSharp, bookSharp, pencilSharp } from 'ionicons/icons';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Setting from './pages/Setting';
import Pagsusulat from './pages/Pagsusulat';
// import '@ionic/react/css/palettes/dark.system.css';

// Quarter pages
import Quarter1 from './pages/quarter/Quarter1';
import Quarter1Aralin1 from './pages/lessons/Quarter1Aralin1';
import Quarter2Aralin1 from './pages/lessons/Quarter2Aralin1';
import Quarter2 from './pages/quarter/Quarter2';
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
import '@ionic/react/css/palettes/dark.class.css';
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
import Aralin1 from './pages/quiz/Aralin1';


setupIonicReact();

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>

          {/* Core Tabs */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/pagsusulat" component={Pagsusulat} />
          <Route exact path="/setting" component={Setting} />
              {/* Pagsusulit  */}
              <Route exact path="/pagsusulit/aralin1" component={Aralin1}/>

              {/* Quarter 1 */}
              <Route exact path="/quarter/1" component={Quarter1} />
                {/* Aralin Lessons */}
                <Route exact path="/quarter/1/aralin/:id" component={Quarter1Aralin1} />
              {/* Quarter 2 */}
              <Route exact path="/quarter/2" component={Quarter2} />
              <Route exact path="/quarter/2/aralin/:id" component={Quarter2Aralin1} />
              <Route exact path="/quarter2">
                <Quarter2 />
              </Route>


          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

        </IonRouterOutlet>

        <IonTabBar slot="bottom">

          {/* Home Tab */}
          <IonTabButton tab="Home" href="/home">
            <IonIcon aria-hidden="true" icon={ bookSharp} />
            <IonLabel>Quarter</IonLabel>
          </IonTabButton>

          {/* Quiz Tab */}
          <IonTabButton tab="Quiz" href="/quiz">
            <IonIcon aria-hidden="true" icon={createSharp} />
            <IonLabel>Pagsusulit</IonLabel>
          </IonTabButton>
        
          {/* Pagsusulat Tab */}
          <IonTabButton tab="Pagsusulat" href="/pagsusulat">
            <IonIcon icon={pencilSharp} />
            <IonLabel>Pagsusulat</IonLabel>
          </IonTabButton>

          {/* Setting Tab */}
          <IonTabButton tab="Setting" href="/setting">
            <IonIcon aria-hidden="true" icon={settingsSharp} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
