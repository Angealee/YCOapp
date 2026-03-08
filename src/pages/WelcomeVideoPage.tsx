import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import './WelcomeVideoPage.css';

const WelcomeVideoPage: React.FC = () => {
  const history = useHistory();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  // ── Autoplay fix ────────────────────────────────────────────
  // Browsers block autoplay with audio. Strategy:
  //   1. Start muted (browsers allow muted autoplay)
  //   2. Unmute after 300ms silently
  //   3. If even muted autoplay fails → show tap-to-play overlay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    video.play()
      .then(() => {
        setTimeout(() => {
          if (videoRef.current) videoRef.current.muted = false;
        }, 300);
        setVideoStarted(true);
      })
      .catch(() => {
        // Autoplay fully blocked — user must tap
        setVideoStarted(false);
      });
  }, []);

  const handleVideoTap = () => {
    const video = videoRef.current;
    if (!video || videoStarted) return;
    video.muted = false;
    video.play()
      .then(() => setVideoStarted(true))
      .catch(() => {});
  };

  // ── Navigation ──────────────────────────────────────────────
  // FIX: set yco_seen_welcome so the guard never redirects again
  // FIX: navigate to /home (not /app/home which doesn't exist)
  const proceedToHome = () => {
    localStorage.setItem('yco_seen_welcome', '1');
    sessionStorage.setItem('yco_start_guide', '1');
    history.replace('/home');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="welcome-content">
        <div className="welcome-layout">

          {/* Video Stage */}
          <div className="animation-stage" onClick={handleVideoTap}>
            <video
              ref={videoRef}
              className="welcome-video"
              src="/assets/video/welcomeVideo.mp4"
              playsInline
              preload="auto"
            />
            <div className="welcome-overlay" />

            {/* Shown only when autoplay was blocked */}
            {!videoStarted && (
              <div className="tap-to-play-hint">
                <div className="tap-to-play-icon">▶</div>
                <p>I-tap para simulan ang video</p>
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div className="action-panel">
            <p className="welcome-eyebrow">YCO Learning App</p>
            <h1 className="welcome-title">Pindutin at Matuto</h1>
            <div className="welcome-chips" aria-hidden="true">
              <span className="welcome-chip chip-lessons">Aralin</span>
              <span className="welcome-chip chip-quiz">Quiz</span>
              <span className="welcome-chip chip-writing">Sulat</span>
            </div>
            <p className="welcome-subtitle">
              Simulan ang aralin at tuklasin ang mga gawain.
            </p>
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