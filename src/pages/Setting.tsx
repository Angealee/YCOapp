import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useEffect, useState } from 'react';
// import './Setting.css';

const Setting: React.FC = () => {
   const [darkMode, setDarkMode] = useState(
    document.body.classList.contains('dark')
  );

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
         <IonItem>
        <IonLabel>Dark Mode</IonLabel>
        <IonToggle
          checked={darkMode}
          onIonChange={e => setDarkMode(e.detail.checked)}
        />
      </IonItem>
        <IonButton expand="full">I reset ang Pag-Aaral</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Setting;
