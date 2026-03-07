import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import './WelcomeVideoPage.css';

const WelcomeVideoPage: React.FC = () => {
  const history = useHistory();

  const proceedToHome = () => {
    history.replace('/home');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-content">
        <div className="welcome-layout">
          <div className="animation-stage">
            <video
              className="welcome-video"
              src="/assets/video/welcome.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="welcome-overlay" />
          </div>

          <div className="action-panel">
            <p className="welcome-eyebrow">YCO Learning App</p>
            <h1 className="welcome-title">Pindutin at Matuto</h1>
            <p className="welcome-subtitle">Simulan ang aralin at tuklasin ang mga gawain.</p>
            <IonButton className="start-button" expand="block" onClick={proceedToHome}>
              Magsimula
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeVideoPage;
