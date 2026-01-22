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
  chevronBackOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';

import './Quarter1Aralin1.css';
import { useState } from 'react';

const Quarter1Aralin1: React.FC = () => {
  const [isAudio, setIsAudio] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [showAnswers, setShowAnswers] = useState<{[key: number]: boolean}>({});

  const toggleAnswer = (id: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const changeState = () => {
    setIsAudio(!isAudio);
  };

  // Remove progress tracking and make all lessons accessible
  const handleQuizStart = () => {
    // Navigate to quiz without checking progress
    window.location.href = '/quiz';
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

                {/* Bugtong Examples with Hide/Show Answers */}
                <div className="bugtong-examples">
                  {/* Example 1 */}
                  <IonCard className="example-card">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bookmarkSharp} />
                          <span>Halimbawa 1</span>
                        </div>
                        <p className="riddle-text">
                          Hindi tao, hindi hayop,<br />
                          Ngunit marunong magsalita;<br />
                          Sa isang pindot mo lamang,<br />
                          Buong mundo'y makikita.
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(1)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[1] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                          </IonButton>
                        </div>
                        {showAnswers[1] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={bulbOutline} />
                            <span>Sagot: Cellphone</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 2 */}
                  <IonCard className="example-card">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bookmarkSharp} />
                          <span>Halimbawa 2</span>
                        </div>
                        <p className="riddle-text">
                          May hawak ako ng kandila<br />
                          Pero hindi ako ilaw;<br />
                          May damit ako pero hindi ako tao,<br />
                          May katawan ako pero hindi ako hayop.
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(2)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[2] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                          </IonButton>
                        </div>
                        {showAnswers[2] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={bulbOutline} />
                            <span>Sagot: Manananggal</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 3 */}
                  <IonCard className="example-card">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bookmarkSharp} />
                          <span>Halimbawa 3</span>
                        </div>
                        <p className="riddle-text">
                          Isang butil ng palay<br />
                          Sakop ko ang buong mundo.
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(3)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[3] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                          </IonButton>
                        </div>
                        {showAnswers[3] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={bulbOutline} />
                            <span>Sagot: Bituin</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 4 */}
                  <IonCard className="example-card">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bookmarkSharp} />
                          <span>Halimbawa 4</span>
                        </div>
                        <p className="riddle-text">
                          Labing-apat na inahin<br />
                          Labing-apat na anak,<br />
                          Labing-apat na bahay,<br />
                          Labing-apat na buhay.
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(4)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[4] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                          </IonButton>
                        </div>
                        {showAnswers[4] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={bulbOutline} />
                            <span>Sagot: Kalendaryo</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                </div>

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

                {/* Palaisipan Examples with Hide/Show Answers */}
                <div className="palaisipan-examples">
                  {/* Example 1 */}
                  <IonCard className="example-card gradient-blue">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bulbOutline} />
                          <span>Tanong 1</span>
                        </div>
                        <p className="riddle-text">
                          Ano ang bagay na habang kinukuha mo ay lalo mong pinapalaki?
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(5)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[5] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                          </IonButton>
                        </div>
                        {showAnswers[5] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={sparklesOutline} />
                            <span>Sagot: Butas</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 2 */}
                  <IonCard className="example-card gradient-blue">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bulbOutline} />
                          <span>Tanong 2</span>
                        </div>
                        <p className="riddle-text">
                          Anong hayop ang may apat na paa kapag bata, dalawa kapag matanda?
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(6)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[6] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                          </IonButton>
                        </div>
                        {showAnswers[6] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={sparklesOutline} />
                            <span>Sagot: Tao</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 3 */}
                  <IonCard className="example-card gradient-blue">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={bulbOutline} />
                          <span>Tanong 3</span>
                        </div>
                        <p className="riddle-text">
                          Ano ang bagay na kahit puno pa ay hindi tumatanda?
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(7)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[7] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                          </IonButton>
                        </div>
                        {showAnswers[7] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={sparklesOutline} />
                            <span>Sagot: Bato</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                </div>

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

                {/* Tanaga Examples with Hide/Show Answers */}
                <div className="tanaga-examples">
                  {/* Example 1 */}
                  <IonCard className="example-card gradient-green">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={createOutline} />
                          <span>Tanaga 1</span>
                        </div>
                        <p className="poem-text">
                          Wika'y ating yaman,<br />
                          Sa puso'y pinagyayaman;<br />
                          Sa bawat salitang bigkas,<br />
                          Pagka-Pilipino'y lantad.
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(8)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[8] ? 'Itago ang Tema' : 'Ipakita ang Tema'}
                          </IonButton>
                        </div>
                        {showAnswers[8] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={createOutline} />
                            <span>Tema: Pagmamahal sa Wikang Filipino</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 2 */}
                  <IonCard className="example-card gradient-green">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={createOutline} />
                          <span>Tanaga 2</span>
                        </div>
                        <p className="poem-text">
                          Kabataan ng bayan,<br />
                          Mag-aral nang mabuti;<br />
                          Sa hinaharap mong buhay,<br />
                          Ikaw ang magiging liwanag.
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(9)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[9] ? 'Itago ang Tema' : 'Ipakita ang Tema'}
                          </IonButton>
                        </div>
                        {showAnswers[9] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={createOutline} />
                            <span>Tema: Edukasyon at Kinabukasan</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 3 */}
                  <IonCard className="example-card gradient-green">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="example-label">
                          <IonIcon icon={createOutline} />
                          <span>Tanaga 3</span>
                        </div>
                        <p className="poem-text">
                          Kalikasan ay yaman,<br />
                          Alagaan natin ito;<br />
                          Para sa susunod na henerasyon,<br />
                          Magiging masaganang buhay.
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(10)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[10] ? 'Itago ang Tema' : 'Ipakita ang Tema'}
                          </IonButton>
                        </div>
                        {showAnswers[10] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={createOutline} />
                            <span>Tema: Pangangalaga sa Kalikasan</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                </div>

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

                {/* Salawikain at Kasabihan Examples with Hide/Show Answers */}
                <div className="salawikain-examples">
                  {/* Example 1 */}
                  <IonCard className="example-card gradient-orange">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="quote-icon">
                          <IonIcon icon={heartOutline} />
                        </div>
                        <p className="quote-text">
                          "Ang hindi marunong lumingon sa pinanggalingan ay hindi
                          makararating sa paroroonan."
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(11)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[11] ? 'Itago ang Aral' : 'Ipakita ang Aral'}
                          </IonButton>
                        </div>
                        {showAnswers[11] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={heartOutline} />
                            <span>Aral: Mahalagang alamin at ipagmalaki ang ating pinagmulan</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 2 */}
                  <IonCard className="example-card gradient-orange">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="quote-icon">
                          <IonIcon icon={heartOutline} />
                        </div>
                        <p className="quote-text">
                          "Nasa Diyos ang awa, nasa tao ang gawa."
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(12)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[12] ? 'Itago ang Aral' : 'Ipakita ang Aral'}
                          </IonButton>
                        </div>
                        {showAnswers[12] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={heartOutline} />
                            <span>Aral: Huwag umasa sa biyaya lamang, kailangan din ang sariling pagkilos</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 3 */}
                  <IonCard className="example-card gradient-orange">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="quote-icon">
                          <IonIcon icon={heartOutline} />
                        </div>
                        <p className="quote-text">
                          "Kung ano ang puno, siya ang bunga."
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(13)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[13] ? 'Itago ang Aral' : 'Ipakita ang Aral'}
                          </IonButton>
                        </div>
                        {showAnswers[13] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={heartOutline} />
                            <span>Aral: Ang kalakasan o kahinaan ng isang tao ay nagmumula sa kanyang pamilya at pinagmulan</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  {/* Example 4 */}
                  <IonCard className="example-card gradient-orange">
                    <IonCardContent>
                      <div className="example-text">
                        <div className="quote-icon">
                          <IonIcon icon={heartOutline} />
                        </div>
                        <p className="quote-text">
                          "Wag mo ring kalalimangin ang dating iniirog."
                        </p>
                        <div className="answer-toggle">
                          <IonButton 
                            fill="clear" 
                            size="small"
                            onClick={() => toggleAnswer(14)}
                          >
                            <IonIcon icon={eyeOutline} slot="start" />
                            {showAnswers[14] ? 'Itago ang Aral' : 'Ipakita ang Aral'}
                          </IonButton>
                        </div>
                        {showAnswers[14] && (
                          <div className="answer-reveal animated">
                            <IonIcon icon={heartOutline} />
                            <span>Aral: Huwag kalimutan ang mga taong dati nating minahal at tinulungan</span>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                </div>

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
              <div className="lesson-complete-message">
                <div className="complete-icon">
                  <IonIcon icon={checkmarkCircleOutline} />
                </div>
                <div className="complete-text">
                  <h3>Natapos mo ang Aralin 1!</h3>
                  <p>Magaling! Ikaw ay handa na para sa susunod na aralin.</p>
                </div>
                
                {/* Navigation Buttons */}
                <div className="navigation-buttons">
                  <IonButton 
                    fill="clear" 
                    className="nav-button prev-button"
                    onClick={() => window.location.href = '/quarter/1'}
                  >
                    <IonIcon icon={chevronBackOutline} slot="start" />
                    Bumalik sa Quarter 1
                  </IonButton>
                  
                  <IonButton 
                    expand="block" 
                    className="nav-button next-button"
                    onClick={() => window.location.href = '/quarter/1/aralin/2'}
                  >
                    Susunod na Aralin
                    <IonIcon icon={chevronForwardOutline} slot="end" />
                  </IonButton>
                </div>
              </div>
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