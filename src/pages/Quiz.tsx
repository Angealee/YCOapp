import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonCard,
  IonCardContent,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonProgressBar,
  IonIcon,
  IonAlert,
} from '@ionic/react';
import {
  playCircleOutline,
  checkmarkCircle,
  closeCircle,
  refresh,
  arrowBackOutline,
  schoolOutline,
  trophyOutline,
  helpCircleOutline,
  bookOutline,
  ribbonOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { quarter1Quiz, QuizQuestion } from '../data/quarter1Quiz';
import { quarter2Quiz } from '../data/quarter2Quiz';
import { quarter3Quiz } from '../data/quarter3Quiz';
import './Quiz.css';

interface QuizResult {
  score: number;
  total: number;
  answers: { questionId: number; selectedOption: number | null; isCorrect: boolean }[];
  date: string;
}

// Per-quarter visual theme config
const quarterTheme = {
  1: { color: '#FF6B6B', dk: '#C0392B', emoji: '📖', label: 'Panitikang Filipino', gradient: 'linear-gradient(145deg, #FF6B6B, #C0392B)' },
  2: { color: '#4D96FF', dk: '#1565C0', emoji: '🌿', label: 'Kuwentong Bayan at Pabula', gradient: 'linear-gradient(145deg, #4D96FF, #1565C0)' },
  3: { color: '#C77DFF', dk: '#7B2CBF', emoji: '🎭', label: 'Panitikan at Pagsusuri', gradient: 'linear-gradient(145deg, #C77DFF, #7B2CBF)' },
};

const Quiz: React.FC = () => {
  const history = useHistory();
  const { quarter } = useParams<{ quarter?: string }>();
  const routeQuarter = quarter ? Number(quarter) : null;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showRetakeAlert, setShowRetakeAlert] = useState(false);
  const [showBackConfirm, setShowBackConfirm] = useState(false);
  const [showQuarterSelection, setShowQuarterSelection] = useState(true);
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  const getQuarterProgress = (q: number) => {
    const d = localStorage.getItem(`quarter${q}Progress`);
    if (d) { try { return Math.round(JSON.parse(d).percentage) || 0; } catch { return 0; } }
    return 0;
  };

  const getQuarterProgressStatus = (q: number) => {
    const d = localStorage.getItem(`quarter${q}Progress`);
    if (d) {
      try {
        const pct = Math.round(JSON.parse(d).percentage);
        if (pct === 100) return 'Nakumpleto ✓';
        if (pct > 0)     return `${pct}% Kumpletado`;
        return 'Hindi pa nasimulan';
      } catch { return 'Hindi pa nasimulan'; }
    }
    return 'Hindi pa nasimulan';
  };

  const quizData = { 1: quarter1Quiz, 2: quarter2Quiz, 3: quarter3Quiz };

  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShuffledQuestions([]);
    setShowResults(false);
    setQuizCompleted(false);
    setSelectedQuarter(null);
    setShowQuarterSelection(true);
  };

  useEffect(() => {
    if (routeQuarter && Number.isFinite(routeQuarter)) {
      setCurrentQuestionIndex(0);
      setSelectedAnswers([]);
      setShuffledQuestions([]);
      setShowResults(false);
      setQuizCompleted(false);
      setSelectedQuarter(routeQuarter);
      setShowQuarterSelection(false);
      return;
    }
    resetQuizState();
  }, [routeQuarter]);

  useEffect(() => {
    if (!selectedQuarter || showQuarterSelection) return;
    const saved = localStorage.getItem(`quarter${selectedQuarter}QuizResults`);
    if (saved) {
      const r: QuizResult = JSON.parse(saved);
      if (r?.answers) {
        setQuizCompleted(true);
        setSelectedAnswers(r.answers.map(a => a.selectedOption));
      }
      return;
    }
    setQuizCompleted(false);
    setSelectedAnswers([]);
  }, [selectedQuarter, showQuarterSelection]);

  const getQuizForQuarter = (q: number | null): QuizQuestion[] => {
    const sel = quizData[(q ?? 1) as keyof typeof quizData];
    return (sel?.length ? sel : quarter1Quiz) as QuizQuestion[];
  };

  useEffect(() => {
    if (!quizCompleted && !showQuarterSelection && shuffledQuestions.length === 0) {
      shuffleQuestions(selectedQuarter ?? 1);
    }
  }, [quizCompleted, showQuarterSelection, selectedQuarter, shuffledQuestions.length]);

  const selectQuarter = (q: number) => history.push(`/quiz/take/${q}`);

  const shuffleQuestions = (q: number) => {
    const quiz = getQuizForQuarter(q);
    const shuffled = [...quiz].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setSelectedAnswers(new Array(shuffled.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (i: number) => {
    const a = [...selectedAnswers];
    a[currentQuestionIndex] = i;
    setSelectedAnswers(a);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0)
      setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const calculateScore = (): QuizResult => {
    let score = 0;
    const answers = shuffledQuestions.map((q, i) => {
      const sel = selectedAnswers[i];
      const isCorrect = sel !== null && sel === q.correctAnswer;
      if (isCorrect) score++;
      return { questionId: q.id, selectedOption: sel, isCorrect };
    });
    return { score, total: shuffledQuestions.length, answers, date: new Date().toISOString() };
  };

  const handleSubmitQuiz = () => {
    const results = calculateScore();
    localStorage.setItem(`quarter${selectedQuarter || 1}QuizResults`, JSON.stringify(results));
    if (selectedQuarter) {
      localStorage.setItem(`quarter${selectedQuarter}Progress`, JSON.stringify({
        score: results.score, total: results.total,
        percentage: (results.score / results.total) * 100,
        date: new Date().toISOString()
      }));
    }
    setQuizCompleted(true);
    setShowResults(true);
  };

  const requestBackNavigation = () => setShowBackConfirm(true);

  const confirmBackNavigation = () => {
    setShowBackConfirm(false);
    resetQuizState();
    if (routeQuarter) { history.replace('/quiz'); return; }
    history.goBack();
  };

  // ── BACK ALERT (reused) ──
  const BackAlert = (
    <IonAlert
      isOpen={showBackConfirm}
      onDidDismiss={() => setShowBackConfirm(false)}
      header="Babalik ka na ba?"
      message="Kapag bumalik ka, mawawala ang kasalukuyang progreso sa pagsusulit."
      buttons={[
        { text: 'Manatili', role: 'cancel' },
        { text: 'Bumalik', handler: confirmBackNavigation },
      ]}
    />
  );

  // ════════════════════════════════════════
  // SCREEN 1 — Quarter Selection
  // ════════════════════════════════════════
  if (showQuarterSelection) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar className="quiz-toolbar">
            <IonTitle className="quiz-toolbar-title">Pagsusulit</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="quiz-page-content">

          {/* Hero */}
          <div className="quiz-hero">
            <div className="quiz-hero-blob quiz-hero-blob--1" />
            <div className="quiz-hero-blob quiz-hero-blob--2" />
            <div className="quiz-hero-inner">
              <div className="quiz-hero-icon">
                <IonIcon icon={helpCircleOutline} />
              </div>
              <h1 className="quiz-hero-title">Pagsusulit</h1>
              <p className="quiz-hero-subtitle">Pumili ng Markahan para Simulan</p>
            </div>
          </div>

          {/* Quarter Cards */}
          <div className="qsel-grid">
            {([1, 2, 3] as const).map((q, idx) => {
              const theme = quarterTheme[q];
              const descriptions = [
                'Bugtong, Tanaga, Salawikain, Komiks, at Tekstong Ekspositori',
                'Alamat, Pabula, Komiks, at Brochure',
                'Mas malalim na pag-unawa sa teksto at biswal',
              ];
              const titles = ['Unang Markahan', 'Pangalawang Markahan', 'Pangatlong Markahan'];
              const pct = getQuarterProgress(q);

              return (
                <IonCard
                  key={q}
                  className="qsel-card"
                  style={{ animationDelay: `${idx * 100}ms`, '--qsel-accent': theme.color, '--qsel-dk': theme.dk } as React.CSSProperties}
                  onClick={() => selectQuarter(q)}
                  button
                >
                  {/* colored top bar */}
                  <div className="qsel-accent-bar" style={{ background: theme.gradient }} />
                  <div className="qsel-card-glow" />
                  <div className="qsel-ghost-num">{q}</div>

                  <IonCardContent className="qsel-card-body">
                    <div className="qsel-top-row">
                      <div className="qsel-emoji-bubble" style={{ background: theme.gradient }}>
                        {theme.emoji}
                      </div>
                      <div className="qsel-badge">Markahan {q}</div>
                    </div>

                    <h3 className="qsel-title">{titles[idx]}</h3>
                    <p className="qsel-subtitle">{theme.label}</p>
                    <p className="qsel-desc">{descriptions[idx]}</p>

                    {/* Progress */}
                    <div className="qsel-progress-wrap">
                      <div className="qsel-progress-labels">
                        <span className="qsel-progress-label">Marka</span>
                        <span className="qsel-progress-status" style={{ color: theme.color }}>
                          {getQuarterProgressStatus(q)}
                        </span>
                      </div>
                      <div className="qsel-progress-track">
                        <div
                          className="qsel-progress-fill"
                          style={{ width: `${pct}%`, background: theme.gradient }}
                        />
                      </div>
                    </div>

                    <div className="qsel-footer">
                      <span className="qsel-tap-hint" style={{ color: theme.color }}>
                        I-tap upang simulan →
                      </span>
                    </div>
                  </IonCardContent>
                </IonCard>
              );
            })}
          </div>

          <div className="quiz-bottom-space" />
          {BackAlert}
        </IonContent>
      </IonPage>
    );
  }

  // ════════════════════════════════════════
  // SCREEN 2 — Loading
  // ════════════════════════════════════════
  if (shuffledQuestions.length === 0 && !quizCompleted) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar className="quiz-toolbar">
            <IonButtons slot="start">
              <IonButton fill="clear" className="quiz-back-btn" onClick={requestBackNavigation}>
                <IonIcon icon={arrowBackOutline} slot="start" /> Ibalik
              </IonButton>
            </IonButtons>
            <IonTitle className="quiz-toolbar-title">Pagsusulit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="quiz-page-content">
          <div className="quiz-loading-wrap">
            <div className="quiz-loading-icon">⏳</div>
            <p className="quiz-loading-text">Ini-load ang pagsusulit...</p>
          </div>
          {BackAlert}
        </IonContent>
      </IonPage>
    );
  }

  // ════════════════════════════════════════
  // SCREEN 3 — Results
  // ════════════════════════════════════════
  if (showResults || quizCompleted) {
    const results: QuizResult = quizCompleted
      ? JSON.parse(localStorage.getItem(`quarter${selectedQuarter || 1}QuizResults`) || '{"score":0,"total":0,"answers":[]}')
      : calculateScore();
    const pct = Math.round((results.score / results.total) * 100);
    const theme = quarterTheme[(selectedQuarter || 1) as keyof typeof quarterTheme];

    const resultConfig = pct >= 75
      ? { emoji: '🏆', label: 'Mahusay!',         color: '#6BCB77', shadow: 'rgba(107,203,119,0.35)' }
      : pct >= 50
      ? { emoji: '⭐', label: 'Magaling!',         color: '#FFD93D', shadow: 'rgba(255,217,61,0.35)'  }
      : { emoji: '📚', label: 'Patuloy na Mag-aral!', color: '#FF6B6B', shadow: 'rgba(255,107,107,0.35)' };

    const circumference = 2 * Math.PI * 45;

    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar className="quiz-toolbar">
            <IonButtons slot="start">
              <IonButton fill="clear" className="quiz-back-btn" onClick={requestBackNavigation}>
                <IonIcon icon={arrowBackOutline} slot="start" /> Ibalik
              </IonButton>
            </IonButtons>
            <IonTitle className="quiz-toolbar-title">Resulta</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="quiz-page-content">
          {/* Result Hero */}
          <div className="result-hero" style={{ background: theme.gradient }}>
            <div className="quiz-hero-blob quiz-hero-blob--1" />
            <div className="quiz-hero-blob quiz-hero-blob--2" />
            <div className="result-hero-inner">
              {/* SVG circle */}
              <div className="result-circle-wrap">
                <svg viewBox="0 0 100 100" className="result-circle-svg">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="7" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="white" strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - pct / 100)}
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                </svg>
                <div className="result-circle-text">
                  <span className="result-pct">{pct}%</span>
                  <span className="result-pct-label">Marka</span>
                </div>
              </div>

              <div className="result-emoji">{resultConfig.emoji}</div>
              <h2 className="result-label">{resultConfig.label}</h2>
              <p className="result-score-text">
                Nakakuha ng <strong>{results.score}</strong> sa <strong>{results.total}</strong> tanong
              </p>
            </div>
          </div>

          <div className="quiz-body-wrap">
            {/* Action buttons */}
            <div className="result-actions">
              <IonButton
                expand="block"
                fill="outline"
                className="result-btn-outline"
                style={{ '--outline-color': theme.color } as React.CSSProperties}
                onClick={() => { resetQuizState(); history.replace('/quiz'); }}
              >
                <IonIcon icon={arrowBackOutline} slot="start" />
                Pumili ng Ibang Markahan
              </IonButton>
              <IonButton
                expand="block"
                className="result-btn-primary"
                style={{ '--btn-bg': theme.gradient, '--btn-shadow': theme.color + '55' } as React.CSSProperties}
                onClick={() => setShowRetakeAlert(true)}
              >
                <IonIcon icon={bookOutline} slot="start" />
                Umuwi sa Aralin
              </IonButton>
            </div>

            {/* Review section */}
            <div className="review-section-label">
              <IonIcon icon={trophyOutline} />
              <span>Review ng Mga Sagot</span>
            </div>

            {results.answers.map((answer, index) => {
              const question = shuffledQuestions.find(q => q.id === answer.questionId);
              if (!question) return null;
              return (
                <IonCard key={question.id} className="review-card" style={{ animationDelay: `${index * 40}ms` } as React.CSSProperties}>
                  <IonCardContent className="review-card-body">
                    <div className="review-q-num">#{index + 1}</div>
                    <p className="review-question">{question.question}</p>

                    <div className="review-answer review-answer--correct">
                      <IonIcon icon={checkmarkCircle} />
                      <span><strong>Tama:</strong> {question.options[question.correctAnswer]}</span>
                    </div>

                    {answer.selectedOption !== null && answer.selectedOption !== question.correctAnswer && (
                      <div className="review-answer review-answer--wrong">
                        <IonIcon icon={closeCircle} />
                        <span><strong>Sagot Mo:</strong> {question.options[answer.selectedOption]}</span>
                      </div>
                    )}

                    {answer.selectedOption === null && (
                      <div className="review-answer review-answer--none">
                        <IonIcon icon={alertCircleOutline} />
                        <span><strong>Walang sagot</strong></span>
                      </div>
                    )}

                    {question.explanation && (
                      <p className="review-explanation">{question.explanation}</p>
                    )}
                  </IonCardContent>
                </IonCard>
              );
            })}
          </div>

          <div className="quiz-bottom-space" />

          <IonAlert
            isOpen={showRetakeAlert}
            onDidDismiss={() => setShowRetakeAlert(false)}
            header="Umuwi sa Aralin"
            message="Gusto mo bang umuwi sa Aralin 1?"
            buttons={[
              { text: 'Hindi', role: 'cancel' },
              { text: 'Oo', handler: () => { window.location.href = `/quarter/${selectedQuarter || 1}/aralin/1`; } },
            ]}
          />
          {BackAlert}
        </IonContent>
      </IonPage>
    );
  }

  // ════════════════════════════════════════
  // SCREEN 4 — Quiz Question
  // ════════════════════════════════════════
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progressPct = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  const theme = quarterTheme[(selectedQuarter || 1) as keyof typeof quarterTheme];
  const answeredCount = selectedAnswers.filter(a => a !== null).length;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="quiz-toolbar">
          <IonButtons slot="start">
            <IonButton fill="clear" className="quiz-back-btn" onClick={requestBackNavigation}>
              <IonIcon icon={arrowBackOutline} slot="start" /> Ibalik
            </IonButton>
          </IonButtons>
          <IonTitle className="quiz-toolbar-title">Pagsusulit</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="quiz-page-content">

        {/* Progress strip */}
        <div className="quiz-progress-strip">
          <div className="quiz-progress-info">
            <span className="quiz-q-counter">
              Tanong {currentQuestionIndex + 1} <span className="quiz-q-total">/ {shuffledQuestions.length}</span>
            </span>
            <span className="quiz-answered-badge" style={{ background: theme.gradient }}>
              {answeredCount} nasagot
            </span>
          </div>
          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progressPct}%`, background: theme.gradient }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="quiz-body-wrap">
          <IonCard className="quiz-question-card">
            <div className="quiz-q-accent" style={{ background: theme.gradient }} />
            <IonCardContent className="quiz-question-body">
              <div className="quiz-q-badge" style={{ background: theme.gradient }}>
                #{currentQuestionIndex + 1}
              </div>
              <p className="quiz-question-text">{currentQuestion.question}</p>

              <IonRadioGroup
                value={selectedAnswers[currentQuestionIndex]?.toString()}
                onIonChange={e => handleAnswerSelect(parseInt(e.detail.value))}
              >
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                  return (
                    <div
                      key={idx}
                      className={`quiz-option ${isSelected ? 'quiz-option--selected' : ''}`}
                      style={isSelected ? { '--opt-accent': theme.color, '--opt-bg': theme.color + '18', borderColor: theme.color } as React.CSSProperties : {}}
                      onClick={() => handleAnswerSelect(idx)}
                    >
                      <div className={`quiz-option-dot ${isSelected ? 'quiz-option-dot--active' : ''}`}
                        style={isSelected ? { background: theme.gradient } as React.CSSProperties : {}}
                      >
                        {isSelected && <span>✓</span>}
                      </div>
                      <IonLabel className="quiz-option-label">{option}</IonLabel>
                      <IonRadio value={idx.toString()} className="quiz-option-radio-hidden" />
                    </div>
                  );
                })}
              </IonRadioGroup>
            </IonCardContent>
          </IonCard>

          {/* Navigation */}
          <div className="quiz-nav">
            <button
              className={`quiz-nav-prev ${currentQuestionIndex === 0 ? 'quiz-nav-prev--disabled' : ''}`}
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              ← Nakaraan
            </button>

            {currentQuestionIndex < shuffledQuestions.length - 1 ? (
              <button
                className="quiz-nav-next"
                style={{ background: selectedAnswers[currentQuestionIndex] !== null ? theme.gradient : undefined } as React.CSSProperties}
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === null}
              >
                Susunod →
              </button>
            ) : (
              <button
                className="quiz-nav-submit"
                onClick={handleSubmitQuiz}
                disabled={selectedAnswers.some(a => a === null)}
              >
                <IonIcon icon={checkmarkCircle} />
                Isumite
              </button>
            )}
          </div>

          {/* Dot progress indicators */}
          <div className="quiz-dot-row">
            {shuffledQuestions.map((_, i) => (
              <div
                key={i}
                className={`quiz-dot ${i === currentQuestionIndex ? 'quiz-dot--current' : selectedAnswers[i] !== null ? 'quiz-dot--done' : ''}`}
                style={i === currentQuestionIndex ? { background: theme.color } as React.CSSProperties : selectedAnswers[i] !== null ? { background: theme.color + '88' } as React.CSSProperties : {}}
                onClick={() => setCurrentQuestionIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="quiz-bottom-space" />
        {BackAlert}
      </IonContent>
    </IonPage>
  );
};

export default Quiz;