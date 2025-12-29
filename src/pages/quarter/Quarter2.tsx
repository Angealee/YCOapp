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

import { quarter2Aralin, Aralin } from "../../data/quarter2AralinCards";
import "./Quarter2.css";

const Quarter2: React.FC = () => {
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
        {quarter2Aralin.map((aralin: Aralin) => (
          <IonCard
            key={aralin.id}
            routerLink={`/quarter2/aralin/${aralin.id}`}
            className="aralin-card"
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

                  {/* Progress */}
                  <div className="aralin-progress">
                    <div className="progress-label">
                      <span>Progress</span>
                      <strong>
                        {Math.round(aralin.progress * 100)}%
                      </strong>
                    </div>
                    <IonProgressBar
                      value={aralin.progress}
                      color="tertiary"
                    />
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Quarter2;
