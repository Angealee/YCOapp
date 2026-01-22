import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonProgressBar,
  IonButtons,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import { bookOutline, trophyOutline } from "ionicons/icons";
import { useState, useEffect } from 'react';

import { quarter1Aralin, Aralin } from "../../data/quarter1AralinCards";
import "./Quarter1.css";

const Quarter1: React.FC = () => {
  const [aralinProgress, setAralinProgress] = useState<{[key: number]: number}>({});
  
  // Load progress from localStorage on component mount
  useEffect(() => {
    const storedProgress = localStorage.getItem('quarter1AralinProgress');
    if (storedProgress) {
      try {
        setAralinProgress(JSON.parse(storedProgress));
      } catch (e) {
        console.error('Error parsing progress data:', e);
      }
    }
  }, []);
  
  // Calculate actual progress for each aralin
  const getAralinProgress = (aralinId: number): number => {
    // Check if we have stored progress for this aralin
    if (aralinProgress[aralinId] !== undefined) {
      return aralinProgress[aralinId];
    }
    // Otherwise, use the default progress from the data
    const defaultAralin = quarter1Aralin.find(a => a.id === aralinId);
    return defaultAralin ? defaultAralin.progress : 0;
  };
  
  // Check if user can access an aralin based on progress
  const canAccessAralin = (aralinId: number): boolean => {
    // Always allow access to first aralin
    if (aralinId === 1) return true;
    
    // Check if the previous aralin is completed (100%)
    const previousAralinProgress = getAralinProgress(aralinId - 1);
    return previousAralinProgress === 1;
  };
  
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="Ibalik" className="modern-back-btn" />
          </IonButtons>
          <IonTitle className="modern-title">Quarter 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="modern-content">
        {/* Hero Header */}
        <div className="hero-header">
          <div className="hero-gradient" />
          <div className="hero-content">
            <div className="hero-icon">
              <IonIcon icon={bookOutline} />
            </div>
            <h1 className="hero-title">Unang Markahan</h1>
            <p className="hero-subtitle">Panitikang Filipino</p>
            <div className="hero-stats">
              <div className="stat-badge">
                <IonIcon icon={trophyOutline} />
                <span>{quarter1Aralin.length} Aralin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aralin Cards Grid */}
        <div className="aralin-grid">
          {quarter1Aralin.map((aralin: Aralin, index: number) => {
            const progress = getAralinProgress(aralin.id);
            const canAccess = canAccessAralin(aralin.id);
            
            return (
              <IonCard
                key={aralin.id}
                routerLink={canAccess ? `/quarter/1/aralin/${aralin.id}` : undefined}
                className={`modern-aralin-card ${!canAccess ? 'locked' : ''}`}
                button={canAccess}
              >
                <div className="card-number">#{index + 1}</div>
                <div className="card-glow" />
                
                <IonCardContent className="modern-card-content">
                  {/* Top Section */}
                  <div className="card-top">
                    <div className="lesson-badge">Aralin {aralin.id}</div>
                    <div className={`status-indicator ${progress === 1 ? 'complete' : progress > 0 ? 'in-progress' : 'not-started'}`}>
                      {progress === 1 ? '✓' : progress > 0 ? '◐' : '○'}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="card-title">{aralin.title}</h3>
                  <p className="card-subtitle">{aralin.subtitle}</p>
                  <p className="card-description">{aralin.description}</p>

  

                  {/* Card Footer */}
                  <div className="card-footer">
                    {!canAccess ? (
                      <span className="locked-hint">Kumpletuhin muna ang nauna →</span>
                    ) : (
                      <span className="tap-hint">Tap upang buksan →</span>
                    )}
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>

        {/* Bottom Spacing */}
        <div className="bottom-spacing" />
      </IonContent>
    </IonPage>
  );
};

export default Quarter1;