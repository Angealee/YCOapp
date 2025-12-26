import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Quiz.css';

const Quiz: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Quiz Section</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Quiz</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Quiz Section" />
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
