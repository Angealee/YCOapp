import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import './Home.css';

const quarters = [
  {
    id: 1,
    title: 'Quarter 1',
    subtitle: 'Panitikan at Wika',
    description: 'Bugtong, Tanaga, Komiks, Hudhud, at iba pa.',
    image: './assets/img/q1.jpg',
    route: '/quarter/1'
  },
  {
    id: 2,
    title: 'Quarter 2',
    subtitle: 'Kuwentong Bayan at Pabula',
    description: 'Alamat, Pabula, Komiks, at Brochure.',
    image: './assets/img/q2.jpg',
    route: '/quarter/2'
  },
  {
    id: 3,
    title: 'Quarter 3',
    subtitle: 'Panitikan at Pagsusuri',
    description: 'Mas malalim na pag-unawa sa teksto at biswal.',
    image: './assets/img/quarter3.jpg',
    route: '/quarter/3'
  },
  
];

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Module</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="home-header">
          <h2>Mga Markahan</h2>
          <p>Piliin ang quarter upang simulan ang pagkatuto</p>
        </div>
        <div className="home-container">
          <div className="quarter-grid">
            {quarters.map((q) => (
          
          // Card Section
          <IonCard
            key={q.id}
            routerLink={q.route}
            className="quarter-card"
          >
            <div
                className="media-card-image"
                style={{ backgroundImage: `url(${q.image})` 
              }}
            />

            {/* Content Section */}
            <IonCardContent className="media-card-content">
              <div className="quarter-card-inner">
                <div className="quarter-accent" />

                <div className="quarter-content">
                  <IonCardTitle className="media-card-title">{q.title}</IonCardTitle>
                  <IonCardSubtitle>{q.subtitle}</IonCardSubtitle>
                  <p className="quarter-desc">{q.description}</p>
                </div>           
              </div>
            </IonCardContent>
          </IonCard>
        ))}
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;
