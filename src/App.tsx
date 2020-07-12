import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge} from '@ionic/react';
import { readerOutline, playOutline, settingsOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';


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

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/Home" component={Home} exact={true} />
        <Route path="/Profile" component={Profile} exact={true} />
        <Route path="/Settings" component={Settings} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/Settings" />} />
      </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton href="/Profile" tab="Profile">
            <IonIcon icon={readerOutline} />
            <IonLabel>Scelte</IonLabel>
          </IonTabButton>
          <IonTabButton href="/Home" tab="home">
            <IonIcon icon={playOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton href="/Settings" tab="Settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
