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
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

const PUZZLE_SIZE = 3;

type BugtongExample = {
  id: number;
  label: string;
  text: string;
  answer: string;
};

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

const createBugtongPuzzleImage = (answerText: string): string => {
  const key = (answerText || '').trim().toLowerCase();

  const wrap = (inner: string) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="panel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.22)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.10)"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(250,204,21,0.75)"/>
      <stop offset="100%" stop-color="rgba(56,189,248,0.65)"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>

  <!-- Big frame so side tiles are not "just color" -->
  <rect x="40" y="70" rx="34" ry="34" width="520" height="480" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
  <rect x="58" y="88" rx="28" ry="28" width="484" height="444" fill="url(#panel)" stroke="rgba(255,255,255,0.18)" stroke-width="4"/>

  <!-- Asymmetric accents (helps puzzle uniqueness) -->
  <rect x="58" y="88" rx="28" ry="28" width="86" height="444" fill="rgba(0,0,0,0.14)"/>
  <path d="M110 88 L542 320 L542 365 L110 133 Z" fill="rgba(255,255,255,0.06)"/>
  <circle cx="520" cy="118" r="42" fill="rgba(255,255,255,0.10)"/>
  <circle cx="515" cy="500" r="66" fill="rgba(0,0,0,0.10)"/>

  <!-- Tiny dots pattern -->
  <g fill="rgba(255,255,255,0.16)">
    <circle cx="185" cy="120" r="4"/><circle cx="230" cy="120" r="4"/><circle cx="275" cy="120" r="4"/>
    <circle cx="455" cy="150" r="4"/><circle cx="485" cy="178" r="4"/><circle cx="455" cy="206" r="4"/>
    <circle cx="180" cy="505" r="4"/><circle cx="215" cy="505" r="4"/><circle cx="250" cy="505" r="4"/>
  </g>

  ${inner}
</svg>
`;

  const templates: Record<string, string> = {
    cellphone: wrap(`
      <rect x="180" y="105" rx="44" ry="44" width="240" height="420" fill="rgba(0,0,0,0.32)" stroke="rgba(255,255,255,0.22)" stroke-width="6"/>
      <rect x="202" y="155" rx="20" ry="20" width="196" height="300" fill="rgba(56,189,248,0.85)"/>
      <rect x="228" y="125" rx="8" ry="8" width="144" height="12" fill="rgba(255,255,255,0.55)"/>
      <circle cx="300" cy="480" r="16" fill="rgba(255,255,255,0.55)"/>
      <path d="M208 240 H392" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round"/>
      <path d="M208 315 H392" stroke="rgba(255,255,255,0.12)" stroke-width="10" stroke-linecap="round"/>
    `),
    kalendaryo: wrap(`
      <rect x="110" y="150" rx="24" ry="24" width="380" height="330" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" stroke-width="6"/>
      <rect x="110" y="150" rx="24" ry="24" width="380" height="82" fill="rgba(239,68,68,0.85)"/>
      <rect x="145" y="160" rx="12" ry="12" width="310" height="10" fill="rgba(255,255,255,0.18)"/>
      <circle cx="185" cy="190" r="16" fill="rgba(255,255,255,0.70)"/>
      <circle cx="415" cy="190" r="16" fill="rgba(255,255,255,0.70)"/>
      <g fill="rgba(255,255,255,0.55)">
        <rect x="150" y="260" width="68" height="46" rx="10"/>
        <rect x="242" y="260" width="68" height="46" rx="10"/>
        <rect x="334" y="260" width="68" height="46" rx="10"/>
        <rect x="426" y="260" width="48" height="46" rx="10"/>
        <rect x="150" y="326" width="68" height="46" rx="10"/>
        <rect x="242" y="326" width="68" height="46" rx="10"/>
        <rect x="334" y="326" width="68" height="46" rx="10"/>
        <rect x="150" y="392" width="68" height="46" rx="10"/>
        <rect x="242" y="392" width="68" height="46" rx="10"/>
      </g>
    `),
    tubig: wrap(`
      <path d="M300 120 C250 210, 185 280, 185 360 C185 455, 245 520, 300 520 C355 520, 415 455, 415 360 C415 280, 350 210, 300 120 Z"
        fill="rgba(56,189,248,0.75)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
      <path d="M245 390 C245 438, 278 470, 318 485" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="12" stroke-linecap="round"/>
      <path d="M300 210 C275 255, 250 290, 250 335 C250 385, 280 420, 310 430" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="10" stroke-linecap="round"/>
    `),
    aklat: wrap(`
      <path d="M120 185 Q195 145 270 185 L270 500 Q195 460 120 500 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
      <path d="M270 185 Q300 155 330 185 L330 500 Q300 470 270 500 Z" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
      <path d="M330 185 Q405 145 480 185 L480 500 Q405 460 330 500 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
      <path d="M270 185 L270 500" stroke="rgba(255,255,255,0.35)" stroke-width="6"/>
      <path d="M330 185 L330 500" stroke="rgba(255,255,255,0.35)" stroke-width="6"/>
      <g stroke="rgba(255,255,255,0.16)" stroke-width="6" stroke-linecap="round">
        <path d="M150 250 H250"/><path d="M150 290 H250"/><path d="M150 330 H250"/><path d="M150 370 H250"/>
        <path d="M350 250 H450"/><path d="M350 290 H450"/><path d="M350 330 H450"/><path d="M350 370 H450"/>
      </g>
    `),
    radyo: wrap(`
      <rect x="105" y="240" rx="24" ry="24" width="390" height="225" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.22)" stroke-width="6"/>
      <path d="M165 225 L360 150" stroke="rgba(255,255,255,0.45)" stroke-width="10" stroke-linecap="round"/>
      <circle cx="185" cy="352" r="62" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
      <circle cx="185" cy="352" r="30" fill="rgba(0,0,0,0.12)"/>
      <rect x="290" y="295" rx="12" ry="12" width="170" height="32" fill="rgba(255,255,255,0.32)"/>
      <rect x="290" y="345" rx="12" ry="12" width="170" height="32" fill="rgba(255,255,255,0.22)"/>
      <rect x="290" y="395" rx="12" ry="12" width="170" height="32" fill="rgba(255,255,255,0.14)"/>
      <path d="M505 305 C535 335, 535 375, 505 405" fill="none" stroke="rgba(255,255,255,0.30)" stroke-width="10" stroke-linecap="round"/>
    `),
    suklay: wrap(`
      <rect x="95" y="235" rx="28" ry="28" width="410" height="135" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
      <g stroke="rgba(255,255,255,0.35)" stroke-width="10" stroke-linecap="round">
        <path d="M130 380 L130 520"/><path d="M165 380 L165 520"/><path d="M200 380 L200 520"/><path d="M235 380 L235 520"/>
        <path d="M270 380 L270 520"/><path d="M305 380 L305 520"/><path d="M340 380 L340 520"/><path d="M375 380 L375 520"/>
        <path d="M410 380 L410 520"/><path d="M445 380 L445 520"/><path d="M480 380 L480 520"/>
      </g>
      <rect x="120" y="265" rx="14" ry="14" width="350" height="20" fill="rgba(0,0,0,0.10)"/>
    `),
    anino: wrap(`
      <defs>
        <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.55)"/>
          <stop offset="55%" stop-color="rgba(0,0,0,0.28)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.05)"/>
        </linearGradient>
        <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <!-- ground plane -->
      <path d="M70 520 L560 460 L560 560 L70 560 Z" fill="rgba(0,0,0,0.10)"/>
      <path d="M70 520 L560 460" stroke="rgba(255,255,255,0.14)" stroke-width="8" stroke-linecap="round"/>

      <!-- sun + strong rays -->
      <circle cx="120" cy="140" r="54" fill="url(#accent)"/>
      <circle cx="120" cy="140" r="78" fill="rgba(250,204,21,0.10)"/>
      <g stroke="rgba(250,204,21,0.38)" stroke-width="12" stroke-linecap="round">
        <path d="M120 45 V78"/><path d="M120 202 V235"/><path d="M25 140 H58"/><path d="M182 140 H215"/>
        <path d="M58 78 L80 100"/><path d="M160 180 L182 202"/><path d="M160 100 L182 78"/><path d="M58 202 L80 180"/>
      </g>

      <!-- light beam direction -->
      <path d="M155 175 L310 250" stroke="rgba(250,204,21,0.18)" stroke-width="28" stroke-linecap="round"/>
      <path d="M165 190 L315 265" stroke="rgba(250,204,21,0.12)" stroke-width="44" stroke-linecap="round"/>

      <!-- person silhouette (brighter) -->
      <g fill="rgba(255,255,255,0.34)" stroke="rgba(255,255,255,0.20)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <!-- head -->
        <circle cx="240" cy="215" r="44"/>
        <!-- neck -->
        <path d="M232 260 L232 285"/>
        <path d="M248 260 L248 285"/>
        <!-- torso -->
        <path d="M200 300 Q240 275 280 300 L295 395 Q240 430 185 395 Z"/>
        <!-- arms -->
        <path d="M205 320 Q160 355 135 405"/>
        <path d="M275 320 Q320 355 345 405"/>
        <!-- legs -->
        <path d="M210 395 Q205 470 190 545"/>
        <path d="M270 395 Q275 470 292 545"/>
        <!-- feet -->
        <path d="M170 548 H210"/>
        <path d="M272 548 H312"/>
      </g>

      <!-- cast shadow: big, dark near feet, fading outward -->
      <path
        d="M200 486 L290 486 L565 535 L520 560 L225 560 Z"
        fill="url(#shadowGrad)"
        filter="url(#shadowBlur)"
      />
      <!-- core shadow for extra contrast -->
      <path
        d="M215 500 L280 500 L540 540 L480 555 L235 555 Z"
        fill="rgba(0,0,0,0.28)"
        filter="url(#shadowBlur)"
      />
    `),
  };

  const svg = templates[key] ?? wrap(`
    <circle cx="300" cy="260" r="140" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
    <path d="M270 330 C270 290, 330 300, 320 260 C312 230, 270 235, 270 205" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="18" stroke-linecap="round"/>
    <circle cx="300" cy="385" r="14" fill="rgba(255,255,255,0.65)"/>
  `);

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const splitLines = (text: string): string[] => text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

type BugtongMode = 'read' | 'watch' | 'listen' | 'deepListen' | 'play';

const Quarter1Aralin1: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const aralinId = Number(id);

  const sectionIdByAralin: Record<number, 'bugtong' | 'palaisipan' | 'tanaga' | 'salawikain'> = {
    1: 'bugtong',
    2: 'palaisipan',
    3: 'tanaga',
    4: 'salawikain',
  };

  const selectedSectionId = sectionIdByAralin[aralinId] ?? 'bugtong';

  const [bugtongMode, setBugtongMode] = useState<BugtongMode>('read');
  const [activeSection, setActiveSection] = useState<string>(selectedSectionId);
  const [showAnswers, setShowAnswers] = useState<{[key: number]: boolean}>({});
  const [puzzleTiles, setPuzzleTiles] = useState<number[]>(() => createShuffledTiles());
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number | null>(null);
  const [puzzleMoves, setPuzzleMoves] = useState<number>(0);
  
  const bugtongSection = quarter1Lesson1.sections.find(
  section => section.id === "bugtong"
  );

  useEffect(() => {
    setActiveSection(selectedSectionId);
  }, [selectedSectionId]);

  const bugtongExamples: BugtongExample[] = useMemo(() => {
    return ((bugtongSection?.examples ?? []) as BugtongExample[]).filter(
      (ex) => ex && typeof ex.text === 'string' && typeof ex.answer === 'string'
    );
  }, [bugtongSection]);

  const [activePuzzleExampleId, setActivePuzzleExampleId] = useState<number>(1);

  const activePuzzleExample = useMemo(() => {
    const found = bugtongExamples.find((ex) => ex.id === activePuzzleExampleId);
    return found ?? bugtongExamples[0];
  }, [activePuzzleExampleId, bugtongExamples]);

  const activePuzzleImage = useMemo(() => {
    return createBugtongPuzzleImage(activePuzzleExample?.answer ?? '');
  }, [activePuzzleExample?.answer]);

  const activePuzzleIndex = useMemo(() => {
    if (!activePuzzleExample) return -1;
    return bugtongExamples.findIndex((ex) => ex.id === activePuzzleExample.id);
  }, [activePuzzleExample, bugtongExamples]);

  const puzzleSolved = puzzleTiles.every((value, index) => value === index);

  const resetPuzzle = () => {
    setPuzzleTiles(createShuffledTiles());
    setSelectedPuzzleIndex(null);
    setPuzzleMoves(0);
  };

  const setPuzzleExample = (exampleId: number) => {
    setActivePuzzleExampleId(exampleId);
    resetPuzzle();
  };

  const goToNextPuzzleExample = () => {
    if (!bugtongExamples.length) return;
    const current = activePuzzleIndex >= 0 ? activePuzzleIndex : 0;
    const next = (current + 1) % bugtongExamples.length;
    setPuzzleExample(bugtongExamples[next].id);
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

  const toggleAnswer = (id: number) => {
    setShowAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const heroTitle = useMemo(() => {
    switch (selectedSectionId) {
      case 'bugtong':
        return 'Bugtong';
      case 'palaisipan':
        return 'Pala-isipan';
      case 'tanaga':
        return 'Tanaga';
      case 'salawikain':
        return 'Salawikain';
      default:
        return quarter1Lesson1.meta.title;
    }
  }, [selectedSectionId]);

  const heroDescription = useMemo(() => {
    if (selectedSectionId === 'bugtong') return bugtongSection?.intro ?? quarter1Lesson1.meta.description;
    if (selectedSectionId === 'palaisipan') {
      return 'Ang palaisipan ay isang uri ng patalinghagang tanong o sitwasyon na layuning hamunin ang isipan.';
    }
    if (selectedSectionId === 'tanaga') return 'Isang maikling tulang Pilipino na may tugma at sukat.';
    if (selectedSectionId === 'salawikain') return 'Mga kasabihang may aral at karunungang bayan.';
    return quarter1Lesson1.meta.description;
  }, [selectedSectionId, bugtongSection?.intro]);

  const totalAralin = 4;
  const safeAralinId =
    Number.isFinite(aralinId) && aralinId >= 1 && aralinId <= totalAralin ? aralinId : 1;
  const nextAralinId = safeAralinId < totalAralin ? safeAralinId + 1 : null;

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
              <span className="aralin-badge">Aralin {safeAralinId}</span>
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
             {heroTitle}
            </h1>
            <p className="hero-description">
              {heroDescription}
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <IonIcon icon={sparklesOutline} />
                <span>1 Paksa</span>
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
            value={activeSection}
            onIonChange={(e) => setActiveSection((e.detail.value as string) ?? '')}
          >
            {/* Bugtong Section */}
            {selectedSectionId === 'bugtong' && (
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

                      {bugtongExamples.length ? (
                        <div className="puzzle-example-chips" role="group" aria-label="Piliin ang halimbawa">
                          {bugtongExamples.map((ex) => (
                            <IonChip
                              key={`puzzle-ex-${ex.id}`}
                              className={`modern-chip ${activePuzzleExampleId === ex.id ? 'active' : ''}`}
                              onClick={() => setPuzzleExample(ex.id)}
                            >
                              <IonIcon icon={bookmarkSharp} />
                              <IonLabel>{ex.label}</IonLabel>
                            </IonChip>
                          ))}
                        </div>
                      ) : null}

                      {activePuzzleExample ? (
                        <div className="puzzle-preview" aria-label="Puzzle preview image">
                          <div className="puzzle-preview-header">
                            <IonIcon icon={imageOutline} />
                            <span>Preview ng Larawan</span>
                          </div>
                          <img
                            className="puzzle-preview-image"
                            src={activePuzzleImage}
                            alt={`Preview para sa ${activePuzzleExample.label}`}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : null}

                      {activePuzzleExample?.text ? (
                        <div className="puzzle-riddle">
                          <IonText className="intro-text">
                            {splitLines(activePuzzleExample.text).map((line, i) => (
                              <span key={`puzzle-r-${activePuzzleExample.id}-l-${i}`}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </IonText>
                        </div>
                      ) : null}

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
                                backgroundImage: `url("${activePuzzleImage}")`,
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
                          <span>
                            Sagot: <strong>{activePuzzleExample?.answer ?? ''}</strong>
                          </span>
                        </div>
                      )}

                      <div className="puzzle-actions">
                        <IonButton onClick={resetPuzzle} fill="solid" className="puzzle-reset-btn">
                          <IonIcon icon={gameControllerOutline} slot="start" />
                          I-shuffle Muli
                        </IonButton>
                        <IonButton onClick={goToNextPuzzleExample} fill="outline" className="puzzle-next-btn">
                          Susunod na Halimbawa
                          <IonIcon icon={chevronForwardOutline} slot="end" />
                        </IonButton>
                      </div>
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
            )}

            {/* PALAISIPAN */}
            {selectedSectionId === 'palaisipan' && (
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
            )}

            {/* TANAGA */}
            {selectedSectionId === 'tanaga' && (
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
            )}

            {/* SALAWIKAIN */}
            {selectedSectionId === 'salawikain' && (
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
            )}
          </IonAccordionGroup>

          {/* QUIZ CTA */}
          <IonCard className="quiz-cta-card">
            <IonCardContent>
              <div className="lesson-complete-message">
                <div className="complete-icon">
                  <IonIcon icon={checkmarkCircleOutline} />
                </div>
                <div className="complete-text">
                  <h3>Natapos mo ang Aralin {safeAralinId}!</h3>
                  <p>
                    {nextAralinId ? 'Magaling! Ikaw ay handa na para sa susunod na aralin.' : 'Magaling! Natapos mo ang Quarter 1.'}
                  </p>
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
                  
                  {nextAralinId ? (
                    <IonButton 
                      expand="block" 
                      className="nav-button next-button"
                      onClick={() => window.location.href = `/quarter/1/aralin/${nextAralinId}`}
                    >
                      Susunod na Aralin
                      <IonIcon icon={chevronForwardOutline} slot="end" />
                    </IonButton>
                  ) : (
                    <IonButton 
                      expand="block" 
                      className="nav-button next-button"
                      onClick={() => window.location.href = '/quarter/1'}
                    >
                      Bumalik sa Quarter 1
                      <IonIcon icon={chevronForwardOutline} slot="end" />
                    </IonButton>
                  )}
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
