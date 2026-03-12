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
  IonBadge,
  IonModal
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
  heart,
  playCircleOutline,
  chevronForwardOutline,
  chevronBackOutline,
  checkmarkCircleOutline,
  watch
} from 'ionicons/icons';

import './Quarter1Aralin1.css';
import { quarter1Lesson1 } from "../../data/quarter1Lesson1";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import WordSearchFillBlankGame from "../../components/WordSearchFillBlankGame";

const PUZZLE_SIZE = 3;

const playRevealSound = () => {
  const audio = new Audio('/assets/audio/reveal.mp3');
  audio.volume = 0.6;
  audio.play().catch(() => {});
};

type BugtongExample = {
  id: number;
  label: string;
  text: string;
  answer: string;
};

// ─── GIF map per section ──────────────────────────────────────────────────────
const SECTION_GIFS: Record<string, { src: string; alt: string; bgClass: string }> = {
  bugtong:    { src: '/assets/gif/Yelo.gif',   alt: 'Bugtong sagot!',    bgClass: 'gif-bugtong' },
  palaisipan: { src: '/assets/gif/isip.gif',   alt: 'Palaisipan sagot!', bgClass: 'gif-palaisipan' },
  tanaga:     { src: '/assets/gif/Liham.gif',  alt: 'Tanaga tema!',      bgClass: 'gif-tanaga' },
  salawikain: { src: '/assets/gif/Orasan.gif', alt: 'Salawikain aral!',  bgClass: 'gif-salawikain' },
};

const BUGTONG_ANSWER_GIFS: Record<string, string> = {
  cellphone:  '/assets/gif/Cellphone.gif',
  kalendaryo: '/assets/gif/Orasan.gif',
  tubig:      '/assets/gif/Yelo.gif',
  aklat:      '/assets/gif/Liham.gif',
  radyo:      '/assets/gif/Radyo.gif',
  suklay:     '/assets/gif/Suklay.gif',
  anino:      '/assets/gif/Anino.gif',
};

// ─── Answer Reveal WITH GIF ───────────────────────────────────────────────────
const AnswerRevealWithGif: React.FC<{
  sectionId: string;
  icon: string;
  label: string;
  answer?: string;
}> = ({ sectionId, icon, label, answer }) => {
  const gif = SECTION_GIFS[sectionId] ?? SECTION_GIFS['bugtong'];
  const gifSrc = (sectionId === 'bugtong' && answer)
    ? (BUGTONG_ANSWER_GIFS[answer.trim().toLowerCase()] ?? gif.src)
    : gif.src;
  const [gifLoaded, setGifLoaded] = useState(false);
  const [gifError, setGifError] = useState(false);

  return (
    <div className="answer-reveal-gif-block">
      {!gifError && (
        <div className={`answer-gif-wrapper ${gif.bgClass} ${gifLoaded ? 'gif-visible' : 'gif-hidden'}`}>
          <img
            className="answer-gif"
            src={gifSrc}
            alt={gif.alt}
            loading="eager"
            decoding="async"
            onLoad={() => setGifLoaded(true)}
            onError={() => setGifError(true)}
          />
        </div>
      )}
      <div className="answer-reveal animated">
        <IonIcon icon={icon} />
        <span>{label}</span>
      </div>
    </div>
  );
};

// ─── DefinitionModal ──────────────────────────────────────────────────────────
// CHANGE 1: Tap the card → IonModal bottom sheet slides up with definition text.
// Always shows title + hint. Reusable across other lessons.
const DefinitionModal: React.FC<{
  cardTitle: string;
  cardSubtitle: string;
  icon: string;
  definition: string;
  tapHint?: string;
}> = ({ cardTitle, cardSubtitle, icon, definition, tapHint }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Tappable card row — always visible */}
      <div className="defcard-tap" onClick={() => setOpen(true)}>
        <div className="defcard-left">
          <div className="defcard-icon-ring">
            <IonIcon icon={icon} />
          </div>
          <div className="defcard-text">
            <strong className="defcard-title">{cardTitle}</strong>
            <span className="defcard-subtitle">{cardSubtitle}</span>
          </div>
        </div>
        <div className="defcard-hint">
          <span>{tapHint ?? 'I-tap para basahin'}</span>
          <span className="defcard-finger">👆</span>
        </div>
      </div>

      {/* Bottom sheet modal */}
      <IonModal
        isOpen={open}
        onDidDismiss={() => setOpen(false)}
        breakpoints={[0, 0.55, 0.85]}
        initialBreakpoint={0.55}
        className="definition-modal"
      >
        <div className="defmodal-content">
          <div className="defmodal-handle" />
          <div className="defmodal-header">
            <div className="defmodal-icon-ring">
              <IonIcon icon={icon} />
            </div>
            <div>
              <h2 className="defmodal-title">{cardTitle}</h2>
              <p className="defmodal-subtitle">{cardSubtitle}</p>
            </div>
          </div>
          <div className="defmodal-divider" />
          <p className="defmodal-body">{definition}</p>
          <IonButton
            expand="block"
            className="defmodal-close-btn"
            onClick={() => setOpen(false)}
          >
            Nakuha ko na! ✅
          </IonButton>

          {/* Splash image hero */}
          <div className="defmodal-splash-wrap">
            <img
              src="/assets/img/questionSplash.PNG"
              alt="Question splash"
              className="defmodal-splash-img"
            />
            <div className="defmodal-splash-overlay" />
          </div>
        </div>
      </IonModal>
    </>
  );
};

// ─── ExpandableItem ───────────────────────────────────────────────────────────
// CHANGES 2 & 3: Tap to expand/collapse a numbered item inside info cards.
// Keeps existing .list-item / .item-number design intact.
interface ExpandableItemProps {
  number: number;
  title: string;
  description: string;
}
const ExpandableItem: React.FC<ExpandableItemProps> = ({ number, title, description }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`list-item expandable-item ${expanded ? 'expanded' : ''}`}
      onClick={() => setExpanded((v) => !v)}
    >
      <span className="item-number">{number}</span>
      <div className="expandable-body">
        <div className="expandable-title-row">
          <strong>{title}</strong>
          <span className={`expand-chevron ${expanded ? 'open' : ''}`}>›</span>
        </div>
        <div className={`expandable-desc ${expanded ? 'desc-open' : 'desc-closed'}`}>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const createShuffledTiles = (): number[] => {
  const tiles = Array.from({ length: PUZZLE_SIZE * PUZZLE_SIZE }, (_, index) => index);
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  const isSolved = tiles.every((value, index) => value === index);
  if (isSolved) { [tiles[0], tiles[1]] = [tiles[1], tiles[0]]; }
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
  <rect x="40" y="70" rx="34" ry="34" width="520" height="480" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" stroke-width="6"/>
  <rect x="58" y="88" rx="28" ry="28" width="484" height="444" fill="url(#panel)" stroke="rgba(255,255,255,0.18)" stroke-width="4"/>
  <rect x="58" y="88" rx="28" ry="28" width="86" height="444" fill="rgba(0,0,0,0.14)"/>
  <path d="M110 88 L542 320 L542 365 L110 133 Z" fill="rgba(255,255,255,0.06)"/>
  <circle cx="520" cy="118" r="42" fill="rgba(255,255,255,0.10)"/>
  <circle cx="515" cy="500" r="66" fill="rgba(0,0,0,0.10)"/>
  <g fill="rgba(255,255,255,0.16)">
    <circle cx="185" cy="120" r="4"/><circle cx="230" cy="120" r="4"/><circle cx="275" cy="120" r="4"/>
    <circle cx="455" cy="150" r="4"/><circle cx="485" cy="178" r="4"/><circle cx="455" cy="206" r="4"/>
    <circle cx="180" cy="505" r="4"/><circle cx="215" cy="505" r="4"/><circle cx="250" cy="505" r="4"/>
  </g>
  ${inner}
</svg>`;

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
        <rect x="150" y="260" width="68" height="46" rx="10"/><rect x="242" y="260" width="68" height="46" rx="10"/>
        <rect x="334" y="260" width="68" height="46" rx="10"/><rect x="426" y="260" width="48" height="46" rx="10"/>
        <rect x="150" y="326" width="68" height="46" rx="10"/><rect x="242" y="326" width="68" height="46" rx="10"/>
        <rect x="334" y="326" width="68" height="46" rx="10"/><rect x="150" y="392" width="68" height="46" rx="10"/>
        <rect x="242" y="392" width="68" height="46" rx="10"/>
      </g>
    `),
    tubig: wrap(`
      <path d="M300 120 C250 210, 185 280, 185 360 C185 455, 245 520, 300 520 C355 520, 415 455, 415 360 C415 280, 350 210, 300 120 Z" fill="rgba(56,189,248,0.75)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
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
      <path d="M70 520 L560 460 L560 560 L70 560 Z" fill="rgba(0,0,0,0.10)"/>
      <path d="M70 520 L560 460" stroke="rgba(255,255,255,0.14)" stroke-width="8" stroke-linecap="round"/>
      <circle cx="120" cy="140" r="54" fill="url(#accent)"/>
      <circle cx="120" cy="140" r="78" fill="rgba(250,204,21,0.10)"/>
      <g stroke="rgba(250,204,21,0.38)" stroke-width="12" stroke-linecap="round">
        <path d="M120 45 V78"/><path d="M120 202 V235"/><path d="M25 140 H58"/><path d="M182 140 H215"/>
        <path d="M58 78 L80 100"/><path d="M160 180 L182 202"/><path d="M160 100 L182 78"/><path d="M58 202 L80 180"/>
      </g>
      <path d="M155 175 L310 250" stroke="rgba(250,204,21,0.18)" stroke-width="28" stroke-linecap="round"/>
      <path d="M165 190 L315 265" stroke="rgba(250,204,21,0.12)" stroke-width="44" stroke-linecap="round"/>
      <g fill="rgba(255,255,255,0.34)" stroke="rgba(255,255,255,0.20)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="240" cy="215" r="44"/>
        <path d="M232 260 L232 285"/><path d="M248 260 L248 285"/>
        <path d="M200 300 Q240 275 280 300 L295 395 Q240 430 185 395 Z"/>
        <path d="M205 320 Q160 355 135 405"/><path d="M275 320 Q320 355 345 405"/>
        <path d="M210 395 Q205 470 190 545"/><path d="M270 395 Q275 470 292 545"/>
        <path d="M170 548 H210"/><path d="M272 548 H312"/>
      </g>
      <path d="M200 486 L290 486 L565 535 L520 560 L225 560 Z" fill="url(#shadowGrad)" filter="url(#shadowBlur)"/>
      <path d="M215 500 L280 500 L540 540 L480 555 L235 555 Z" fill="rgba(0,0,0,0.28)" filter="url(#shadowBlur)"/>
    `),
  };

  const svg = templates[key] ?? wrap(`
    <circle cx="300" cy="260" r="140" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.25)" stroke-width="6"/>
    <path d="M270 330 C270 290, 330 300, 320 260 C312 230, 270 235, 270 205" fill="none" stroke="rgba(255,255,255,0.65)" stroke-width="18" stroke-linecap="round"/>
    <circle cx="300" cy="385" r="14" fill="rgba(255,255,255,0.65)"/>
  `);

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const splitLines = (text: string): string[] =>
  text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

type AralinMode = 'read' | 'watch' | 'listen' | 'play';
type BugtongPlayMode = 'image' | 'word';
type SectionPlayMode = 'quiz' | 'word';
type QuizItem = { id: string; prompt: string; correct: string };

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

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

  const [aralinMode, setAralinMode]       = useState<AralinMode>('read');
  const [activeSection, setActiveSection] = useState<string>(selectedSectionId);
  const [showAnswers, setShowAnswers]     = useState<{ [key: number]: boolean }>({});
  const [puzzleTiles, setPuzzleTiles]     = useState<number[]>(() => createShuffledTiles());
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number | null>(null);
  const [puzzleMoves, setPuzzleMoves]     = useState<number>(0);
  const [quizSelections, setQuizSelections]           = useState<Record<string, string>>({});
  const [quizIndexBySection, setQuizIndexBySection]   = useState<Record<string, number>>({});
  const [quizScoreBySection, setQuizScoreBySection]   = useState<Record<string, number>>({});
  const [quizCompletedBySection, setQuizCompletedBySection] = useState<Record<string, boolean>>({});
  const [quizLivesBySection, setQuizLivesBySection] = useState<Record<string, number>>({});
  const [bugtongPlayMode, setBugtongPlayMode] = useState<BugtongPlayMode>('word');
  const [palaisipanPlayMode, setPalaisipanPlayMode] = useState<SectionPlayMode>('quiz');
  const [tanagaPlayMode, setTanagaPlayMode] = useState<SectionPlayMode>('quiz');
  const [salawikainPlayMode, setSalawikainPlayMode] = useState<SectionPlayMode>('quiz');
  const [playingCard, setPlayingCard] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bugtongSection = quarter1Lesson1.sections.find((s) => s.id === 'bugtong');

  const playCardAudio = (cardId: string, src: string) => {
    if (playingCard === cardId) {
      audioRef.current?.pause();
      audioRef.current = null;
      setPlayingCard(null);
      return;
    }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const audio = new Audio(src);
    audioRef.current = audio;
    setPlayingCard(cardId);
    audio.play().catch(() => { setPlayingCard(null); audioRef.current = null; });
    audio.onended = () => { setPlayingCard(null); audioRef.current = null; };
  };

  const watchVideoRef = useRef<HTMLVideoElement | null>(null);
  const [watchBugtongStarted, setWatchBugtongStarted] = useState(false);
  const [watchReady, setWatchReady] = useState(false);

  useEffect(() => {
    setActiveSection(selectedSectionId);
    setAralinMode('read');
    setBugtongPlayMode('word');
    setPalaisipanPlayMode('quiz');
    setTanagaPlayMode('quiz');
    setSalawikainPlayMode('quiz');
  }, [selectedSectionId]);

  useEffect(() => {
    setQuizSelections({});
    setQuizIndexBySection({});
    setQuizScoreBySection({});
    setQuizCompletedBySection({});
    setQuizLivesBySection({});
  }, [selectedSectionId, aralinMode]);

  const quizDataBySection: Record<string, QuizItem[]> = useMemo(() => ({
    palaisipan: [
      { id: 'pal-1', prompt: 'Ano ang bagay na habang kinukuha mo ay lalo mong pinapalaki?', correct: 'Butas' },
      { id: 'pal-2', prompt: 'Anong hayop ang may apat na paa kapag bata, dalawa kapag matanda?', correct: 'Tao' },
      { id: 'pal-3', prompt: 'Ano ang bagay na kahit puno pa ay hindi tumatanda?', correct: 'Bato' },
    ],
    tanaga: [
      { id: 'tan-1', prompt: "Ano ang tema ng tanagang: \"Wika'y ating yaman...\"?", correct: 'Pagmamahal sa Wikang Filipino' },
      { id: 'tan-2', prompt: 'Ano ang tema ng tanagang: "Kabataan ng bayan..."?', correct: 'Edukasyon at Kinabukasan' },
      { id: 'tan-3', prompt: 'Ano ang tema ng tanagang: "Kalikasan ay yaman..."?', correct: 'Pangangalaga sa Kalikasan' },
    ],
    salawikain: [
      { id: 'sal-1', prompt: 'Ano ang aral ng: "Ang hindi marunong lumingon sa pinanggalingan..."?', correct: 'Mahalagang alamin at ipagmalaki ang ating pinagmulan' },
      { id: 'sal-2', prompt: 'Ano ang aral ng: "Nasa Diyos ang awa, nasa tao ang gawa."?', correct: 'Huwag umasa sa biyaya lamang, kailangan din ang sariling pagkilos' },
      { id: 'sal-3', prompt: 'Ano ang aral ng: "Kung ano ang puno, siya ang bunga."?', correct: 'Ang kalakasan o kahinaan ng isang tao ay nagmumula sa kanyang pamilya at pinagmulan' },
      { id: 'sal-4', prompt: 'Ano ang aral ng: "Wag mo ring kalalimangin ang dating iniirog."?', correct: 'Huwag kalimutan ang mga taong dati nating minahal at tinulungan' },
    ],
  }), []);

  const quizOptionsByKey = useMemo(() => {
    const result: Record<string, string[]> = {};
    Object.entries(quizDataBySection).forEach(([sectionKey, items]) => {
      items.forEach((item) => {
        const pool = items.map((q) => q.correct).filter((a) => a !== item.correct);
        const distractors = shuffleArray(pool).slice(0, 2);
        result[`${sectionKey}-${item.id}`] = shuffleArray([item.correct, ...distractors]);
      });
    });
    return result;
  }, [quizDataBySection]);

  const handleQuizSelect = (key: string, choice: string) => {
    if (quizSelections[key]) return;
    setQuizSelections((prev) => ({ ...prev, [key]: choice }));
    const [sectionKey] = key.split('-');
    const item = (quizDataBySection[sectionKey] ?? []).find((q) => `${sectionKey}-${q.id}` === key);
    if (item && choice === item.correct) {
      setQuizScoreBySection((prev) => ({ ...prev, [sectionKey]: (prev[sectionKey] ?? 0) + 1 }));
    } else if (item) {
      setQuizLivesBySection((prev) => ({ ...prev, [sectionKey]: Math.max((prev[sectionKey] ?? 2) - 1, 0) }));
    }
  };

  const resetQuizSection = (sectionKey: string) => {
    setQuizSelections((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => { if (key.startsWith(`${sectionKey}-`)) delete next[key]; });
      return next;
    });
    setQuizIndexBySection((prev) => ({ ...prev, [sectionKey]: 0 }));
    setQuizScoreBySection((prev) => ({ ...prev, [sectionKey]: 0 }));
    setQuizCompletedBySection((prev) => ({ ...prev, [sectionKey]: false }));
    setQuizLivesBySection((prev) => ({ ...prev, [sectionKey]: 2 }));
  };

  const goToNextQuizItem = (sectionKey: string, total: number) => {
    const current = quizIndexBySection[sectionKey] ?? 0;
    const nextIndex = current + 1;
    if (nextIndex >= total) {
      setQuizCompletedBySection((prev) => ({ ...prev, [sectionKey]: true }));
      return;
    }
    setQuizIndexBySection((prev) => ({ ...prev, [sectionKey]: nextIndex }));
  };

  const renderQuiz = (sectionKey: string, labelPrefix: string, description: string) => {
    const items       = quizDataBySection[sectionKey] ?? [];
    const currentIndex = quizIndexBySection[sectionKey] ?? 0;
    const currentItem = items[currentIndex];
    const total       = items.length;
    const completed   = !!quizCompletedBySection[sectionKey];
    const score       = quizScoreBySection[sectionKey] ?? 0;
    const lives       = quizLivesBySection[sectionKey] ?? 2;
    const isGameOver  = lives <= 0 && !completed;
    const isLastItem  = currentIndex + 1 >= total;

    return (
      <IonCard className="info-card gradient-orange">
        <IonCardContent>
          <div className="card-icon"><IonIcon icon={gameControllerOutline} /></div>
          <h1 className="card-title"><strong>Paglalaro: Quiz</strong></h1>
          <p className="mode-description">{description}</p>
          <div className="quiz-meta">
            <IonBadge color="light">Score: {score}/{total}</IonBadge>
            <IonBadge color="medium">Item {Math.min(currentIndex + 1, total)} of {total}</IonBadge>
            <div className="quiz-lives" aria-label={`Lives: ${lives}`}>
              {[1, 2].map((life) => (
                <IonIcon key={`life-${life}`} icon={life <= lives ? heart : heartOutline} />
              ))}
            </div>
          </div>
          {completed ? (
            <div className="answer-reveal animated">
              <IonIcon icon={checkmarkCircleOutline} />
              <span>Natapos mo ang quiz! Score: {score}/{total}</span>
            </div>
          ) : isGameOver ? (
            <div className="answer-reveal animated">
              <IonIcon icon={eyeOutline} />
              <span>Game over. Naubos ang buhay mo. Score: {score}/{total}</span>
            </div>
          ) : currentItem ? (
            <div className="quiz-item">
              <p className="riddle-text">
                <strong>{labelPrefix} {currentIndex + 1}:</strong> {currentItem.prompt}
              </p>
              <div className="quiz-options">
                {(quizOptionsByKey[`${sectionKey}-${currentItem.id}`] ?? [currentItem.correct]).map((option) => {
                  const key      = `${sectionKey}-${currentItem.id}`;
                  const selected = quizSelections[key];
                  const isSelected = selected === option;
                  return (
                    <IonButton
                      key={`${key}-${option}`}
                      size="small"
                      fill={isSelected ? 'solid' : 'outline'}
                      onClick={() => handleQuizSelect(key, option)}
                      disabled={!!selected || isGameOver}
                    >
                      {option}
                    </IonButton>
                  );
                })}
              </div>
              {quizSelections[`${sectionKey}-${currentItem.id}`] ? (
                <div className="answer-reveal animated">
                  <IonIcon icon={quizSelections[`${sectionKey}-${currentItem.id}`] === currentItem.correct ? checkmarkCircleOutline : eyeOutline} />
                  <span>
                    {quizSelections[`${sectionKey}-${currentItem.id}`] === currentItem.correct
                      ? 'Tama!'
                      : `Tamang sagot: ${currentItem.correct}`}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}
          <div className="quiz-actions">
            <IonButton fill="outline" onClick={() => resetQuizSection(sectionKey)}>I-restart</IonButton>
            {!completed && !isGameOver && currentItem ? (
              <IonButton
                onClick={() => goToNextQuizItem(sectionKey, total)}
                disabled={!quizSelections[`${sectionKey}-${currentItem.id}`]}
              >
                {isLastItem ? 'Tapusin' : 'Susunod'}
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonButton>
            ) : null}
          </div>
        </IonCardContent>
      </IonCard>
    );
  };

  const bugtongExamples: BugtongExample[] = useMemo(() => {
    return ((bugtongSection?.examples ?? []) as BugtongExample[]).filter(
      (ex) => ex && typeof ex.text === 'string' && typeof ex.answer === 'string'
    );
  }, [bugtongSection]);

  const bugtongWordSearchItems = useMemo(
    () =>
      bugtongExamples.slice(0, 5).map((example, index) => ({
        id: `bugtong-word-${example.id}`,
        sentence: `Bugtong ${index + 1}: ${splitLines(example.text).join(" ")}\nSagot: {blank}`,
        answer: example.answer,
      })),
    [bugtongExamples]
  );

  const palaisipanWordSearchItems = useMemo(
    () => [
      { id: 'pal-word-1', sentence: 'Palaisipan 1: Ang sagot ay {blank}.', answer: 'Butas' },
      { id: 'pal-word-2', sentence: 'Palaisipan 2: Ang sagot ay {blank}.', answer: 'Tao' },
      { id: 'pal-word-3', sentence: 'Palaisipan 3: Ang sagot ay {blank}.', answer: 'Bato' },
    ],
    []
  );

  const tanagaWordSearchItems = useMemo(
    () => [
      { id: 'tan-word-1', sentence: 'Tanaga 1: Tema ay {blank}.', answer: 'Filipino' },
      { id: 'tan-word-2', sentence: 'Tanaga 2: Tema ay {blank}.', answer: 'Edukasyon' },
      { id: 'tan-word-3', sentence: 'Tanaga 3: Tema ay {blank}.', answer: 'Kalikasan' },
    ],
    []
  );

  const salawikainWordSearchItems = useMemo(
    () => [
      { id: 'sal-word-1', sentence: 'Salawikain 1: Aral tungkol sa {blank}.', answer: 'Pinagmulan' },
      { id: 'sal-word-2', sentence: 'Salawikain 2: Aral tungkol sa {blank}.', answer: 'Pagkilos' },
      { id: 'sal-word-3', sentence: 'Salawikain 3: Aral tungkol sa {blank}.', answer: 'Pamilya' },
      { id: 'sal-word-4', sentence: 'Salawikain 4: Aral tungkol sa {blank}.', answer: 'Pagmamahal' },
    ],
    []
  );

  const [activePuzzleExampleId, setActivePuzzleExampleId] = useState<number>(1);

  const activePuzzleExample = useMemo(() => {
    const found = bugtongExamples.find((ex) => ex.id === activePuzzleExampleId);
    return found ?? bugtongExamples[0];
  }, [activePuzzleExampleId, bugtongExamples]);

  const activePuzzleImage = useMemo(
    () => createBugtongPuzzleImage(activePuzzleExample?.answer ?? ''),
    [activePuzzleExample?.answer]
  );

  const activePuzzleIndex = useMemo(() => {
    if (!activePuzzleExample) return -1;
    return bugtongExamples.findIndex((ex) => ex.id === activePuzzleExample.id);
  }, [activePuzzleExample, bugtongExamples]);

  const puzzleSolved = puzzleTiles.every((value, index) => value === index);

  const resetPuzzle        = () => { setPuzzleTiles(createShuffledTiles()); setSelectedPuzzleIndex(null); setPuzzleMoves(0); };
  const setPuzzleExample   = (id: number) => { setActivePuzzleExampleId(id); resetPuzzle(); };
  const goToNextPuzzleExample = () => {
    if (!bugtongExamples.length) return;
    const next = (activePuzzleIndex >= 0 ? activePuzzleIndex + 1 : 1) % bugtongExamples.length;
    setPuzzleExample(bugtongExamples[next].id);
  };

  const handlePuzzleTileClick = (index: number) => {
    if (puzzleSolved) return;
    if (selectedPuzzleIndex === null) { setSelectedPuzzleIndex(index); return; }
    if (selectedPuzzleIndex === index) { setSelectedPuzzleIndex(null); return; }
    setPuzzleTiles((prev) => {
      const next = [...prev];
      [next[selectedPuzzleIndex], next[index]] = [next[index], next[selectedPuzzleIndex]];
      return next;
    });
    setSelectedPuzzleIndex(null);
    setPuzzleMoves((prev) => prev + 1);
  };

  const toggleAnswer = (id: number) => {
    setShowAnswers((prev) => {
      const isShown = !!prev[id];
      if (!isShown) playRevealSound();
      return { ...prev, [id]: !prev[id] };
    });
  };

  const heroTitle = useMemo(() => {
    switch (selectedSectionId) {
      case 'bugtong':    return 'Bugtong';
      case 'palaisipan': return 'Pala-isipan';
      case 'tanaga':     return 'Tanaga';
      case 'salawikain': return 'Salawikain';
      default:           return quarter1Lesson1.meta.title;
    }
  }, [selectedSectionId]);

  const heroDescription = useMemo(() => {
    if (selectedSectionId === 'bugtong')    return bugtongSection?.intro ?? quarter1Lesson1.meta.description;
    if (selectedSectionId === 'palaisipan') return 'Ang palaisipan ay isang uri ng patalinghagang tanong o sitwasyon na layuning hamunin ang isipan.';
    if (selectedSectionId === 'tanaga')     return 'Isang maikling tulang Pilipino na may tugma at sukat.';
    if (selectedSectionId === 'salawikain') return 'Mga kasabihang may aral at karunungang bayan.';
    return quarter1Lesson1.meta.description;
  }, [selectedSectionId, bugtongSection?.intro]);

  const totalAralin  = 4;
  const safeAralinId = Number.isFinite(aralinId) && aralinId >= 1 && aralinId <= totalAralin ? aralinId : 1;
  const nextAralinId = safeAralinId < totalAralin ? safeAralinId + 1 : null;
    const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);

  // Autoplay fix: start muted, unmute after 300ms

  useEffect(() => {
  if (videoRef.current) {
    videoRef.current.load();
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setVideoStarted(false);
    setVideoReady(false);
  }
}, [safeAralinId]);

  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play()
      .then(() => {
        setTimeout(() => {
          if (videoRef.current) videoRef.current.muted = false;
        }, 300);
        setVideoStarted(true);
      })
      .catch(() => {
        setVideoStarted(false);
      });
  }, []);

  const handleVideoTap = () => {
    const video = videoRef.current;
    if (!video || videoStarted) return;
    video.muted = false;
    video.play()
      .then(() => setVideoStarted(true))
      .catch(() => {});
  };

  const handleWatchTapBugtongVideo = () => {
    const video = watchVideoRef.current;
    if (!video) return;
    
    if (!watchReady) return;

    if (video.paused) {
      video.muted = false;
      video.volume = 1;
      video.play();
      setWatchBugtongStarted(true);
    }else {
      video.pause();
    }
  }

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
        {/* Hero */}
        <div className="aralin-hero">
          <div className="hero-bg-gradient" />
          <div className="hero-content-wrapper">
            <div className="hero-icon-badge"><IonIcon icon={bookOutline} /></div>
            <h1 className="hero-main-title">{heroTitle}</h1>
            <p className="hero-description">{heroDescription}</p>
            <div className="hero-stats">
              <div className="stat-item"><IonIcon icon={sparklesOutline} /><span>1 Paksa</span></div>
              <div className="stat-item"><IonIcon icon={bulbOutline} /><span>Interactive</span></div>   
              <div className="animation-stage" onClick={handleVideoTap} aria-label="I-tap para simulan ang video">
                <video
                  ref={videoRef}
                  className="welcome-video"
                  src="/assets/video/bugtongSongVideo.mp4"
                  playsInline
                  controls={videoStarted}
                  preload="auto"
                  onCanPlay={() => setVideoReady(true)}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = false;
                      videoRef.current.volume = 1;
                    }
                  }}
                />
                
                 {/* TAP LAYER */}
                  <div
                    className="video-tap-layer"
                    onClick={handleVideoTap}
                  />

                <div className="welcome-overlay" />

                {!videoStarted && (
                  <div className="tap-to-play-hint">
                    <div className="tap-to-play-icon">▶</div>
                    <p>Pindutin para simulan ang video</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          <IonAccordionGroup
            className="modern-accordion-group"
            value={activeSection}
            onIonChange={(e) => setActiveSection((e.detail.value as string) ?? '')}
          >

            {/* BUGTONG */}
            {selectedSectionId === 'bugtong' && (
              <IonAccordion value="bugtong" className="modern-accordion">
                <IonItem slot="header" className="accordion-header" lines="none">
                  <div className="header-content">
                    <div className="header-icon bugtong-icon"><IonIcon icon={bulbOutline} /></div>
                    <div className="header-text">
                      <IonLabel className="accordion-title">Bugtong</IonLabel>
                      <p className="accordion-subtitle">Palaisipang Panitikan</p>
                    </div>
                  </div>
                </IonItem>

                <div className="accordion-content" slot="content">

                  {/* ── CHANGE 1: Definition card → tap opens modal ── */}
                  <DefinitionModal
                    cardTitle="Ano ang Bugtong?"
                    cardSubtitle="Pindutin para basahin"
                    icon={bulbOutline}
                    definition={bugtongSection?.intro ?? ''}
                    tapHint="I-tap para basahin ang kahulugan"
                  />

                  <div className="info-cards-grid">

                    {/* ── CHANGE 2: Katangian — tap each item to expand ── */}
                    <IonCard className="info-card gradient-purple">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={sparklesOutline} /></div>
                        <button
                          className={`card-audio-btn ${playingCard === 'katangian' ? 'playing' : ''}`}
                          onClick={() => playCardAudio('katangian', '/assets/audio/katangian.mp3')}
                        >
                          <IonIcon icon={volumeHighOutline} />
                          <span>{playingCard === 'katangian' ? 'Tumutugtog...' : 'Pakinggan'}</span>
                        </button>
                        <h1 className="card-title"><strong>Katangian ng Bugtong</strong></h1>
                        <div className="card-list">
                          {[0, 1, 2, 3].map((i) => {
                            const item = bugtongSection?.bugtongCharacteristics?.[i];
                            if (!item) return null;
                            return (
                              <ExpandableItem
                                key={i}
                                number={i + 1}
                                title={item.title}
                                description={item.description}
                              />
                            );
                          })}
                        </div>
                      </IonCardContent>
                    </IonCard>

                    {/* ── CHANGE 3: Kahalagahan — tap each item to expand ── */}
                    <IonCard className="info-card gradient-pink">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={heartOutline} /></div>
                        <button
                          className={`card-audio-btn ${playingCard === 'kahalagahan' ? 'playing' : ''}`}
                          onClick={() => playCardAudio('kahalagahan', '/assets/audio/kahalagahan.mp3')}
                        >
                          <IonIcon icon={volumeHighOutline} />
                          <span>{playingCard === 'kahalagahan' ? 'Tumutugtog...' : 'Pakinggan'}</span>
                        </button>
                        <h1 className="card-title"><strong>Kahalagahan ng Bugtong</strong></h1>
                        <div className="card-list">
                          {[0, 1, 2, 3, 4].map((i) => {
                            const item = bugtongSection?.bugtongImportance?.[i];
                            if (!item) return null;
                            return (
                              <ExpandableItem
                                key={i}
                                number={i + 1}
                                title={item.title}
                                description={item.description}
                              />
                            );
                          })}
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </div>

                  {/* Mode chips */}
                  <div className="action-chips">
                    {(['read', 'watch', 'listen', 'play'] as AralinMode[]).map((mode) => (
                      <IonChip key={mode} className={`modern-chip ${aralinMode === mode ? 'active' : ''}`} onClick={() => setAralinMode(mode)}>
                        <IonIcon icon={mode === 'read' ? bookOutline : mode === 'watch' ? playCircleOutline : mode === 'listen' ? volumeHighOutline : gameControllerOutline} />
                        <IonLabel>{mode === 'read' ? 'Pagbasa' : mode === 'watch' ? 'Panonood' : mode === 'listen' ? 'Pakikinig' : 'Paglalaro'}</IonLabel>
                      </IonChip>
                    ))}
                  </div>

                  {/* Pagbasa */}
                  {aralinMode === 'read' && (
                    <div className="bugtong-examples">
                      {bugtongSection?.examples?.map((example) => (
                        <IonCard key={example.id} className="example-card">
                          <IonCardContent>
                            <div className="example-text">
                              <div className="example-label">
                                <IonIcon icon={bookmarkSharp} />
                                <span>{example.label}</span>
                              </div>
                              <p className="riddle-text">
                                {example.text.split('\n').map((line, i) => (
                                  <span key={i}>{line}<br /></span>
                                ))}
                              </p>
                              <div className="answer-toggle">
                                <IonButton fill="clear" size="small" onClick={() => toggleAnswer(example.id)}>
                                  <IonIcon icon={eyeOutline} slot="start" />
                                  {showAnswers[example.id] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                                </IonButton>
                              </div>
                              {showAnswers[example.id] && (
                                <AnswerRevealWithGif
                                  sectionId="bugtong"
                                  icon={bulbOutline}
                                  label={`Sagot: ${example.answer}`}
                                  answer={example.answer}
                                />
                              )}
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ))}
                    </div>
                  )}

                  {/* Panonood */}
                  {aralinMode === 'watch' && (
                    <IonCard className="info-card gradient-blue">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={playCircleOutline} /></div>
                        <h1 className="card-title"><strong>Panonood</strong></h1>
                        <div className="video-container">
                          <video
                            ref={watchVideoRef}
                            className="lesson-video"
                            src="/assets/video/YcoBugtong.mp4"
                            playsInline
                            controls={watchBugtongStarted}
                            preload="auto"
                            onCanPlay={() => setWatchReady(true)}
                            onLoadedMetadata={() => {
                              if (watchVideoRef.current) {
                                watchVideoRef.current.muted = false;
                                watchVideoRef.current.volume = 1;
                              }
                            }}
                          />
                          <div
                            className="video-tap-layer"
                            onClick={handleWatchTapBugtongVideo}
                          />
                        
                          {!watchBugtongStarted && (
                            <div className="tap-to-play-hint" onClick={handleWatchTapBugtongVideo}>
                              {/* <div className="tap-to-play-icon">▶</div> */}
                                <p style={{color:'White', fontWeight:"10", fontSize:"20px", outline:""}}>Pindutin ang video</p>
                            </div>  
                          )}



                          
                        </div>
                      </IonCardContent>
                    </IonCard>
                  )}

                  {/* Pakikinig */}
                  {aralinMode === 'listen' && (
                    <div className="bugtong-audio-list">
                      {bugtongSection?.audioExamples?.map((audio) => (
                        <IonCard key={audio.id} className="info-card gradient-green">
                          <IonCardContent>
                            <div className="example-label">
                              <IonIcon icon={volumeHighOutline} />
                              <span>{audio.label}</span>
                            </div>
                            <div className="audio-container">
                              <audio controls preload="metadata">
                                <source src={audio.audioUrl} type="audio/mpeg" />
                              </audio>
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ))}
                    </div>
                  )}

                  {/* Paglalaro — Image Puzzle */}
                  {aralinMode === 'play' && (
                    <>
                      <div className="action-chips">
                        <IonChip
                          className={`modern-chip ${bugtongPlayMode === 'image' ? 'active' : ''}`}
                          onClick={() => setBugtongPlayMode('image')}
                        >
                          <IonIcon icon={imageOutline} />
                          <IonLabel>Paglalaro 1</IonLabel>
                        </IonChip>
                        <IonChip
                          className={`modern-chip ${bugtongPlayMode === 'word' ? 'active' : ''}`}
                          onClick={() => setBugtongPlayMode('word')}
                        >
                          <IonIcon icon={gameControllerOutline} />
                          <IonLabel>Paglalaro 2</IonLabel>
                        </IonChip>
                      </div>

                      {bugtongPlayMode === 'word' && (
                        <IonCard className="info-card puzzle-card">
                          <IonCardContent>
                            <WordSearchFillBlankGame
                              title="Paglalaro 2: Hanapin ang Salita"
                              items={bugtongWordSearchItems}
                            />
                          </IonCardContent>
                        </IonCard>
                      )}

                      {bugtongPlayMode === 'image' && (
                        <IonCard className="info-card puzzle-card">
                          <IonCardContent>
                            <div className="card-icon"><IonIcon icon={gameControllerOutline} /></div>
                            <h1 className="card-title"><strong>Paglalaro 1: Image Puzzle</strong></h1>
                            <p className="mode-description puzzle-instructions">
                              Ayusin ang 3x3 na piraso ng larawan. I-click ang dalawang tile para magpalit sila ng puwesto.
                            </p>
                            {bugtongExamples.length ? (
                              <div className="puzzle-example-chips">
                                {bugtongExamples.map((ex) => (
                                  <IonChip key={`puzzle-ex-${ex.id}`} className={`modern-chip ${activePuzzleExampleId === ex.id ? 'active' : ''}`} onClick={() => setPuzzleExample(ex.id)}>
                                    <IonIcon icon={bookmarkSharp} />
                                    <IonLabel>{ex.label}</IonLabel>
                                  </IonChip>
                                ))}
                              </div>
                            ) : null}
                            {activePuzzleExample && (
                              <div className="puzzle-preview">
                                <div className="puzzle-preview-header">
                                  <IonIcon icon={imageOutline} /><span>Preview ng Larawan</span>
                                </div>
                                <img className="puzzle-preview-image" src={activePuzzleImage} alt={`Preview para sa ${activePuzzleExample.label}`} loading="lazy" decoding="async" />
                              </div>
                            )}
                            {activePuzzleExample?.text && (
                              <div className="puzzle-riddle">
                                <IonText className="intro-text">
                                  {splitLines(activePuzzleExample.text).map((line, i) => (
                                    <span key={`puzzle-r-${activePuzzleExample.id}-l-${i}`}>{line}<br /></span>
                                  ))}
                                </IonText>
                              </div>
                            )}
                            <div className="puzzle-meta">
                              <IonBadge color="light">Galaw: {puzzleMoves}</IonBadge>
                              <IonBadge color={puzzleSolved ? 'success' : 'warning'}>{puzzleSolved ? 'Solved' : 'In Progress'}</IonBadge>
                            </div>
                            <div className="puzzle-board">
                              {puzzleTiles.map((tile, index) => {
                                const x = tile % PUZZLE_SIZE;
                                const y = Math.floor(tile / PUZZLE_SIZE);
                                return (
                                  <button
                                    key={`tile-${index}`}
                                    type="button"
                                    className={`puzzle-tile ${selectedPuzzleIndex === index ? 'selected' : ''}`}
                                    onClick={() => handlePuzzleTileClick(index)}
                                    aria-label={`Puzzle tile ${index + 1}`}
                                    style={{
                                      backgroundImage: `url("${activePuzzleImage}")`,
                                      backgroundSize: `${PUZZLE_SIZE * 100}% ${PUZZLE_SIZE * 100}%`,
                                      backgroundPosition: `${(x / (PUZZLE_SIZE - 1)) * 100}% ${(y / (PUZZLE_SIZE - 1)) * 100}%`,
                                    }}
                                  />
                                );
                              })}
                            </div>
                            {puzzleSolved && (
                              <div className="puzzle-success answer-reveal animated">
                                <IonIcon icon={checkmarkCircleOutline} />
                                <span>Sagot: <strong>{activePuzzleExample?.answer ?? ''}</strong></span>
                              </div>
                            )}
                            <div className="puzzle-actions">
                              <IonButton onClick={resetPuzzle} fill="solid" className="puzzle-reset-btn">
                                <IonIcon icon={gameControllerOutline} slot="start" />I-shuffle Muli
                              </IonButton>
                              <IonButton onClick={goToNextPuzzleExample} fill="outline" className="puzzle-next-btn">
                                Susunod na Halimbawa<IonIcon icon={chevronForwardOutline} slot="end" />
                              </IonButton>
                            </div>
                          </IonCardContent>
                        </IonCard>
                      )}
                    </>
                  )}

                  <IonButton expand="block" className="game-button" onClick={() => setAralinMode('play')}>
                    <IonIcon icon={gameControllerOutline} slot="start" />
                    Buksan ang Paglalaro
                    <IonIcon icon={chevronForwardOutline} slot="end" />
                  </IonButton>
                </div>
              </IonAccordion>
            )}

            {/* ══ PALAISIPAN ═══════════════════════════════════════ */}
            {selectedSectionId === 'palaisipan' && (
              <IonAccordion value="palaisipan" className="modern-accordion">
                <IonItem slot="header" className="accordion-header" lines="none">
                  <div className="header-content">
                    <div className="header-icon palaisipan-icon"><IonIcon icon={sparklesOutline} /></div>
                    <div className="header-text">
                      <IonLabel className="accordion-title">Pala-isipan</IonLabel>
                      <p className="accordion-subtitle">Lohikal na Hamon</p>
                    </div>
                  </div>
                </IonItem>
                <div className="accordion-content" slot="content">
                  <div className="content-intro">
                    <IonText className="intro-text">
                      Ang palaisipan ay isang uri ng patalinghagang tanong o sitwasyon na layuning hamunin ang isipan ng isang tao. Hindi tuwiran ang sagot; kailangan ng lohikal na pagiisip, obserbasyon, at malikhaing pag-aanalisa upang matuklasan ang kasagutan.
                    </IonText>
                  </div>
                  <IonCard className="info-card gradient-pink">
                    <IonCardContent>
                      <div className="card-icon"><IonIcon icon={sparklesOutline} /></div>
                      <h1 className="card-title"><strong>Katangian ng Palaisipan</strong></h1>
                      <div className="card-list">
                        {[
                          'May halong palaisipan at paglalarawan – kadalasan ay patula o may malikhaing pahayag.',
                          'Hindi literal ang sagot – kailangan gumamit ng isip at malikhain.',
                          'Nagpapakita ng lohika at kaalaman sa wika – nakatutulong sa pagpapatalas ng isip.',
                          'Maikli at madaling tandaan – kadalasang may ritmo o sukat.',
                        ].map((text, i) => (
                          <div key={i} className="list-item">
                            <span className="item-number">{i + 1}</span>
                            <div><p>{text}</p></div>
                          </div>
                        ))}
                      </div>
                    </IonCardContent>
                  </IonCard>

                  <div className="action-chips">
                    {(['read', 'watch', 'listen', 'play'] as AralinMode[]).map((mode) => (
                      <IonChip key={mode} className={`modern-chip ${aralinMode === mode ? 'active' : ''}`} onClick={() => setAralinMode(mode)}>
                        <IonIcon icon={mode === 'read' ? bookOutline : mode === 'watch' ? playCircleOutline : mode === 'listen' ? volumeHighOutline : gameControllerOutline} />
                        <IonLabel>{mode === 'read' ? 'Pagbasa' : mode === 'watch' ? 'Panonood' : mode === 'listen' ? 'Pakikinig' : 'Paglalaro'}</IonLabel>
                      </IonChip>
                    ))}
                  </div>

                  {aralinMode === 'read' && (
                    <div className="palaisipan-examples">
                      {[
                        { id: 5, label: 'Tanong 1', riddle: 'Ano ang bagay na habang kinukuha mo ay lalo mong pinapalaki?', answer: 'Butas' },
                        { id: 6, label: 'Tanong 2', riddle: 'Anong hayop ang may apat na paa kapag bata, dalawa kapag matanda?', answer: 'Tao' },
                        { id: 7, label: 'Tanong 3', riddle: 'Ano ang bagay na kahit puno pa ay hindi tumatanda?', answer: 'Bato' },
                      ].map((item) => (
                        <IonCard key={item.id} className="example-card gradient-blue">
                          <IonCardContent>
                            <div className="example-text">
                              <div className="example-label">
                                <IonIcon icon={bulbOutline} />
                                <span>{item.label}</span>
                              </div>
                              <p className="riddle-text">{item.riddle}</p>
                              <div className="answer-toggle">
                                <IonButton fill="clear" size="small" onClick={() => toggleAnswer(item.id)}>
                                  <IonIcon icon={eyeOutline} slot="start" />
                                  {showAnswers[item.id] ? 'Itago ang Sagot' : 'Ipakita ang Sagot'}
                                </IonButton>
                              </div>
                              {showAnswers[item.id] && (
                                <AnswerRevealWithGif sectionId="palaisipan" icon={sparklesOutline} label={`Sagot: ${item.answer}`} />
                              )}
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ))}
                    </div>
                  )}
                  {aralinMode === 'watch' && (
                    <IonCard className="info-card gradient-blue">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={playCircleOutline} /></div>
                        <h1 className="card-title"><strong>Panonood</strong></h1>
                        <p className="mode-description">Pagmasdan ang mga pahiwatig at larawan/eksena sa palaisipan.</p>
                      </IonCardContent>
                    </IonCard>
                  )}
                  {aralinMode === 'listen' && (
                    <IonCard className="info-card gradient-green">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={volumeHighOutline} /></div>
                        <h1 className="card-title"><strong>Pakikinig</strong></h1>
                        <p className="mode-description">Basahin nang malakas ang palaisipan at pakinggan ang mga salitang may diin.</p>
                      </IonCardContent>
                    </IonCard>
                  )}
                  {aralinMode === 'play' && (
                    <>
                      <div className="action-chips">
                        <IonChip
                          className={`modern-chip ${palaisipanPlayMode === 'quiz' ? 'active' : ''}`}
                          onClick={() => setPalaisipanPlayMode('quiz')}
                        >
                          <IonIcon icon={gameControllerOutline} />
                          <IonLabel>Paglalaro 1</IonLabel>
                        </IonChip>
                        <IonChip
                          className={`modern-chip ${palaisipanPlayMode === 'word' ? 'active' : ''}`}
                          onClick={() => setPalaisipanPlayMode('word')}
                        >
                          <IonIcon icon={sparklesOutline} />
                          <IonLabel>Paglalaro 2</IonLabel>
                        </IonChip>
                      </div>
                      {palaisipanPlayMode === 'quiz'
                        ? renderQuiz('palaisipan', 'Tanong', 'Piliin ang tamang sagot para sa bawat palaisipan.')
                        : (
                          <IonCard className="info-card puzzle-card">
                            <IonCardContent>
                              <WordSearchFillBlankGame
                                title="Paglalaro 2: Hanapin ang Salita"
                                items={palaisipanWordSearchItems}
                              />
                            </IonCardContent>
                          </IonCard>
                        )}
                    </>
                  )}
                </div>
              </IonAccordion>
            )}

            {/* ══ TANAGA ═══════════════════════════════════════════ */}
            {selectedSectionId === 'tanaga' && (
              <IonAccordion value="tanaga" className="modern-accordion">
                <IonItem slot="header" className="accordion-header" lines="none">
                  <div className="header-content">
                    <div className="header-icon tanaga-icon"><IonIcon icon={createOutline} /></div>
                    <div className="header-text">
                      <IonLabel className="accordion-title">Tanaga</IonLabel>
                      <p className="accordion-subtitle">Tulang Pilipino</p>
                    </div>
                  </div>
                </IonItem>
                <div className="accordion-content" slot="content">
                  <div className="content-intro">
                    <IonText className="intro-text">Ang tanaga ay apat na taludtod na tula na may pitong pantig bawat linya (7-7-7-7) at may tugma.</IonText>
                  </div>
                  <div className="action-chips">
                    {(['read', 'watch', 'listen', 'play'] as AralinMode[]).map((mode) => (
                      <IonChip key={mode} className={`modern-chip ${aralinMode === mode ? 'active' : ''}`} onClick={() => setAralinMode(mode)}>
                        <IonIcon icon={mode === 'read' ? bookOutline : mode === 'watch' ? playCircleOutline : mode === 'listen' ? volumeHighOutline : gameControllerOutline} />
                        <IonLabel>{mode === 'read' ? 'Pagbasa' : mode === 'watch' ? 'Panonood' : mode === 'listen' ? 'Pakikinig' : 'Paglalaro'}</IonLabel>
                      </IonChip>
                    ))}
                  </div>

                  {aralinMode === 'read' && (
                    <>
                      <div className="tanaga-examples">
                        {[
                          { id: 8,  label: 'Tanaga 1', poem: ["Wika'y ating yaman,", "Sa puso'y pinagyayaman;", "Sa bawat salitang bigkas,", "Pagka-Pilipino'y lantad."], tema: 'Pagmamahal sa Wikang Filipino' },
                          { id: 9,  label: 'Tanaga 2', poem: ["Kabataan ng bayan,", "Mag-aral nang mabuti;", "Sa hinaharap mong buhay,", "Ikaw ang magiging liwanag."], tema: 'Edukasyon at Kinabukasan' },
                          { id: 10, label: 'Tanaga 3', poem: ["Kalikasan ay yaman,", "Alagaan natin ito;", "Para sa susunod na henerasyon,", "Magiging masaganang buhay."], tema: 'Pangangalaga sa Kalikasan' },
                        ].map((item) => (
                          <IonCard key={item.id} className="example-card gradient-green">
                            <IonCardContent>
                              <div className="example-text">
                                <div className="example-label">
                                  <IonIcon icon={createOutline} /><span>{item.label}</span>
                                </div>
                                <p className="poem-text">
                                  {item.poem.map((line, i) => <span key={i}>{line}<br /></span>)}
                                </p>
                                <div className="answer-toggle">
                                  <IonButton fill="clear" size="small" onClick={() => toggleAnswer(item.id)}>
                                    <IonIcon icon={eyeOutline} slot="start" />
                                    {showAnswers[item.id] ? 'Itago ang Tema' : 'Ipakita ang Tema'}
                                  </IonButton>
                                </div>
                                {showAnswers[item.id] && (
                                  <AnswerRevealWithGif sectionId="tanaga" icon={createOutline} label={`Tema: ${item.tema}`} />
                                )}
                              </div>
                            </IonCardContent>
                          </IonCard>
                        ))}
                      </div>
                      <IonButton expand="block" className="create-button">
                        <IonIcon icon={createOutline} slot="start" />
                        Gumawa ng Sariling Tanaga
                        <IonIcon icon={chevronForwardOutline} slot="end" />
                      </IonButton>
                    </>
                  )}
                  {aralinMode === 'watch' && (
                    <IonCard className="info-card gradient-blue">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={playCircleOutline} /></div>
                        <h1 className="card-title"><strong>Panonood</strong></h1>
                        <p className="mode-description">Panoorin ang pagbasa ng tanaga at obserbahan ang ritmo at paghinto ng boses.</p>
                      </IonCardContent>
                    </IonCard>
                  )}
                  {aralinMode === 'listen' && (
                    <IonCard className="info-card gradient-green">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={volumeHighOutline} /></div>
                        <h1 className="card-title"><strong>Pakikinig</strong></h1>
                        <p className="mode-description">Pakinggan ang tanaga at tukuyin kung aling mga salita ang magkakatugma.</p>
                      </IonCardContent>
                    </IonCard>
                  )}
                  {aralinMode === 'play' && (
                    <>
                      <div className="action-chips">
                        <IonChip
                          className={`modern-chip ${tanagaPlayMode === 'quiz' ? 'active' : ''}`}
                          onClick={() => setTanagaPlayMode('quiz')}
                        >
                          <IonIcon icon={gameControllerOutline} />
                          <IonLabel>Paglalaro 1</IonLabel>
                        </IonChip>
                        <IonChip
                          className={`modern-chip ${tanagaPlayMode === 'word' ? 'active' : ''}`}
                          onClick={() => setTanagaPlayMode('word')}
                        >
                          <IonIcon icon={createOutline} />
                          <IonLabel>Paglalaro 2</IonLabel>
                        </IonChip>
                      </div>
                      {tanagaPlayMode === 'quiz'
                        ? renderQuiz('tanaga', 'Tanaga', 'Piliin ang tamang tema para sa bawat tanaga.')
                        : (
                          <IonCard className="info-card puzzle-card">
                            <IonCardContent>
                              <WordSearchFillBlankGame
                                title="Paglalaro 2: Hanapin ang Salita"
                                items={tanagaWordSearchItems}
                              />
                            </IonCardContent>
                          </IonCard>
                        )}
                    </>
                  )}
                </div>
              </IonAccordion>
            )}

            {/* ══ SALAWIKAIN ════════════════════════════════════════ */}
            {selectedSectionId === 'salawikain' && (
              <IonAccordion value="salawikain" className="modern-accordion">
                <IonItem slot="header" className="accordion-header" lines="none">
                  <div className="header-content">
                    <div className="header-icon salawikain-icon"><IonIcon icon={heartOutline} /></div>
                    <div className="header-text">
                      <IonLabel className="accordion-title">Salawikain at Kasabihan</IonLabel>
                      <p className="accordion-subtitle">Karunungan ng Bayan</p>
                    </div>
                  </div>
                </IonItem>
                <div className="accordion-content" slot="content">
                  <div className="content-intro">
                    <IonText className="intro-text">Ang salawikain at kasabihan ay mga pahayag ng karunungan na nagmumula sa karanasan ng mga Pilipino.</IonText>
                  </div>
                  <div className="action-chips">
                    {(['read', 'watch', 'listen', 'play'] as AralinMode[]).map((mode) => (
                      <IonChip key={mode} className={`modern-chip ${aralinMode === mode ? 'active' : ''}`} onClick={() => setAralinMode(mode)}>
                        <IonIcon icon={mode === 'read' ? bookOutline : mode === 'watch' ? playCircleOutline : mode === 'listen' ? volumeHighOutline : gameControllerOutline} />
                        <IonLabel>{mode === 'read' ? 'Pagbasa' : mode === 'watch' ? 'Panonood' : mode === 'listen' ? 'Pakikinig' : 'Paglalaro'}</IonLabel>
                      </IonChip>
                    ))}
                  </div>

                  {aralinMode === 'read' && (
                    <>
                      <div className="salawikain-examples">
                        {[
                          { id: 11, quote: '"Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan."', aral: 'Mahalagang alamin at ipagmalaki ang ating pinagmulan' },
                          { id: 12, quote: '"Nasa Diyos ang awa, nasa tao ang gawa."', aral: 'Huwag umasa sa biyaya lamang, kailangan din ang sariling pagkilos' },
                          { id: 13, quote: '"Kung ano ang puno, siya ang bunga."', aral: 'Ang kalakasan o kahinaan ng isang tao ay nagmumula sa kanyang pamilya at pinagmulan' },
                          { id: 14, quote: '"Wag mo ring kalalimangin ang dating iniirog."', aral: 'Huwag kalimutan ang mga taong dati nating minahal at tinulungan' },
                        ].map((item) => (
                          <IonCard key={item.id} className="example-card gradient-orange">
                            <IonCardContent>
                              <div className="example-text">
                                <div className="quote-icon"><IonIcon icon={heartOutline} /></div>
                                <p className="quote-text">{item.quote}</p>
                                <div className="answer-toggle">
                                  <IonButton fill="clear" size="small" onClick={() => toggleAnswer(item.id)}>
                                    <IonIcon icon={eyeOutline} slot="start" />
                                    {showAnswers[item.id] ? 'Itago ang Aral' : 'Ipakita ang Aral'}
                                  </IonButton>
                                </div>
                                {showAnswers[item.id] && (
                                  <AnswerRevealWithGif sectionId="salawikain" icon={heartOutline} label={`Aral: ${item.aral}`} />
                                )}
                              </div>
                            </IonCardContent>
                          </IonCard>
                        ))}
                      </div>
                      <IonButton expand="block" className="lesson-button" fill="outline">
                        <IonIcon icon={eyeOutline} slot="start" />
                        Tukuyin ang Aral
                        <IonIcon icon={chevronForwardOutline} slot="end" />
                      </IonButton>
                    </>
                  )}
                  {aralinMode === 'watch' && (
                    <IonCard className="info-card gradient-blue">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={playCircleOutline} /></div>
                        <h1 className="card-title"><strong>Panonood</strong></h1>
                        <p className="mode-description">Panoorin ang paggamit ng salawikain sa mga sitwasyon.</p>
                      </IonCardContent>
                    </IonCard>
                  )}
                  {aralinMode === 'listen' && (
                    <IonCard className="info-card gradient-green">
                      <IonCardContent>
                        <div className="card-icon"><IonIcon icon={volumeHighOutline} /></div>
                        <h1 className="card-title"><strong>Pakikinig</strong></h1>
                        <p className="mode-description">Pakinggan ang salawikain at bigyang-diin ang mga salitang nagbibigay ng aral.</p>
                      </IonCardContent>
                    </IonCard>
                  )}
                  {aralinMode === 'play' && (
                    <>
                      <div className="action-chips">
                        <IonChip
                          className={`modern-chip ${salawikainPlayMode === 'quiz' ? 'active' : ''}`}
                          onClick={() => setSalawikainPlayMode('quiz')}
                        >
                          <IonIcon icon={gameControllerOutline} />
                          <IonLabel>Paglalaro 1</IonLabel>
                        </IonChip>
                        <IonChip
                          className={`modern-chip ${salawikainPlayMode === 'word' ? 'active' : ''}`}
                          onClick={() => setSalawikainPlayMode('word')}
                        >
                          <IonIcon icon={heartOutline} />
                          <IonLabel>Paglalaro 2</IonLabel>
                        </IonChip>
                      </div>
                      {salawikainPlayMode === 'quiz'
                        ? renderQuiz('salawikain', 'Salawikain', 'Piliin ang tamang aral para sa bawat salawikain.')
                        : (
                          <IonCard className="info-card puzzle-card">
                            <IonCardContent>
                              <WordSearchFillBlankGame
                                title="Paglalaro 2: Hanapin ang Salita"
                                items={salawikainWordSearchItems}
                              />
                            </IonCardContent>
                          </IonCard>
                        )}
                    </>
                  )}
                </div>
              </IonAccordion>
            )}

          </IonAccordionGroup>

          {/* Quiz CTA */}
          <IonCard className="quiz-cta-card">
            <IonCardContent>
              <div className="lesson-complete-message">
                <div className="complete-icon"><IonIcon icon={checkmarkCircleOutline} /></div>
                <div className="complete-text">
                  <h3>Natapos mo ang Aralin {safeAralinId}!</h3>
                  <p>{nextAralinId ? 'Magaling! Ikaw ay handa na para sa susunod na aralin.' : 'Magaling! Natapos mo ang Markahan 1.'}</p>
                </div>
                <div className="navigation-buttons">
                  <IonButton fill="clear" className="nav-button prev-button" onClick={() => window.location.href = '/quarter/1'}>
                    <IonIcon icon={chevronBackOutline} slot="start" />Bumalik sa Markahan 1
                  </IonButton>
                  {nextAralinId ? (
                    <IonButton expand="block" className="nav-button next-button" onClick={() => window.location.href = `/quarter/1/aralin/${nextAralinId}`}>
                      Susunod na Aralin<IonIcon icon={chevronForwardOutline} slot="end" />
                    </IonButton>
                  ) : (
                    <IonButton expand="block" className="nav-button next-button" onClick={() => window.location.href = '/quarter/1'}>
                      Bumalik sa Markahan 1<IonIcon icon={chevronForwardOutline} slot="end" />
                    </IonButton>
                  )}
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <div className="bottom-spacing" />
      </IonContent>
    </IonPage>
  );
};

export default Quarter1Aralin1;
