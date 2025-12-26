import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
// import './Home.css';

const quarters = [
  {
    id: 1,
    title: 'Quarter 1',
    subtitle: 'Panitikan at Wika',
    description: 'Bugtong, Tanaga, Komiks, Hudhud, at iba pa.',
    route: '/quarter/1'
  },
  {
    id: 2,
    title: 'Quarter 2',
    subtitle: 'Kuwentong Bayan at Pabula',
    description: 'Alamat, Pabula, Komiks, at Brochure.',
    route: '/quarter/2'
  },
  {
    id: 3,
    title: 'Quarter 3',
    subtitle: 'Panitikan at Pagsusuri',
    description: 'Mas malalim na pag-unawa sa teksto at biswal.',
    route: '/quarter/3'
  },
  {
    id: 4,
    title: 'Quarter 4',
    subtitle: 'Pagpapahalaga at Pananagutan',
    description: 'Sanhi at bunga, pagpapasya, at pananagutan.',
    route: '/quarter/4'
  }
];


const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Module</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {quarters.map((q) => (
          <IonCard key={q.id} routerLink={q.route}>

            <IonCardHeader>
              <IonCardTitle>{q.title}</IonCardTitle>
              <IonCardSubtitle>{q.subtitle}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              {q.description}
            </IonCardContent>
  
          </IonCard>
        ))}

      </IonContent>
    </IonPage>
  );
};

export default Home;
