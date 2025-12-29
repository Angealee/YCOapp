import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

const Pagsusulat: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pagsusulat</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <h2>Pagsusulat</h2>
        <p>
          Dito susulat
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Pagsusulat;
