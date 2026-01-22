import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonProgressBar,
} from "@ionic/react";
import { useState, useEffect } from 'react';

import { quarter2Aralin, Aralin } from "../../data/quarter2AralinCards";
import "./Quarter2.css";

const Quarter2: React.FC = () => {
  const [aralinProgress, setAralinProgress] = useState<{[key: number]: number}>({});
  
  // Load progress from localStorage on component mount
  useEffect(() => {
    const storedProgress = localStorage.getItem('quarter2AralinProgress');
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
    const defaultAralin = quarter2Aralin.find(a => a.id === aralinId);
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quarter 2</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Page Header */}
        <div className="quarter-header">
          <h2>Pangalawang Markahan</h2>
          <p>Mga Aralin sa Panitikang Filipino</p>
        </div>

        {/* Aralin Cards */}
        {quarter2Aralin.map((aralin: Aralin) => {
          const progress = getAralinProgress(aralin.id);
          const canAccess = canAccessAralin(aralin.id);
          
          return (
            <IonCard
              key={aralin.id}
              routerLink={canAccess ? `/quarter2/aralin/${aralin.id}` : undefined}
              className={`aralin-card ${!canAccess ? 'locked' : ''}`}
            >
              <IonCardContent>
                <div className="aralin-card-inner">
                  {/* Accent */}
                  <div className="aralin-accent" />

                  {/* Content */}
                  <div className="aralin-content">
                    <h3>{aralin.title}</h3>
                    <p className="aralin-subtitle">{aralin.subtitle}</p>
                    <p className="aralin-description">{aralin.description}</p>


                    
                    {!canAccess && (
                      <div className="locked-overlay">
                        <p>Kumpletuhin muna ang nauna →</p>
                      </div>
                    )}
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Quarter2;
