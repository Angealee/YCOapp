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
  gameControllerOutline,
  eyeOutline,
  sparklesOutline,
  bulbOutline,
  heartOutline,
  heart,
  playCircleOutline,
  chevronForwardOutline,
  chevronBackOutline,
  checkmarkCircleOutline,
} from 'ionicons/icons';

import './Quarter1Aralin2.css';
import { quarter1Lesson1 } from "../../data/quarter1Lesson1";
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import WordSearchFillBlankGame from "../../components/WordSearchFillBlankGame";

const playRevealSound = () => {
  const audio = new Audio('/assets/audio/reveal.mp3');
  audio.volume = 0.6;
  audio.play().catch(() => {});
};

// ─── GIF map per section ──────────────────────────────────────────────────────
const SECTION_GIFS: Record<string, { src: string; alt: string; bgClass: string }> = {
  palaisipan: { src: '/assets/gif/isip.gif', alt: 'Palaisipan sagot!', bgClass: 'gif-palaisipan' },
};

// ─── Answer Reveal WITH GIF ───────────────────────────────────────────────────
const AnswerRevealWithGif: React.FC<{
  sectionId: string;
  icon: string;
  label: string;
  answer?: string;
}> = ({ sectionId, icon, label }) => {
  const gif = SECTION_GIFS[sectionId] ?? SECTION_GIFS['palaisipan'];
  const gifSrc = gif.src;
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

type AralinMode = 'read' | 'watch' | 'listen' | 'play';
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

const Quarter1Aralin2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const aralinId = 2; // Fixed to Aralin 2

  const selectedSectionId = 'palaisipan';

  const [aralinMode, setAralinMode] = useState<AralinMode>('read');
  const [activeSection, setActiveSection] = useState<string>(selectedSectionId);
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>({});
  const [quizSelections, setQuizSelections] = useState<Record<string, string>>({});
  const [quizIndexBySection, setQuizIndexBySection] = useState<Record<string, number>>({});
  const [quizScoreBySection, setQuizScoreBySection] = useState<Record<string, number>>({});
  const [quizCompletedBySection, setQuizCompletedBySection] = useState<Record<string, boolean>>({});
  const [quizLivesBySection, setQuizLivesBySection] = useState<Record<string, number>>({});
  const [palaisipanPlayMode, setPalaisipanPlayMode] = useState<SectionPlayMode>('quiz');
  const [playingCard, setPlayingCard] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
  const [watchPalaisipanStarted, setWatchPalaisipanStarted] = useState(false);
  const [watchReady, setWatchReady] = useState(false);

  useEffect(() => {
    setActiveSection(selectedSectionId);
    setAralinMode('read');
    setPalaisipanPlayMode('quiz');
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
    const items = quizDataBySection[sectionKey] ?? [];
    const currentIndex = quizIndexBySection[sectionKey] ?? 0;
    const currentItem = items[currentIndex];
    const total = items.length;
    const completed = !!quizCompletedBySection[sectionKey];
    const score = quizScoreBySection[sectionKey] ?? 0;
    const lives = quizLivesBySection[sectionKey] ?? 2;
    const isGameOver = lives <= 0 && !completed;
    const isLastItem = currentIndex + 1 >= total;

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
                  const key = `${sectionKey}-${currentItem.id}`;
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

  const palaisipanWordSearchItems = useMemo(
    () => [
      { id: 'pal-word-1', sentence: 'Palaisipan 1: Ang sagot ay {blank}.', answer: 'Butas' },
      { id: 'pal-word-2', sentence: 'Palaisipan 2: Ang sagot ay {blank}.', answer: 'Tao' },
      { id: 'pal-word-3', sentence: 'Palaisipan 3: Ang sagot ay {blank}.', answer: 'Bato' },
    ],
    []
  );

  const toggleAnswer = (id: number) => {
    setShowAnswers((prev) => {
      const isShown = !!prev[id];
      if (!isShown) playRevealSound();
      return { ...prev, [id]: !prev[id] };
    });
  };

  const heroTitle = 'Pala-isipan';
  const heroDescription = 'Ang palaisipan ay isang uri ng patalinghagang tanong o sitwasyon na layuning hamunin ang isipan.';

  const totalAralin = 4;
  const safeAralinId = 2;
  const nextAralinId = safeAralinId < totalAralin ? safeAralinId + 1 : null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setVideoStarted(false);
      setVideoReady(false);
    }
  }, [safeAralinId]);

// ✅ Remove the auto-play useEffect entirely, keep only the reset one:
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.load();
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setVideoStarted(false);
    setVideoReady(false);
  }
}, [safeAralinId]);

  const handleVideoTap = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!videoReady) return;

    if (video.paused) {
      video.muted = false;
      video.volume = 1;
      video.play();
      setVideoStarted(true);
    } else {
      video.pause();
    }
  };

  const handleWatchTapPalaisipanVideo = () => {
    const video = watchVideoRef.current;
    if (!video) return;
    
    if (!watchReady) return;

    if (video.paused) {
      video.muted = false;
      video.volume = 1;
      video.play();
      setWatchPalaisipanStarted(true);
    } else {
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
            <div className="hero-icon-badge"><IonIcon icon={sparklesOutline} /></div>
            <h1 className="hero-main-title">{heroTitle}</h1>
            <p className="hero-description">{heroDescription}</p>
            <div className="hero-stats">
              <div className="stat-item"><IonIcon icon={sparklesOutline} /><span>1 Paksa</span></div>
              <div className="stat-item"><IonIcon icon={bulbOutline} /><span>Interactive</span></div>
              
              {/* Video Palaisipan */}
              <div className="animation-stage">
                <video
                  ref={videoRef}
                  className="welcome-video"
                  src="/assets/video/YcoPalaisipanMusic.mp4"
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
            {/* PALAISIPAN */}
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
                <DefinitionModal
                  cardTitle="Ano ang Palaisipan?"
                  cardSubtitle="Pindutin para basahin"
                  icon={sparklesOutline}
                  definition="Ang palaisipan ay isang uri ng patalinghagang tanong o sitwasyon na layuning hamunin ang isipan ng isang tao. Hindi tuwiran ang sagot; kailangan ng lohikal na pagiisip, obserbasyon, at malikhaing pag-aanalisa upang matuklasan ang kasagutan."
                  tapHint="I-tap para basahin ang kahulugan"
                />

                <div className="info-cards-grid">
                  <IonCard className="info-card gradient-pink">
                    <IonCardContent>
                      <div className="card-icon"><IonIcon icon={sparklesOutline} /></div>
                      <button
                        className={`card-audio-btn ${playingCard === 'katangian' ? 'playing' : ''}`}
                        onClick={() => playCardAudio('katangian', '/assets/audio/palaisipan-katangian.mp3')}
                      >
                        <IonIcon icon={volumeHighOutline} />
                        <span>{playingCard === 'katangian' ? 'Tumutugtog...' : 'Pakinggan'}</span>
                      </button>
                      <h1 className="card-title"><strong>Katangian ng Palaisipan</strong></h1>
                      <div className="card-list">
                        {[
                          { title: 'May halong palaisipan at paglalarawan', description: 'Kadalasan ay patula o may malikhaing pahayag.' },
                          { title: 'Hindi literal ang sagot', description: 'Kailangan gumamit ng isip at malikhain.' },
                          { title: 'Nagpapakita ng lohika at kaalaman sa wika', description: 'Nakatutulong sa pagpapatalas ng isip.' },
                          { title: 'Maikli at madaling tandaan', description: 'Kadalasang may ritmo o sukat.' },
                        ].map((item, i) => (
                          <ExpandableItem
                            key={i}
                            number={i + 1}
                            title={item.title}
                            description={item.description}
                          />
                        ))}
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
                          src="/assets/video/palaisipanLesson.mp4"
                          playsInline
                          controls={watchPalaisipanStarted}
                          preload="auto"
                          onCanPlay={() => setWatchReady(true)}
                          onLoadedMetadata={() => {
                            if (watchVideoRef.current) {
                              watchVideoRef.current.muted = false;
                              watchVideoRef.current.volume = 1;
                            }
                          }}
                        />
                        <div className="video-tap-layer" onClick={handleWatchTapPalaisipanVideo} />
                      
                        {!watchPalaisipanStarted && (
                          <div className="tap-to-play-hint" onClick={handleWatchTapPalaisipanVideo}>
                            <p style={{color:'White', fontWeight:"10", fontSize:"20px"}}>Pindutin ang video</p>
                          </div>
                        )}
                      </div>
                    </IonCardContent>
                  </IonCard>
                )}

                {/* Pakikinig */}
                {aralinMode === 'listen' && (
                  <IonCard className="info-card gradient-green">
                    <IonCardContent>
                      <div className="card-icon"><IonIcon icon={volumeHighOutline} /></div>
                      <h1 className="card-title"><strong>Pakikinig</strong></h1>
                      <p className="mode-description">Basahin nang malakas ang palaisipan at pakinggan ang mga salitang may diin.</p>
                      <div className="audio-container">
                        <audio controls preload="metadata">
                          <source src="/assets/audio/palaisipan-audio.mp3" type="audio/mpeg" />
                        </audio>
                      </div>
                    </IonCardContent>
                  </IonCard>
                )}

                {/* Paglalaro */}
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

                <IonButton expand="block" className="game-button" onClick={() => setAralinMode('play')}>
                  <IonIcon icon={gameControllerOutline} slot="start" />
                  Buksan ang Paglalaro
                  <IonIcon icon={chevronForwardOutline} slot="end" />
                </IonButton>
              </div>
            </IonAccordion>
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

export default Quarter1Aralin2;