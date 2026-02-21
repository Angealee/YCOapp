import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonCard,
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
import { quarter1Lesson1 } from "../../data/quarter1Lesson1";
import { useState } from 'react';

const PUZZLE_SIZE = 3;

const createShuffledTiles = (): number[] => {
  const tiles = Array.from({ length: PUZZLE_SIZE * PUZZLE_SIZE }, (_, index) => index);

  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  const isSolved = tiles.every((value, index) => value === index);
  if (isSolved) {
    [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
  }

  return tiles;
};

const bugtongPuzzleImage = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="phone" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1f2937"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="110" cy="100" r="70" fill="rgba(255,255,255,0.12)"/>
  <circle cx="520" cy="520" r="95" fill="rgba(255,255,255,0.1)"/>
  <rect x="200" y="90" rx="45" ry="45" width="200" height="420" fill="url(#phone)" stroke="#334155" stroke-width="6"/>
  <rect x="222" y="132" rx="20" ry="20" width="156" height="296" fill="#38bdf8"/>
  <rect x="230" y="140" rx="12" ry="12" width="140" height="110" fill="#93c5fd"/>
  <rect x="230" y="262" rx="12" ry="12" width="140" height="78" fill="#60a5fa"/>
  <rect x="230" y="350" rx="12" ry="12" width="140" height="68" fill="#2563eb"/>
  <circle cx="300" cy="466" r="16" fill="#0ea5e9"/>
  <rect x="272" y="106" rx="6" ry="6" width="56" height="8" fill="#475569"/>
  <text x="300" y="560" fill="#ffffff" font-size="44" font-family="Arial, sans-serif" font-weight="700" text-anchor="middle">CELLPHONE</text>
</svg>
`)}`;

type BugtongMode = 'read' | 'watch' | 'listen' | 'deepListen' | 'play';

const Quarter1Aralin1: React.FC = () => {
  const [bugtongMode, setBugtongMode] = useState<BugtongMode>('read');
  const [, setActiveSection] = useState<string>('');
  const [showAnswers, setShowAnswers] = useState<{[key: number]: boolean}>({});
  const [puzzleTiles, setPuzzleTiles] = useState<number[]>(() => createShuffledTiles());
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number | null>(null);
  const [puzzleMoves, setPuzzleMoves] = useState<number>(0);
  
  const bugtongSection = quarter1Lesson1.sections.find(
  section => section.id === "bugtong"
  );

  const toggleAnswer = (id: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const puzzleSolved = puzzleTiles.every((value, index) => value === index);

  const resetPuzzle = () => {
    setPuzzleTiles(createShuffledTiles());
    setSelectedPuzzleIndex(null);
    setPuzzleMoves(0);
  };

  const handlePuzzleTileClick = (index: number) => {
    if (puzzleSolved) {
      return;
    }

    if (selectedPuzzleIndex === null) {
      setSelectedPuzzleIndex(index);
      return;
    }

    if (selectedPuzzleIndex === index) {
      setSelectedPuzzleIndex(null);
      return;
    }

    setPuzzleTiles((prev) => {
      const nextTiles = [...prev];
      [nextTiles[selectedPuzzleIndex], nextTiles[index]] = [nextTiles[index], nextTiles[selectedPuzzleIndex]];
      return nextTiles;
    });
    setSelectedPuzzleIndex(null);
    setPuzzleMoves((prev) => prev + 1);
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
             {quarter1Lesson1.meta.title}
            </h1>
            <p className="hero-description">
              {quarter1Lesson1.meta.description}
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
            {/* Bugtong Section */}
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
                    {bugtongSection?.intro}
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
                            <strong>{bugtongSection?.bugtongCharacteristics?.[0]?.title}</strong>
                            <p>{bugtongSection?.bugtongCharacteristics?.[0]?.description}</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">2</span>
                          <div>
                            <strong>{bugtongSection?.bugtongCharacteristics?.[1]?.title}</strong>
                            <p>{bugtongSection?.bugtongCharacteristics?.[1]?.description}</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">3</span>
                          <div>
                            <strong>{bugtongSection?.bugtongCharacteristics?.[2]?.title}</strong>
                            <p>{bugtongSection?.bugtongCharacteristics?.[2]?.description}</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">4</span>
                          <div>
                            <strong>{bugtongSection?.bugtongCharacteristics?.[3]?.title}</strong>
                            <p>{bugtongSection?.bugtongCharacteristics?.[3]?.description}</p>
                          </div>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>

            {/* Palaisipan Section */}
                  <IonCard className="info-card gradient-pink">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={heartOutline} />
                      </div>
                      <h1 className="card-title"><strong>Katangian ng Palaisipan</strong></h1>
                       <div className="card-list">
                        <div className="list-item">
                          <span className="item-number">1</span>
                          <div>
                            <strong>{bugtongSection?.bugtongImportance?.[0]?.title}</strong>
                            <p>{bugtongSection?.bugtongImportance?.[0]?.description}</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">2</span>
                          <div>
                            <strong>{bugtongSection?.bugtongImportance?.[1]?.title}</strong>
                            <p>{bugtongSection?.bugtongImportance?.[1]?.description}</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">3</span>
                          <div>
                            <strong>{bugtongSection?.bugtongImportance?.[2]?.title}</strong>
                            <p>{bugtongSection?.bugtongImportance?.[2]?.description}</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">4</span>
                          <div>
                            <strong>{bugtongSection?.bugtongImportance?.[3]?.title}</strong>
                            <p>{bugtongSection?.bugtongImportance?.[3]?.description}</p>
                          </div>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </div>

                {/* Interactive Chips */}
                <div className="action-chips">
                  <IonChip 
                    className={`modern-chip ${bugtongMode === 'read' ? 'active' : ''}`}
                    onClick={() => setBugtongMode('read')}
                  >
                    <IonIcon icon={bookOutline} />
                    <IonLabel>Pagbasa</IonLabel>
                  </IonChip>
                  <IonChip 
                    className={`modern-chip ${bugtongMode === 'watch' ? 'active' : ''}`}
                    onClick={() => setBugtongMode('watch')}
                  >
                    <IonIcon icon={playCircleOutline} />
                    <IonLabel>Panonood</IonLabel>
                  </IonChip>
                  <IonChip 
                    className={`modern-chip ${bugtongMode === 'listen' ? 'active' : ''}`}
                    onClick={() => setBugtongMode('listen')}
                  >
                    <IonIcon icon={volumeHighOutline} />
                    <IonLabel>Pakikinig</IonLabel>
                  </IonChip>
                  <IonChip 
                    className={`modern-chip ${bugtongMode === 'deepListen' ? 'active' : ''}`}
                    onClick={() => setBugtongMode('deepListen')}
                  >
                    <IonIcon icon={imageOutline} />
                    <IonLabel>Palalkikinig</IonLabel>
                  </IonChip>
                  <IonChip 
                    className={`modern-chip ${bugtongMode === 'play' ? 'active' : ''}`}
                    onClick={() => setBugtongMode('play')}
                  >
                    <IonIcon icon={gameControllerOutline} />
                    <IonLabel>Paglalaro</IonLabel>
                  </IonChip>
                </div>

                {/* Bugtong Examples with Hide/Show Answers */}
                {bugtongMode === 'read' && (
                <div className="bugtong-examples">
                  {/* Example 1 */}
                  {bugtongSection?.examples?.map(example => (
                    <IonCard key={example.id} className="example-card">
                      <IonCardContent>
                        <div className="example-text">
                          <div className="example-label">
                            <IonIcon icon={bookmarkSharp} />
                            <span>{example.label}</span>
                          </div>

                          <p className="riddle-text">
                            {example.text.split("\n").map((line, i) => (
                              <span key={i}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </p>

                          <div className="answer-toggle">
                            <IonButton
                              fill="clear"
                              size="small"
                              onClick={() => toggleAnswer(example.id)}
                            >
                              <IonIcon icon={eyeOutline} slot="start" />
                              {showAnswers[example.id]
                                ? "Itago ang Sagot"
                                : "Ipakita ang Sagot"}
                            </IonButton>
                          </div>

                          {showAnswers[example.id] && (
                            <div className="answer-reveal animated">
                              <IonIcon icon={bulbOutline} />
                              <span>Sagot: {example.answer}</span>
                            </div>
                          )}
                        </div>
                      </IonCardContent>
                    </IonCard>
                  ))}
                </div>
                )}

                {bugtongMode === 'watch' && (
                  <IonCard className="info-card gradient-blue">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={playCircleOutline} />
                      </div>
                      <h1 className="card-title"><strong>Panonood</strong></h1>
                      <p className="mode-description">
                        Obserbahan ang pahiwatig sa bugtong at tukuyin kung anong bagay ang inilalarawan.
                        Tingnan ang anyo, gamit, at konteksto bago sumagot.
                      </p>
                    </IonCardContent>
                  </IonCard>
                )}

                {bugtongMode === 'listen' && (
                  <IonCard className="info-card gradient-green">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={volumeHighOutline} />
                      </div>
                      <h1 className="card-title"><strong>Pakikinig</strong></h1>
                      <p className="mode-description">
                        Basahin nang malakas ang bugtong at pakinggan ang tugma at daloy ng salita.
                        Minsan nasa ritmo at pahiwatig ang susi sa tamang sagot.
                      </p>
                    </IonCardContent>
                  </IonCard>
                )}

                {bugtongMode === 'deepListen' && (
                  <IonCard className="info-card gradient-orange">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={sparklesOutline} />
                      </div>
                      <h1 className="card-title"><strong>Palalkikinig</strong></h1>
                      <p className="mode-description">
                        Pangalawang pakikinig: ulitin ang bugtong, tukuyin ang mahahalagang salita, at ikonekta
                        ang bawat pahiwatig sa posibleng sagot.
                      </p>
                    </IonCardContent>
                  </IonCard>
                )}

                {bugtongMode === 'play' && (
                  <IonCard className="info-card puzzle-card">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={gameControllerOutline} />
                      </div>
                      <h1 className="card-title"><strong>Paglalaro: Image Puzzle</strong></h1>
                      <p className="mode-description puzzle-instructions">
                        Ayusin ang 3x3 na piraso ng larawan. I-click ang dalawang tile para magpalit sila ng puwesto.
                        Kapag buo na ang larawan, makikita mo ang sagot ng bugtong.
                      </p>
                      <div className="puzzle-meta">
                        <IonBadge color="light">Galaw: {puzzleMoves}</IonBadge>
                        <IonBadge color={puzzleSolved ? 'success' : 'warning'}>
                          {puzzleSolved ? 'Solved' : 'In Progress'}
                        </IonBadge>
                      </div>
                      <div className="puzzle-board" role="group" aria-label="Bugtong image puzzle">
                        {puzzleTiles.map((tile, index) => {
                          const x = tile % PUZZLE_SIZE;
                          const y = Math.floor(tile / PUZZLE_SIZE);
                          const bgPositionX = `${(x / (PUZZLE_SIZE - 1)) * 100}%`;
                          const bgPositionY = `${(y / (PUZZLE_SIZE - 1)) * 100}%`;
                          const isSelected = selectedPuzzleIndex === index;

                          return (
                            <button
                              key={`tile-${index}`}
                              type="button"
                              className={`puzzle-tile ${isSelected ? 'selected' : ''}`}
                              onClick={() => handlePuzzleTileClick(index)}
                              aria-label={`Puzzle tile ${index + 1}`}
                              style={{
                                backgroundImage: `url("${bugtongPuzzleImage}")`,
                                backgroundSize: `${PUZZLE_SIZE * 100}% ${PUZZLE_SIZE * 100}%`,
                                backgroundPosition: `${bgPositionX} ${bgPositionY}`
                              }}
                            />
                          );
                        })}
                      </div>
                      {puzzleSolved && (
                        <div className="puzzle-success answer-reveal animated">
                          <IonIcon icon={checkmarkCircleOutline} />
                          <span>Sagot sa Larawan: Cellphone</span>
                        </div>
                      )}
                      <IonButton onClick={resetPuzzle} fill="solid" className="puzzle-reset-btn">
                        <IonIcon icon={gameControllerOutline} slot="start" />
                        I-shuffle Muli
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                )}

                <IonButton expand="block" className="game-button" onClick={() => setBugtongMode('play')}>
                  <IonIcon icon={gameControllerOutline} slot="start" />
                  Buksan ang Paglalaro
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
                    Ang palaisipan ay isang uri ng patalinghagang tanong o sitwasyon na layuning hamunin ang isipan ng isang tao. Hindi tuwiran ang sagot; kailangan ng lohikal na pagiisip, obserbasyon, at malikhaing pag-aanalisa upang matuklasan ang kasagutan. Maaari itong maging bugtong, problema sa matematika, o kahit anong uri ng tanong na nangangailangan ng katalinuhan upang masagot.
                  </IonText>
                </div>
                
                <IonCard className="info-card gradient-pink">
                    <IonCardContent>
                      <div className="card-icon">
                        <IonIcon icon={sparklesOutline} />
                      </div>
                      <h1 className="card-title"><strong>Katangian ng Palaisipan</strong></h1>
                      <div className="card-list">
                        <div className="list-item">
                          <span className="item-number">1</span> 
                          <div>
                            <p>May halong palaisipan at paglalarawan – kadalasan ay patula o may malikhaing pahayag.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">2</span>
                          <div>
                            <p>Hindi literal ang sagot – kailangan gumamit ng isip at malikhain.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">3</span>
                          <div>
                            <p>Nagpapakita ng lohika at kaalaman sa wika – nakatutulong sa pagpapatalas ng isip.</p>
                          </div>
                        </div>
                        <div className="list-item">
                          <span className="item-number">4</span>
                          <div>
                            <p>Maikli at madaling tandaan – kadalasang may ritmo o sukat.</p>
                          </div>
                        </div>
                      </div>
                    </IonCardContent>
                </IonCard>

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
