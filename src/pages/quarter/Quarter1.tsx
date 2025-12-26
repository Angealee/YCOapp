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
  IonIcon,
  IonChip,
  IonLabel,
} from "@ionic/react";

import {
  bookOutline,
  volumeHighOutline,
  videocamOutline,
  gameControllerOutline,
} from "ionicons/icons";

import { quarter1Aralin } from "../../data/quarter1";
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
        <div className="quarter-header">
          <h2>Unang Markahan</h2>
          <p>Mga Aralin sa Panitikang Filipino</p>
        </div>

        {quarter1Aralin.map((aralin) => (
          <IonCard key={aralin.id} routerLink={`/quarter1/aralin/${aralin.id}`}>
            <IonCardHeader>
              <IonCardTitle>{aralin.title}</IonCardTitle>
              <IonCardSubtitle>{aralin.subtitle}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p className="aralin-description">{aralin.description}</p>

              <div className="modality-chips">
                {aralin.modalities.reading && (
                  <IonChip>
                    <IonIcon icon={bookOutline} />
                    <IonLabel>Reading</IonLabel>
                  </IonChip>
                )}
                {aralin.modalities.audio && (
                  <IonChip>
                    <IonIcon icon={volumeHighOutline} />
                    <IonLabel>Audio</IonLabel>
                  </IonChip>
                )}
                {aralin.modalities.video && (
                  <IonChip>
                    <IonIcon icon={videocamOutline} />
                    <IonLabel>Video</IonLabel>
                  </IonChip>
                )}
                {aralin.modalities.activity && (
                  <IonChip>
                    <IonIcon icon={gameControllerOutline} />
                    <IonLabel>Activity</IonLabel>
                  </IonChip>
                )}
              </div>
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Quarter1;
