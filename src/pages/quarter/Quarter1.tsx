import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonProgressBar,
} from "@ionic/react";

import { quarter1Aralin, Aralin } from "../../data/quarter1AralinCards";
import "./Quarter1.css";

const Quarter1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quarter 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Page Header */}
        <div className="quarter-header">
          <h2>Unang Markahan</h2>
          <p>Mga Aralin sa Panitikang Filipino</p>
        </div>

        {/* Aralin Cards */}
        {quarter1Aralin.map((aralin: Aralin) => (
          <IonCard
            key={aralin.id}
            routerLink={`/quarter1/aralin/${aralin.id}`}
          >
            <IonCardHeader>
              <IonCardTitle>{aralin.title}</IonCardTitle>
              <IonCardSubtitle>{aralin.subtitle}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p className="aralin-description">{aralin.description}</p>

              {/* Progress */}
              <div className="aralin-progress">
                <div className="progress-label">
                  <span>Progress</span>
                  <p>{Math.round(aralin.progress * 100)}%</p>
                </div>
                <IonProgressBar value={aralin.progress} />
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Quarter1;
