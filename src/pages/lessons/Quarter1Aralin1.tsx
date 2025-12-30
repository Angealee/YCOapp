import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonChip,
  IonRippleEffect
} from '@ionic/react';

import { useParams } from "react-router";
import { quarter1Lessons } from '../../data/quarter1Lessons';
import './Quarter1Aralin1.css';

interface RouteParams {
  aralinId: string;
}

console.log("FULL URL:", window.location.pathname);

const Quarter1Aralin1: React.FC = () => {
  const { aralinId } = useParams<RouteParams>();

  const lesson = quarter1Lessons[aralinId];
console.log("aralinId:", aralinId);
  if (!lesson) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <h2>Aralin hindi matagpuan</h2>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Aralin {aralinId}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {lesson.reading.map((section, index) => (
          <IonCard key={index} className="lesson-section-card">
            <IonCardHeader>
              <IonCardTitle>{section.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {section.content.map((paragraph, pIndex) => (
                <IonText key={pIndex}>
                  <p>{paragraph}</p>
                </IonText>
              ))}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Quarter1Aralin1;
