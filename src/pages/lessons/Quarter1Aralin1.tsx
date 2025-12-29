import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

import { useState } from "react";
import { lesson1Reading } from "../../data/quarter1Lesson1";
import "./Quarter1Aralin1.css";

const Quarter1Lesson1: React.FC = () => {
 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Aralin 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="lesson-header">
          <h2>Kaligirang Pangkasaysayan ng Panitikan</h2>
          <p>Panahon ng Katutubo</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Quarter1Lesson1;
