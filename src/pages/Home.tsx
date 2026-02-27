import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/react';
import { chevronForwardOutline, schoolOutline } from 'ionicons/icons';
import { useState } from 'react';

import './Home.css';

const quarters = [
  {
    id: 1,
    title: 'Unang Markahan',
    subtitle: 'Panitikan at Wika',
    description: 'Bugtong, Tanaga, Komiks, Hudhud, at iba pa.',
    image: './assets/img/q1.jpg',
    route: '/quarter/1',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea'
  },
  {
    id: 2,
    title: 'Pangalawang Markahan',
    subtitle: 'Kuwentong Bayan at Pabula',
    description: 'Alamat, Pabula, Komiks, at Brochure.',
    image: './assets/img/q2.jpg',
    route: '/quarter/2',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb'
  },
  {
    id: 3,
    title: 'Pangatlong Markahan',
    subtitle: 'Panitikan at Pagsusuri',
    description: 'Mas malalim na pag-unawa sa teksto at biswal.',
    image: './assets/img/quarter3.jpg',
    route: '/quarter/3',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe'
  },
];

const Home: React.FC = () => {
  const [pressedId, setPressedId] = useState<number | null>(null);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-home-toolbar">
          <IonTitle className="modern-home-title">Yco App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="modern-home-content">
        {/* Hero Header */}
        <div className="home-hero">
          <div className="home-hero-gradient" />
          <div className="home-hero-content">
            <div className="home-hero-icon">
              <IonIcon icon={schoolOutline} />
            </div>
            <h1 className="home-hero-title">Mga Markahan</h1>
            <p className="home-hero-subtitle">Piliin ang quarter upang simulan ang pagkatuto</p>
            
            <div className="learning-path">
              <div className="path-line" />
              <div className="path-dots">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="path-dot">{num}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quarter Cards Grid */}
        <div className="home-container">
          <div className="modern-quarter-grid">
            {quarters.map((q, index) => (
              <IonCard
                key={q.id}
                routerLink={q.route}
                className={`modern-quarter-card quarter-${index + 1} ${pressedId === q.id ? 'is-pressed' : ''}`}
                button
                onTouchStart={() => setPressedId(q.id)}
                onTouchEnd={() => setPressedId(null)}
                onTouchCancel={() => setPressedId(null)}
                onMouseDown={() => setPressedId(q.id)}
                onMouseUp={() => setPressedId(null)}
              >
                {/* Background Image with Overlay */}
                <div 
                  className="quarter-image-wrapper"
                  style={{ backgroundImage: `url(${q.image})` }}
                >
                  <div 
                    className="quarter-overlay"
                    style={{ background: q.gradient }}
                  />
                  
                  {/* Quarter Number Badge */}
                  {/* <div className="quarter-number-badge">
                    <span className="quarter-number">Q{q.id}</span>
                  </div> */}
                </div>
                    
                {/* Card Content */}
                <IonCardContent className="modern-quarter-content">
                  {/* Filipino Flag Accent */}
                  <div className="filipino-accent-bar">
                    <span className="accent-blue" />
                    <span className="accent-red" />
                    <span className="accent-yellow" />
                  </div>

                  {/* Text Content */}
                  <div className="quarter-text">
                    <div className="quarter-header-row">
                      <div>
                        <IonCardTitle className="quarter-title">
                          {q.title}
                        </IonCardTitle>
                        <IonCardSubtitle className="quarter-subtitle">
                          {q.subtitle}
                        </IonCardSubtitle>
                      </div>
                      <div 
                        className="quarter-icon-circle"
                        style={{ background: q.gradient }}
                      >
                        <IonIcon icon={chevronForwardOutline} />
                      </div>
                    </div>
                    
                    <p className="quarter-description">{q.description}</p>
                    
                    {/* Action Button */}
                    <div className="quarter-action">
                      <span 
                        className="start-learning-btn"
                        style={{ 
                          background: q.gradient,
                          boxShadow: `0 4px 15px ${q.color}40`
                        }}
                      >
                        Simulan
                        <IonIcon icon={chevronForwardOutline} />
                      </span>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="home-bottom-spacing" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
