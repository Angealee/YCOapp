import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Module</IonTitle>
        </IonToolbar>
      </IonHeader>

      /* Quarter 1 Card */
      <IonContent className="ion-padding">
        <IonCard routerLink="/tabs/home/quarter/quarter1">
          <IonCardHeader>
            <IonCardTitle>
              Quarter 1
            </IonCardTitle>
          </IonCardHeader>
            <IonCardContent>
              Welcome to Quarter 1! This section covers the basics of Ionic framework, including components, layouts, and theming. Get ready to build amazing mobile apps!
            </IonCardContent>
        </IonCard>

        /* Quarter 2 Card */
        <IonCard routerLink="/tabs/home/quarter/quarter2">
          <IonCardHeader>
            <IonCardTitle>
              Quarter 2
            </IonCardTitle>
          </IonCardHeader>
            <IonCardContent>
              Welcome to Quarter 2! This section covers the basics of Ionic framework, including components, layouts, and theming. Get ready to build amazing mobile apps!
            </IonCardContent>
        </IonCard>

         /* Quarter 3 Card */
        <IonCard routerLink="/tabs/home/quarter/quarter3">
          <IonCardHeader>
            <IonCardTitle>
              Quarter 3
            </IonCardTitle>
          </IonCardHeader>
            <IonCardContent>
              Welcome to Quarter 3! This section covers the basics of Ionic framework, including components, layouts, and theming. Get ready to build amazing mobile apps!
            </IonCardContent>
        </IonCard>

         /* Quarter 4 Card */
        <IonCard routerLink="/tabs/home/quarter/quarter4">
          <IonCardHeader>
            <IonCardTitle>
              Quarter 4
            </IonCardTitle>
          </IonCardHeader>
            <IonCardContent>
              Welcome to Quarter 4! This section covers the basics of Ionic framework, including components, layouts, and theming. Get ready to build amazing mobile apps!
            </IonCardContent>
        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
