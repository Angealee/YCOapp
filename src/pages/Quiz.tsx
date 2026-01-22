import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonProgressBar,
  IonIcon,
  IonAlert,
  IonFab,
  IonFabButton,
  IonList,
  IonItem
} from '@ionic/react';
import { 
  playCircleOutline, 
  checkmarkCircle, 
  closeCircle, 
  refresh, 
  arrowBackOutline,
  schoolOutline,
  trophyOutline
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { quarter1Quiz, QuizQuestion } from '../data/quarter1Quiz';
import './Quiz.css';

interface QuizResult {
  score: number;
  total: number;
  answers: { questionId: number; selectedOption: number | null; isCorrect: boolean }[];
  date: string;
}

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showRetakeAlert, setShowRetakeAlert] = useState(false);
  const [showQuarterSelection, setShowQuarterSelection] = useState(true);
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);
  
  // Function to get progress for a specific quarter
  const getQuarterProgress = (quarter: number) => {
    const progressData = localStorage.getItem(`quarter${quarter}Progress`);
    if (progressData) {
      try {
        const progress = JSON.parse(progressData);
        return Math.round(progress.percentage) || 0;
      } catch (e) {
        return 0;
      }
    }
    return 0;
  };
  
  // Function to get progress status for a specific quarter
  const getQuarterProgressStatus = (quarter: number) => {
    const progressData = localStorage.getItem(`quarter${quarter}Progress`);
    if (progressData) {
      try {
        const progress = JSON.parse(progressData);
        const percentage = Math.round(progress.percentage);
        if (percentage === 100) {
          return 'Nakumpleto';
        } else if (percentage > 0) {
          return `${percentage}% Kumpletado`;
        } else {
          return 'Hindi pa nasimulan';
        }
      } catch (e) {
        return 'Hindi pa nasimulan';
      }
    }
    return 'Hindi pa nasimulan';
  };
  
  // Quiz data for different quarters (placeholder for now)
  const quizData = {
    1: quarter1Quiz,
    2: [], // Will be populated when quarter 2 quiz is created
    3: []  // Will be populated when quarter 3 quiz is created
  };
  
  // Load quiz results from localStorage on component mount
  useEffect(() => {
    if (selectedQuarter) {
      const savedResults = localStorage.getItem(`quarter${selectedQuarter}QuizResults`);
      if (savedResults) {
        const results: QuizResult = JSON.parse(savedResults);
        if (results && results.answers) {
          setQuizCompleted(true);
          setSelectedAnswers(results.answers.map(a => a.selectedOption));
        }
      }
    } else {
      // For Quarter 1 as fallback
      const savedResults = localStorage.getItem('quarter1QuizResults');
      if (savedResults) {
        const results: QuizResult = JSON.parse(savedResults);
        if (results && results.answers) {
          setQuizCompleted(true);
          setSelectedAnswers(results.answers.map(a => a.selectedOption));
        }
      }
    }
  }, [selectedQuarter]);
  
  // Shuffle questions when component mounts
  useEffect(() => {
    if (!quizCompleted && !showQuarterSelection) {
      shuffleQuestions();
    }
  }, [quizCompleted, showQuarterSelection]);
  
  const selectQuarter = (quarter: number) => {
    // Set the selected quarter's quiz data
    const selectedQuiz = quizData[quarter as keyof typeof quizData];
    if (selectedQuiz && selectedQuiz.length > 0) {
      const shuffled = [...selectedQuiz].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
      setSelectedAnswers(new Array(shuffled.length).fill(null));
      setCurrentQuestionIndex(0);
      setShowResults(false);
      setQuizCompleted(false);
      setShowQuarterSelection(false);
      setSelectedQuarter(quarter);
    }
  };
  
  const shuffleQuestions = () => {
    const shuffled = [...quarter1Quiz].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setSelectedAnswers(new Array(shuffled.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizCompleted(false);
  };
  
  const handleAnswerSelect = (optionIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateScore = (): QuizResult => {
    let score = 0;
    const answers = shuffledQuestions.map((question, index) => {
      const selectedOption = selectedAnswers[index];
      const isCorrect = selectedOption !== null && selectedOption === question.correctAnswer;
      
      if (isCorrect) {
        score++;
      }
      
      return {
        questionId: question.id,
        selectedOption,
        isCorrect
      };
    });
    
    return {
      score,
      total: shuffledQuestions.length,
      answers,
      date: new Date().toISOString()
    };
  };
  
  const handleSubmitQuiz = () => {
    const results = calculateScore();
    // Save results with quarter identifier
    localStorage.setItem(`quarter${selectedQuarter || 1}QuizResults`, JSON.stringify(results));
    
    // Calculate and save progress for the quarter
    if (selectedQuarter) {
      const progressPercentage = (results.score / results.total) * 100;
      localStorage.setItem(`quarter${selectedQuarter}Progress`, JSON.stringify({
        score: results.score,
        total: results.total,
        percentage: progressPercentage,
        date: new Date().toISOString()
      }));
    }
    
    setQuizCompleted(true);
    setShowResults(true);
  };
  
  const handleRetakeQuiz = () => {
    setShowRetakeAlert(true);
  };
  
  const confirmRetakeQuiz = () => {
    shuffleQuestions();
    setShowRetakeAlert(false);
  };
  
  if (showQuarterSelection) {
    // Quarter selection screen
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar className="modern-toolbar">
            <IonButtons slot="start">
              <IonBackButton text="Ibalik" className="modern-back-btn" />
            </IonButtons>
            <IonTitle className="modern-title">Pagsusulit</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonContent fullscreen className="quarter-selection-content">
          <div className="selection-header">
            <h1 className="selection-title">Pumili ng Markahan</h1>
            <p className="selection-subtitle">Pumili ng quarter para simulan ang pagsusulit</p>
          </div>
          
          <div className="quarter-cards-container">
            <IonCard 
              className="quarter-card"
              onClick={() => selectQuarter(1)}
            >
              <div className="card-number">1</div>
              <div className="card-glow" />
              <IonCardContent className="quarter-card-content">
                <div className="card-icon">
                  <IonIcon icon={schoolOutline} />
                </div>
                <h3 className="card-title">Unang Markahan</h3>
                <p className="card-subtitle">Panitikang Filipino</p>
                <p className="card-description">Bugtong, Tanaga, Salawikain, Komiks, at Tekstong Ekspositori</p>
                <div className="card-progress">
                  <div className="progress-header">
                    <span className="progress-label">Progreso</span>
                    <span className="progress-percent">
                      {getQuarterProgressStatus(1)}
                    </span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <IonProgressBar
                      value={getQuarterProgress(1) / 100}
                      className="modern-progress"
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <span className="tap-hint">I-tap upang simulan →</span>
                </div>
              </IonCardContent>
            </IonCard>
            
            <IonCard 
              className="quarter-card disabled"
              onClick={() => {}}
            >
              <div className="card-number">2</div>
              <div className="card-glow" />
              <IonCardContent className="quarter-card-content">
                <div className="card-icon">
                  <IonIcon icon={schoolOutline} />
                </div>
                <h3 className="card-title">Ikalawang Markahan</h3>
                <p className="card-subtitle">Kuwentong Bayan at Pabula</p>
                <p className="card-description">Alamat, Pabula, Komiks, at Brochure</p>
                <div className="card-progress">
                  <div className="progress-header">
                    <span className="progress-label">Progreso</span>
                    <span className="progress-percent">
                      {getQuarterProgressStatus(2)}
                    </span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <IonProgressBar
                      value={getQuarterProgress(2) / 100}
                      className="modern-progress"
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <span className="coming-soon">Paparating na...</span>
                </div>
              </IonCardContent>
            </IonCard>
            
            <IonCard 
              className="quarter-card disabled"
              onClick={() => {}}
            >
              <div className="card-number">3</div>
              <div className="card-glow" />
              <IonCardContent className="quarter-card-content">
                <div className="card-icon">
                  <IonIcon icon={schoolOutline} />
                </div>
                <h3 className="card-title">Ikatlong Markahan</h3>
                <p className="card-subtitle">Panitikan at Pagsusuri</p>
                <p className="card-description">Mas malalim na pag-unawa sa teksto at biswal</p>
                <div className="card-progress">
                  <div className="progress-header">
                    <span className="progress-label">Progreso</span>
                    <span className="progress-percent">
                      {getQuarterProgressStatus(3)}
                    </span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <IonProgressBar
                      value={getQuarterProgress(3) / 100}
                      className="modern-progress"
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <span className="coming-soon">Paparating na...</span>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    );
  }
  
  if (shuffledQuestions.length === 0 && !quizCompleted) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar className="modern-toolbar">
            <IonButtons slot="start">
              <IonBackButton text="Ibalik" className="modern-back-btn" />
            </IonButtons>
            <IonTitle className="modern-title">Pagsusulit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="quiz-loading">
          <div className="loading-container">
            <IonIcon icon={playCircleOutline} className="loading-icon" />
            <h2>Ini-load ang pagsusulit...</h2>
          </div>
        </IonContent>
      </IonPage>
    );
  }
  
  if (showResults || quizCompleted) {
    // Show results screen
    const results: QuizResult = quizCompleted 
      ? JSON.parse(localStorage.getItem('quarter1QuizResults') || '{"score": 0, "total": 0, "answers": []}')
      : calculateScore();
    
    const percentage = Math.round((results.score / results.total) * 100);
    
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar className="modern-toolbar">
            <IonButtons slot="start">
              <IonBackButton text="Ibalik" className="modern-back-btn" />
            </IonButtons>
            <IonTitle className="modern-title">Pagsusulit - Resulta</IonTitle>

          </IonToolbar>
        </IonHeader>
        
        <IonContent fullscreen className="results-content">
          <div className="results-container">
            <div className="percentage-circle">
              <svg viewBox="0 0 100 100" className="circle-svg">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={percentage >= 75 ? '#10dc60' : percentage >= 50 ? '#ffd500' : '#ff4c4c'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="percentage-text">{percentage}%</div>
            </div>
            
            <div className="results-summary">
              <h2>{percentage >= 75 ? 'Mahusay!' : percentage >= 50 ? 'Magaling!' : 'Patuloy na Pag-aaral'}</h2>
              <p>Nakakuha ka ng <strong>{results.score}</strong> sa <strong>{results.total}</strong> na tanong</p>
            </div>
            
            <div className="result-buttons-container">
              <IonButton 
                expand="block" 
                fill="outline"
                className="back-to-selection-button"
                onClick={() => setShowQuarterSelection(true)}
              >
                <IonIcon icon={arrowBackOutline} slot="start" />
                Pumili ng Ibang Markahan
              </IonButton>
              
              <IonButton 
                expand="block" 
                className="retake-button"
                onClick={handleRetakeQuiz}
              >
                <IonIcon icon={refresh} slot="start" />
                Umuwi sa Aralin
              </IonButton>
            </div>
            
            <div className="review-section">
              <h3>Review ng Mga Sagot</h3>
              {results.answers.map((answer, index) => {
                const question = shuffledQuestions.find(q => q.id === answer.questionId);
                if (!question) return null;
                
                return (
                  <IonCard key={question.id} className="answer-review-card">
                    <IonCardContent>
                      <div className="question-number">#{index + 1}</div>
                      <h4>{question.question}</h4>
                      
                      <div className="correct-answer">
                        <IonIcon icon={checkmarkCircle} color="success" />
                        <strong>Tama: </strong> {question.options[question.correctAnswer]}
                      </div>
                      
                      {answer.selectedOption !== null && answer.selectedOption !== question.correctAnswer && (
                        <div className="incorrect-answer">
                          <IonIcon icon={closeCircle} color="danger" />
                          <strong>Sagot Mo: </strong> {question.options[answer.selectedOption]}
                        </div>
                      )}
                      
                      {answer.selectedOption === null && (
                        <div className="no-answer">
                          <IonIcon icon={closeCircle} color="warning" />
                          <strong>Walang sagot</strong>
                        </div>
                      )}
                      
                      {question.explanation && (
                        <p className="explanation">{question.explanation}</p>
                      )}
                    </IonCardContent>
                  </IonCard>
                );
              })}
            </div>
          </div>
        </IonContent>
        
        <IonAlert
          isOpen={showRetakeAlert}
          onDidDismiss={() => setShowRetakeAlert(false)}
          header={'Umuwi sa Aralin'}
          message={'Gusto mo bang umuwi sa Aralin 1?'}
          buttons={[{
            text: 'Hindi',
            role: 'cancel'
          }, {
            text: 'Oo',
            handler: () => {
              window.location.href = '/quarter/1/aralin/1';
            }
          }]}
        />
      </IonPage>
    );
  }
  
  // Show quiz question
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="modern-toolbar">
          <IonButtons slot="start">
            <IonBackButton text="Ibalik" className="modern-back-btn" />
          </IonButtons>
          <IonTitle className="modern-title">Pagsusulit</IonTitle>

        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="quiz-content">
        <div className="quiz-header">
          <div className="progress-container">
            <div className="question-counter">
              #{currentQuestionIndex + 1} ng {shuffledQuestions.length}
            </div>
            <IonProgressBar value={progress / 100} className="quiz-progress" />
          </div>
        </div>
        
        <div className="question-container">
          <IonCard className="question-card">
            <IonCardContent>
              <h3>{currentQuestion.question}</h3>
              
              <IonRadioGroup
                value={selectedAnswers[currentQuestionIndex]?.toString()}
                onIonChange={(e) => handleAnswerSelect(parseInt(e.detail.value))}
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="option-wrapper">
                    <IonCard 
                      className={`option-card ${selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <IonCardContent className="option-card-content">
                        <IonRadio
                          slot="start"
                          value={index.toString()}
                          className="option-radio"
                        />
                        <IonLabel className="option-label">{option}</IonLabel>
                      </IonCardContent>
                    </IonCard>
                  </div>
                ))}
              </IonRadioGroup>
            </IonCardContent>
          </IonCard>
        </div>
        
        <div className="navigation-container">
          <div className="nav-buttons">
            <IonButton 
              fill="clear" 
              disabled={currentQuestionIndex === 0}
              onClick={handlePreviousQuestion}
            >
              <IonIcon icon={arrowBackOutline} slot="start" />
              Previous
            </IonButton>
            
            {currentQuestionIndex < shuffledQuestions.length - 1 ? (
              <IonButton 
                expand="block" 
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestionIndex] === null}
              >
                Sunod
                <IonIcon icon={playCircleOutline} slot="end" />
              </IonButton>
            ) : (
              <IonButton 
                expand="block" 
                onClick={handleSubmitQuiz}
                disabled={selectedAnswers.some(answer => answer === null)}
                color="success"
              >
                Isumite ang Pagsusulit
                <IonIcon icon={checkmarkCircle} slot="end" />
              </IonButton>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Quiz;
