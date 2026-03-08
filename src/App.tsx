import { useEffect, useRef } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
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
import { pencilSharp, createSharp, bookSharp } from 'ionicons/icons';

import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Setting from './pages/Setting';
import Pagsusulat from './pages/Pagsusulat';
import WelcomeVideoPage from './pages/WelcomeVideoPage';
import { SplashScreen } from '@capacitor/splash-screen';

import Quarter1 from './pages/quarter/Quarter1';
import Quarter1Aralin1 from './pages/lessons/Quarter1Aralin1';
import Quarter2Aralin1 from './pages/lessons/Quarter2Aralin1';
import Quarter2 from './pages/quarter/Quarter2';
import Quarter3 from './pages/quarter/Quarter3';
import Quarter3Aralin from './pages/lessons/Quarter3Aralin';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.class.css';
import './theme/variables.css';

setupIonicReact();

// ─────────────────────────────────────────────
// TABS — all in-app screens live here
// ─────────────────────────────────────────────
const Tabs: React.FC = () => {
  const location = useLocation();
  const hasStartedGuideRef = useRef(false);

  useEffect(() => {
    const shouldStartGuide = sessionStorage.getItem('yco_start_guide') === '1';
    if (!shouldStartGuide || hasStartedGuideRef.current || location.pathname !== '/home') return;

    hasStartedGuideRef.current = true;
    sessionStorage.removeItem('yco_start_guide');

    const timeoutId = window.setTimeout(async () => {
      try {
        const { driver } = await import('driver.js');
        await import('driver.js/dist/driver.css');
        const tour = driver({
          showProgress: true,
          animate: true,
          allowClose: true,
          nextBtnText: 'Susunod',
          prevBtnText: 'Bumalik',
          doneBtnText: 'Tapos',
          steps: [
            { popover: { title: 'Maligayang pagdating!', description: 'Ito ang maikling gabay kung paano gamitin ang app.' } },
            { element: '[data-tour="tab-home"]',    popover: { title: 'Markahan',    description: 'Dito mo makikita ang mga aralin kada markahan.' } },
            { element: '[data-tour="tab-quiz"]',    popover: { title: 'Pagsusulit',  description: 'Dito ka magsasagot ng quiz para masubukan ang natutunan mo.' } },
            { element: '[data-tour="tab-writing"]', popover: { title: 'Pagsusulat', description: 'Dito mo magagawa ang mga gawain sa pagsulat.' } },
          ],
        });
        tour.drive();
      } catch (e) {
        console.error('Hindi nagsimula ang gabay:', e);
      }
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  const hideTabBar =
    location.pathname.startsWith('/quiz/take') ||
    location.pathname.startsWith('/pagsusulit');

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home"                        component={Home} />
        <Route exact path="/quiz"                        component={Quiz} />
        <Route exact path="/quiz/take/:quarter"          component={Quiz} />
        <Route exact path="/pagsusulat"                  component={Pagsusulat} />
        <Route exact path="/pagsusulat/:quarter"         component={Pagsusulat} />
        <Route exact path="/pagsusulat/:quarter/:aralin" component={Pagsusulat} />
        <Route exact path="/setting"                     component={Setting} />
        <Route exact path="/quarter/1"                   component={Quarter1} />
        <Route exact path="/quarter/1/aralin/:id"        component={Quarter1Aralin1} />
        <Route exact path="/quarter/2"                   component={Quarter2} />
        <Route exact path="/quarter/2/aralin/:id"        component={Quarter2Aralin1} />
        <Route exact path="/quarter/3"                   component={Quarter3} />
        <Route exact path="/quarter/3/aralin/:id"        component={Quarter3Aralin} />
        {/* Fallback inside tabs */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>

      {!hideTabBar && (
        <IonTabBar slot="bottom" className="modern-tab-bar">
          <IonTabButton tab="Home" href="/home" className="modern-tab-button" data-tour="tab-home">
            <IonIcon aria-hidden="true" icon={bookSharp} className="tab-icon" />
            <IonLabel className="tab-label">Markahan</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Quiz" href="/quiz" className="modern-tab-button" data-tour="tab-quiz">
            <IonIcon aria-hidden="true" icon={createSharp} className="tab-icon" />
            <IonLabel className="tab-label">Pagsusulit</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Pagsusulat" href="/pagsusulat" className="modern-tab-button" data-tour="tab-writing">
            <IonIcon icon={pencilSharp} className="tab-icon" />
            <IonLabel className="tab-label">Pagsusulat</IonLabel>
          </IonTabButton>
        </IonTabBar>
      )}
    </IonTabs>
  );
};

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
const App: React.FC = () => {
  useEffect(() => {
    setTimeout(async () => {
      try { await SplashScreen.hide(); } catch (_) {}
    }, 1500);
  }, []);

  const seenWelcome = localStorage.getItem('yco_seen_welcome') === '1';

  return (
    <IonApp>
      <IonReactRouter>
        {/*
          IMPORTANT: Plain <Switch> at the root — NOT IonRouterOutlet.
          IonRouterOutlet keeps all matched routes mounted at once,
          which causes /welcome and Tabs to conflict and produce
          blank content. Switch renders ONLY the first match.
        */}
        <Switch>
          <Route exact path="/">
            <Redirect to={seenWelcome ? '/home' : '/welcome'} />
          </Route>

          {/* Welcome is fully outside Tabs — no tab bar, no conflicts */}
          <Route exact path="/welcome" component={WelcomeVideoPage} />

          {/* All other routes go to Tabs */}
          <Route component={Tabs} />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;