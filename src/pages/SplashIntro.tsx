import { IonPage, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SplashIntro.css';

const SplashIntro: React.FC = () => {
  const history = useHistory();
  const [phase, setPhase] = useState<'enter' | 'pulse' | 'exit'>('enter');

  useEffect(() => {
    // ── CHANGED: sessionStorage instead of localStorage ──────
    // sessionStorage clears when the app/tab is closed,
    // so the welcome video plays fresh every time the app reopens.
    const seenWelcome = sessionStorage.getItem('yco_seen_welcome') === '1';

    // Phase timeline:
    // 0ms    → logo fades + scales in  ('enter')
    // 1000ms → subtle pulse            ('pulse')
    // 1800ms → fade out                ('exit')
    // 2200ms → navigate to welcome or home
    const t1 = setTimeout(() => setPhase('pulse'), 1000);
    const t2 = setTimeout(() => setPhase('exit'),  1800);
    const t3 = setTimeout(() => {
      history.replace(seenWelcome ? '/home' : '/welcome');
    }, 2200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="splash-content">

        {/* Animated background blobs */}
        <div className="splash-blob splash-blob--1" />
        <div className="splash-blob splash-blob--2" />
        <div className="splash-blob splash-blob--3" />

        {/* Top ticker */}
        <div className="splash-ticker" aria-hidden="true">
          ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉 &nbsp;
          ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉 ⭐ 🌈 ✨ 🎉
        </div>

        <div className={`splash-center splash-center--${phase}`}>

          {/* Logo ring */}
          <div className="splash-logo-ring">
            <div className="splash-logo-ring-inner">
              <img
                src="/assets/img/yco-logo.png"
                className="splash-logo"
                alt="YCO Logo"
              />
            </div>
            <div className="splash-ring splash-ring--1" />
            <div className="splash-ring splash-ring--2" />
          </div>

          <h1 className="splash-title">YCO Learning</h1>
          <p className="splash-subtitle">Filipino 7 · MATATAG Curriculum</p>

          <div className="splash-chips">
            <span className="splash-chip splash-chip--red">📖 Aralin</span>
            <span className="splash-chip splash-chip--blue">🎧 Audio</span>
            <span className="splash-chip splash-chip--green">🎮 Laro</span>
          </div>

          <div className="splash-dots">
            <span className="splash-dot" />
            <span className="splash-dot" />
            <span className="splash-dot" />
          </div>

        </div>

        {/* Bottom ticker */}
        <div className="splash-ticker splash-ticker--bottom" aria-hidden="true">
          📚 Matuto · Maglaro · Sumulat · Manood · 📚 Matuto · Maglaro · Sumulat · Manood ·
          📚 Matuto · Maglaro · Sumulat · Manood · 📚 Matuto · Maglaro · Sumulat · Manood
        </div>

      </IonContent>
    </IonPage>
  );
};

export default SplashIntro;