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

import { quarter2Aralin, Aralin } from "../../data/quarter2AralinCards";
import { quarter2LessonsById } from "../../data/quarter2Lessons";
import "./Quarter1.css";

const Quarter2: React.FC = () => {
  const [aralinProgress, setAralinProgress] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem("quarter2AralinProgress");
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
    const defaultAralin = quarter2Aralin.find((a) => a.id === aralinId);
    return defaultAralin ? defaultAralin.progress : 0;
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="Ibalik" className="modern-back-btn" />
          </IonButtons>
          <IonTitle className="modern-title">Pangalawang Markahan</IonTitle>
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
            <h1 className="hero-title">Pangalawang Markahan</h1>
            <p className="hero-subtitle">Panitikang Filipino</p>
            <div className="hero-stats">
              <div className="stat-badge">
                <IonIcon icon={trophyOutline} />
                <span>{quarter2Aralin.length} Aralin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Aralin Cards Grid */}
        <div className="aralin-grid">
          {quarter2Aralin.map((aralin: Aralin, index: number) => {
            getAralinProgress(aralin.id);
            const lesson = quarter2LessonsById[aralin.id];
            const cardSubtitle = lesson?.meta.title ?? aralin.subtitle;
            const cardDescription = lesson?.meta.description ?? aralin.description;

            return (
              <IonCard
                key={aralin.id}
                routerLink={`/quarter/2/aralin/${aralin.id}`}
                className="modern-aralin-card"
                button
              >
                <div className="card-number">#{index + 1}</div>
                <div className="card-glow" />

                <IonCardContent className="modern-card-content">
                  <div className="card-top">
                    <div className="lesson-badge">Aralin </div>
                  </div>

                  {/* <h3 className="card-title">{aralin.title}</h3> */}
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
                  <h3>Subukan ang Iyong Kaalaman sa Pangalawang Markahan</h3>
                  <p>Ikaw na ba ang handa? Subukin ang iyong pag-unawa sa Panitikang Filipino!</p>
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

export default Quarter2;
