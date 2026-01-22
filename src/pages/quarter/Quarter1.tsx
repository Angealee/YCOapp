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

import { quarter1Aralin, Aralin } from "../../data/quarter1AralinCards";
import "./Quarter1.css";

const Quarter1: React.FC = () => {
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
          {quarter1Aralin.map((aralin: Aralin, index: number) => (
            <IonCard
              key={aralin.id}
              routerLink={`/quarter/1/aralin/${aralin.id}`}
              className="modern-aralin-card"
              button
            >
              <div className="card-number">#{index + 1}</div>
              <div className="card-glow" />
              
              <IonCardContent className="modern-card-content">
                {/* Top Section */}
                <div className="card-top">
                  <div className="lesson-badge">Aralin {aralin.id}</div>
                  <div className={`status-indicator ${aralin.progress === 1 ? 'complete' : aralin.progress > 0 ? 'in-progress' : 'not-started'}`}>
                    {aralin.progress === 1 ? '✓' : aralin.progress > 0 ? '◐' : '○'}
                  </div>
                </div>

                {/* Content */}
                <h3 className="card-title">{aralin.title}</h3>
                <p className="card-subtitle">{aralin.subtitle}</p>
                <p className="card-description">{aralin.description}</p>

                {/* Progress Section */}
                <div className="card-progress">
                  <div className="progress-header">
                    <span className="progress-label">Progreso</span>
                    <span className="progress-percent">
                      {Math.round(aralin.progress * 100)}%
                    </span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <IonProgressBar
                      value={aralin.progress}
                      className="modern-progress"
                    />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                  <span className="tap-hint">Tap upang buksan →</span>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        {/* Bottom Spacing */}
        <div className="bottom-spacing" />
      </IonContent>
    </IonPage>
  );
};

export default Quarter1;