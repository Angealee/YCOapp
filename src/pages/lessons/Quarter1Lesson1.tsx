import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { useState } from "react";
import { lesson1Reading } from "../../data/quarter1Lesson1";
import "./Quarter1Lesson1.css";

const Quarter1Lesson1: React.FC = () => {
  const [segment, setSegment] = useState<
    "reading" | "audio" | "video" | "activity"
  >("reading");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Aralin 1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Lesson Header */}
        <div className="lesson-header">
          <h2>Kaligirang Pangkasaysayan ng Panitikan</h2>
          <p>Panahon ng Katutubo</p>
        </div>

        {/* Tabs */}
        <IonSegment
          value={segment}
          onIonChange={(e) => setSegment(e.detail.value as any)}
        >
          <IonSegmentButton value="reading">
            <IonLabel>📖 Reading</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="audio">
            <IonLabel>🎧 Audio</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="video">
            <IonLabel>🎥 Video</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="activity">
            <IonLabel>🎮 Activity</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* CONTENT */}
        {segment === "reading" && (
          <div className="lesson-content">
            {lesson1Reading.map((section, index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{section.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ul>
                    {section.content.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}

        {segment === "audio" && (
          <div className="placeholder">
            <p>🎧 Audio lesson will be available here.</p>
          </div>
        )}

        {segment === "video" && (
          <div className="placeholder">
            <p>🎥 Video lesson will be available here.</p>
          </div>
        )}

        {segment === "activity" && (
          <div className="placeholder">
            <p>🎮 Interactive activities coming soon.</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Quarter1Lesson1;
