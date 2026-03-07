import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import './WelcomeVideoPage.css';

const WelcomeVideoPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Show skip button after 3 seconds
    const timer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const proceedToHome = async () => {
    // Mark welcome video as seen
    await Preferences.set({ key: 'hasSeenWelcome', value: 'true' });
    history.replace('/home');
  };

  const handleVideoEnd = () => {
    proceedToHome();
  };

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-content">
        <div className="video-container">
          <video
            ref={videoRef}
            className="welcome-video"
            src="/assets/video/welcome.mp4"
            autoPlay
            playsInline
            onEnded={handleVideoEnd}
          />

          {showSkip && (
            <IonButton
              className="skip-button"
              fill="outline"
              color="light"
              onClick={proceedToHome}
            >
              Laktawan ▶
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WelcomeVideoPage;
