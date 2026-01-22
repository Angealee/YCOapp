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
  IonBackButton,
  IonButtons,
  IonBadge
} from '@ionic/react';

import {
  bookOutline,
  volumeHighOutline,
  imageOutline,
  gameControllerOutline,
  createOutline,
  eyeOutline,
  bookmarkSharp,
  sparklesOutline,
  bulbOutline,
  heartOutline,
  playCircleOutline,
  chevronForwardOutline,
  eye
} from 'ionicons/icons';

import './Quarter1Aralin1.css';
import { useState } from 'react';

const Quarter1Aralin1: React.FC = () => {
  const [isAudio, setIsAudio] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>({});

  const toggleAnswer = (index: number) => {
  setVisibleAnswers(prev => ({
    ...prev,
    [index]: !prev[index]
  }));
}

  const changeState = () => {
    setIsAudio(!isAudio);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-aralin-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="Ibalik" className="modern-back-btn" />
          </IonButtons>
          <IonTitle className="modern-aralin-title">
            <div className="title-content">
              <span className="quarter-badge">Q1</span>
              <span className="separator">•</span>
              <span className="aralin-badge">Aralin 1</span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="modern-aralin-content">
        {/* Hero Section */}
        <div className="aralin-hero">
          <div className="hero-bg-gradient" />
          <div className="hero-content-wrapper">
            <div className="hero-icon-badge">
              <IonIcon icon={bookOutline} />
            </div>
            <h1 className="hero-main-title">
              Kaligirang Pangkasaysayan ng Panitikan sa Panahon ng Katutubo
            </h1>
            <p className="hero-description">
              Bago pa man dumating ang mga mananakop, mayaman na ang mga Pilipino
              sa panitikan—ipinapasa sa pamamagitan ng salita, awit, laro, at
              karanasan.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <IonIcon icon={sparklesOutline} />
                <span>4 Paksa</span>
              </div>
              <div className="stat-item">
                <IonIcon icon={bulbOutline} />
                <span>Interactive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="content-wrapper">
          {/* ACCORDION SECTIONS */}
          <IonAccordionGroup 
            className="modern-accordion-group"
            onIonChange={(e) => setActiveSection(e.detail.value as string)}
          >
            {/* BUGTONG */}
            <IonAccordion value="bugtong" className="modern-accordion">
              <IonItem slot="header" className="accordion-header" lines="none">
                <div className="header-content">
                  <div className="header-icon bugtong-icon">
                    <IonIcon icon={bulbOutline} />
                  </div>
                  <div className="header-text">
                    <IonLabel className="accordion-title">Bugtong</IonLabel>
                    <p className="accordion-subtitle">Palaisipang Panitikan</p>
                  </div>
                </div>
              </IonItem>

              <div className="accordion-content" slot="content">
                <div className="content-intro">
                  <IonText className="intro-text">
                    Ang bugtong ay isang maikling patulang palaisipan na naglalarawan 
                    ng isang bagay, hayop, tao, o pangyayari sa pamamagitan ng pahiwatig 
                    o talinghaga. Hindi tuwiran ang paglalarawan; kailangan ng mambabasa o nakikinig na gumamit ng imahinasyon, lohika, at kaalaman sa wika upang mahulaan ang sagot. Ang bugtong ay isang anyo ng panitikan na nag-uugnay sa wika at kultura, at karaniwang ginagamit sa mga tradisyunal na laro at paligsahan sa barangay at paaralan.
                  </IonText>
                </div>

                {/* Info Cards */}
                <div className="info-cards-grid">
                  <IonCard className="info-card gradient-purple">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={sparklesOutline} />
                      </div>
                      <h1 className="card-title"><strong>Katangian ng Bugtong</strong></h1>
                      <div className="card-list">
                        <div className="list-item">
                          <span className="item-number">1</span>
                          <div>
                            <strong>Maikli at Patula</strong>
                            <p>karaniwan ay may tugma at sukat upang madaling matandaan.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">2</span>
                          <div>
                            <strong>May Talinghaga</strong>
                            <p>gumagamit ng paglalarawan na di-tuwer o simboliko.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">3</span>
                          <div>
                            <strong>Naglalarawan ng isang bagay o kaisipan</strong>
                            <p>maaaring tao, hayop, bagay, halaman, o pangyayari.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">4</span>
                          <div>
                            <strong>Layunin</strong>
                            <p>aliwin ang nakikinig, hamunin ang katalinuhan, at palawakin 
                            ang kaalaman sa wika at kultura.</p>
                          </div>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>

                  <IonCard className="info-card gradient-pink">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={heartOutline} />
                      </div>
                      <h1 className="card-title"><strong>Kahalagahan ng Bugtong</strong></h1>
                      <div className="card-list">
                        <div className="list-item">
                          <span className="item-number">1</span>
                          <div>
                            <strong>Nagpapatalas ng isip at lohika</strong>
                            <p>sapagkat ang tamang sagot ay kailangan tuklasin at i-analisa.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">2</span>
                          <div>
                            <strong>Nagpapalawak ng bokabularyo</strong>
                            <p>nakikilala ang mga salitang Filipino at kasanayan sa paggamit ng wika.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">3</span>
                          <div>
                            <strong>Nagpapaunlad ng imahinasyon</strong>
                            <p>dahil ang mga pahiwatig ay hindi literal.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">4</span>
                          <div>
                            <strong>Nagpapahalaga sa kulturang Pilipino</strong>
                            <p>aliwin ang nakikinig, hamunin ang katalinuhan.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">5</span>
                          <div>
                            <strong>Naglilinang ng pakikipag-ugnayan</strong>
                            <p>karaniwang ginagamit sa laro, paligsahan, o pagtuturo.</p>
                          </div>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </div>

                {/* Interactive Chips */}
                <div className="action-chips">
                  <IonChip 
                    className={`modern-chip ${!isAudio ? 'active' : ''}`}
                    onClick={() => setIsAudio(false)}
                  >
                    <IonIcon icon={bookOutline} />
                    <IonLabel>Pagbabasa</IonLabel>
                  </IonChip>
                  <IonChip 
                    className={`modern-chip ${isAudio ? 'active' : ''}`}
                    onClick={() => setIsAudio(true)}
                  >
                    <IonIcon icon={volumeHighOutline} />
                    <IonLabel>Pakikinig</IonLabel>
                  </IonChip>
                </div>

                {/* Example Card */}
                <IonCard className="example-card">
                  <IonCardContent>
                    {isAudio ? (
                      <div className="audio-player">
                        <div className="audio-icon">
                          <IonIcon icon={playCircleOutline} />
                        </div>
                        <div className="audio-info">
                          <p className="audio-title">Play Audio</p>
                          <p className="audio-subtitle">Sagot: Cellphone</p>
                        </div>
                      </div>
                    ) : (
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bookmarkSharp} />
                          <span>Halimbawa</span>
                        </div>
                        <p className="riddle-text">
                          Hindi tao, hindi hayop,<br />
                          Ngunit marunong magsalita;<br />
                          Sa isang pindot mo lamang,<br />
                          Buong mundo'y makikita.
                        </p>
                        <div className="answer-reveal"
                        onClick={() => toggleAnswer(0)}
                        style={{ cursor: 'pointer' }}>
                          <IonIcon icon={eyeOutline} />
                          <span>
                            {visibleAnswers[0] ? "Sagot: Cellphone" : "Ipakita ang Sagot"}
                          </span>
                        </div>

                        <p className="riddle-text">
                          May ulo ngunit walang buhok,<br />
                          May mukha ngunit walang mata;<br />
                          Araw-araw mo akong tinitingnan,<br />
                          Panahon ang aking wika.
                        </p>
                        <div className="answer-reveal"
                          onClick={() => toggleAnswer(1)}
                          style={{ cursor: 'pointer' }}>
                          <IonIcon icon={eyeOutline} />
                          <span>
                            {visibleAnswers[1] ? "Sagot: Salamin" : "Ipakita ang Sagot"}
                          </span>
                        </div>

                        <p className="riddle-text">
                          Maliit pa nang isilang,<br/>
                          Sa paglaki’y nagiging salamin;<br/>
                          Sa ulan ako’y kaibigan,<br/>
                          Sa init ay nawawala rin.
                        </p>
                        <div className="answer-reveal"
                          onClick={() => toggleAnswer(2)}
                          style={{ cursor: 'pointer' }}>
                          <IonIcon icon={eyeOutline} />
                          <span>
                            {visibleAnswers[2] ? "Sagot: Salamin" : "Ipakita ang Sagot"}
                          </span>
                        </div>

                        <p className="riddle-text">
                          Isang bagay na walang paa, <br />
                          Ngunit kayang maglakbay sa bansa; <br />
                          Sa pahina ako’y nakatira, <br />
                          Karununga’y aking dala. 
                        </p>
                        <div className="answer-reveal"
                          onClick={() => toggleAnswer(3)}
                          style={{ cursor: 'pointer' }}>
                          <IonIcon icon={eyeOutline} />
                          <span>
                            {visibleAnswers[3] ? "Sagot: Aklat" : "Ipakita ang Sagot"}
                          </span>
                        </div>

                        <p className="riddle-text">
                          May bibig ngunit di nagsasalita, <br />
                          May tainga ngunit di nakaririnig; <br />
                          Sa tunog ako’y nabubuhay, <br />
                          Damdamin ang aking tinig.
                        </p>
                        <div className="answer-reveal">
                          <IonIcon icon={bulbOutline} />
                          <span>Sagot: Radyo</span>
                        </div>

                        <p className="riddle-text">
                          May mata ngunit hindi nakakakita, <br />
                          May ngipin ngunit hindi kumakain; <br />
                          Kapag ako’y ginamit nang tama, <br />
                          Buhok mo’y aking inaayos pa rin.
                        </p>
                        <div className="answer-reveal"
                          onClick={() => toggleAnswer(4)}
                          style={{ cursor: 'pointer' }}>
                            <IonIcon icon={eyeOutline} />
                            <span>
                              {visibleAnswers[4] ? "Sagot: Suklay" : "Ipakita ang Sagot"}
                            </span>
                        </div>

                        <p className="riddle-text">
                          Sa umaga ako’y mahaba, <br />
                          Sa tanghali ako’y maiksi; <br />
                          Sa hapon muli akong humahaba, <br />
                          Sino ako, hulaan mo’t isipin.
                        </p>
                        <div className="answer-reveal"
                          onClick={() => toggleAnswer(5)}
                          style={{ cursor: 'pointer' }}>
                            <IonIcon icon={eyeOutline} />
                            <span>
                              {visibleAnswers[5] ? "Sagot: Anino" : "Ipakita ang Sagot"}
                            </span>
                        </div>
                          <IonIcon icon={bulbOutline} />
                          <span>Sagot: Anino</span>
                        </div>
                    )}
                  </IonCardContent>
                </IonCard>

                <IonButton expand="block" className="game-button">
                  <IonIcon icon={gameControllerOutline} slot="start" />
                  Subukan ang Bugtong Laro
                  <IonIcon icon={chevronForwardOutline} slot="end" />
                </IonButton>
              </div>
            </IonAccordion>

            {/* PALAISIPAN */}
            <IonAccordion value="palaisipan" className="modern-accordion">
              <IonItem slot="header" className="accordion-header" lines="none">
                <div className="header-content">
                  <div className="header-icon palaisipan-icon">
                    <IonIcon icon={sparklesOutline} />
                  </div>
                  <div className="header-text">
                    <IonLabel className="accordion-title">Pala-isipan</IonLabel>
                    <p className="accordion-subtitle">Lohikal na Hamon</p>
                  </div>
                </div>
              </IonItem>

              <div className="accordion-content" slot="content">
                <div className="content-intro">
                  <IonText className="intro-text">
                    Ang palaisipan ay humahamon sa lohikal at malikhaing pag-iisip
                    gamit ang hindi tuwirang tanong.
                  </IonText>
                </div>

                <IonCard className="example-card gradient-blue">
                  <IonCardContent>
                    <div className="example-label">
                      <IonIcon icon={bulbOutline} />
                      <span>Tanong</span>
                    </div>
                    <p className="riddle-text">
                      Ano ang bagay na habang kinukuha mo ay lalo mong pinapalaki?
                    </p>
                    <div className="answer-reveal">
                      <IonIcon icon={sparklesOutline} />
                      <span>Sagot: Butas</span>
                    </div>
                  </IonCardContent>
                </IonCard>

                <IonButton expand="block" className="challenge-button" color="tertiary">
                  <IonIcon icon={bulbOutline} slot="start" />
                  Interactive Logic Challenge
                  <IonIcon icon={chevronForwardOutline} slot="end" />
                </IonButton>
              </div>
            </IonAccordion>

            {/* TANAGA */}
            <IonAccordion value="tanaga" className="modern-accordion">
              <IonItem slot="header" className="accordion-header" lines="none">
                <div className="header-content">
                  <div className="header-icon tanaga-icon">
                    <IonIcon icon={createOutline} />
                  </div>
                  <div className="header-text">
                    <IonLabel className="accordion-title">Tanaga</IonLabel>
                    <p className="accordion-subtitle">Tulang Pilipino</p>
                  </div>
                </div>
              </IonItem>

              <div className="accordion-content" slot="content">
                <div className="content-intro">
                  <IonText className="intro-text">
                    Ang tanaga ay apat na taludtod na tula na may pitong pantig bawat
                    linya (7-7-7-7) at may tugma.
                  </IonText>
                </div>

                <IonCard className="example-card gradient-green">
                  <IonCardContent>
                    <div className="example-label">
                      <IonIcon icon={createOutline} />
                      <span>Halimbawa ng Tanaga</span>
                    </div>
                    <p className="poem-text">
                      Wika'y ating yaman,<br />
                      Sa puso'y pinagyayaman;<br />
                      Sa bawat salitang bigkas,<br />
                      Pagka-Pilipino'y lantad.
                    </p>
                  </IonCardContent>
                </IonCard>

                <IonButton expand="block" className="create-button">
                  <IonIcon icon={createOutline} slot="start" />
                  Gumawa ng Sariling Tanaga
                  <IonIcon icon={chevronForwardOutline} slot="end" />
                </IonButton>
              </div>
            </IonAccordion>

            {/* SALAWIKAIN */}
            <IonAccordion value="salawikain" className="modern-accordion">
              <IonItem slot="header" className="accordion-header" lines="none">
                <div className="header-content">
                  <div className="header-icon salawikain-icon">
                    <IonIcon icon={heartOutline} />
                  </div>
                  <div className="header-text">
                    <IonLabel className="accordion-title">Salawikain at Kasabihan</IonLabel>
                    <p className="accordion-subtitle">Karunungan ng Bayan</p>
                  </div>
                </div>
              </IonItem>

              <div className="accordion-content" slot="content">
                <div className="content-intro">
                  <IonText className="intro-text">
                    Ang salawikain at kasabihan ay mga pahayag ng karunungan na
                    nagmumula sa karanasan ng mga Pilipino.
                  </IonText>
                </div>

                <IonCard className="example-card gradient-orange">
                  <IonCardContent>
                    <div className="quote-icon">
                      <IonIcon icon={heartOutline} />
                    </div>
                    <p className="quote-text">
                      "Ang hindi marunong lumingon sa pinanggalingan ay hindi
                      makararating sa paroroonan."
                    </p>
                  </IonCardContent>
                </IonCard>

                <IonButton expand="block" className="lesson-button" fill="outline">
                  <IonIcon icon={eyeOutline} slot="start" />
                  Tukuyin ang Aral
                  <IonIcon icon={chevronForwardOutline} slot="end" />
                </IonButton>
              </div>
            </IonAccordion>
          </IonAccordionGroup>

          {/* QUIZ CTA */}
          <IonCard className="quiz-cta-card">
            <IonCardContent>
              <div className="quiz-cta-content">
                <div className="quiz-icon">
                  <IonIcon icon={gameControllerOutline} />
                </div>
                <div className="quiz-text">
                  <h3>Handa ka na bang subukan ang iyong kaalaman?</h3>
                  <p>Subukin kung gaano karami ang iyong natutunan!</p>
                </div>
              </div>
              <IonButton expand="block" className="quiz-button" color="success">
                <IonIcon icon={playCircleOutline} slot="start" />
                Simulan ang Mini Quiz
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Bottom Spacing */}
        <div className="bottom-spacing" />
      </IonContent>
    </IonPage>
  );
};

export default Quarter1Aralin1;