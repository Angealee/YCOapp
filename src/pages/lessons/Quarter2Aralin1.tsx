import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";

import { useState } from "react";
import { quarter1Lessons } from "../../data/quarter1Lessons";
import "./Quarter1Aralin1.css";

const Quarter2Aralin1: React.FC = () => {
 

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

export default Quarter2Aralin1;
