import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { bookOutline, trophyOutline, playCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

import { quarter3Aralin, Aralin } from "../../data/quarter3AralinCards";
import { quarter3LessonsById } from "../../data/quarter3Lessons";
import "./Quarter1.css";

const Quarter3: React.FC = () => {
  const [aralinProgress, setAralinProgress] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem("quarter3AralinProgress");
    if (!storedProgress) return;

    try {
      setAralinProgress(JSON.parse(storedProgress));
    } catch (e) {
      console.error("Error parsing progress data:", e);
    }
  }, []);

  const getAralinProgress = (aralinId: number): number => {
    if (aralinProgress[aralinId] !== undefined) {
      return aralinProgress[aralinId];
    }
    const defaultAralin = quarter3Aralin.find((a) => a.id === aralinId);
    return defaultAralin ? defaultAralin.progress : 0;
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="Ibalik" className="modern-back-btn" />
          </IonButtons>
          <IonTitle className="modern-title">Quarter 3</IonTitle>
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
            <h1 className="hero-title">Ikatlong Markahan</h1>
            <p className="hero-subtitle">Panitikang Filipino</p>
            <div className="hero-stats">
              <div className="stat-badge">
                <IonIcon icon={trophyOutline} />
                <span>{quarter3Aralin.length} Aralin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aralin Cards Grid */}
        <div className="aralin-grid">
          {quarter3Aralin.map((aralin: Aralin, index: number) => {
            getAralinProgress(aralin.id);
            const lesson = quarter3LessonsById[aralin.id];
            const cardSubtitle = lesson?.meta.title ?? aralin.subtitle;
            const cardDescription = lesson?.meta.description ?? aralin.description;

            return (
              <IonCard
                key={aralin.id}
                routerLink={`/quarter/3/aralin/${aralin.id}`}
                className="modern-aralin-card"
                button
              >
                <div className="card-number">#{index + 1}</div>
                <div className="card-glow" />

                <IonCardContent className="modern-card-content">
                  <div className="card-top">
                    <div className="lesson-badge">Aralin {aralin.id}</div>
                  </div>

                  <h3 className="card-title">{aralin.title}</h3>
                  <p className="card-subtitle">{cardSubtitle}</p>
                  <p className="card-description">{cardDescription}</p>

                  <div className="card-footer">
                    <span className="tap-hint">Tap upang buksan →</span>
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>

        {/* Quiz Redirect Section */}
        <div className="quiz-redirect-section">
          <IonCard className="quiz-promo-card">
            <IonCardContent>
              <div className="promo-content">
                <div className="promo-icon">
                  <IonIcon icon={bookOutline} />
                </div>
                <div className="promo-text">
                  <h3>Subukan ang Iyong Kaalaman sa Ikatlong Markahan</h3>
                  <p>Handa ka na ba? Subukin ang iyong pag-unawa sa Panitikang Filipino!</p>
                </div>
                <IonButton
                  expand="block"
                  className="main-quiz-button"
                  onClick={() => (window.location.href = "/quiz")}
                >
                  <IonIcon icon={playCircleOutline} slot="start" />
                  Simulan ang Pagsusulit
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="bottom-spacing" />
      </IonContent>
    </IonPage>
  );
};

export default Quarter3;

