import { useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const KONAMI_SEQUENCE = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
] as const;

export default function EasterEggs() {
  const konamiIndexRef = useRef(0);
  // Track the confetti timers and overlay DOM node for reliable cleanup.
  const cleanupRef = useRef({
    intervalId: null as number | null,
    timeoutId: null as number | null,
    messageEl: null as HTMLDivElement | null,
  });

  const clearKonamiArtifacts = useCallback(() => {
    const { intervalId, timeoutId, messageEl } = cleanupRef.current;

    if (intervalId !== null) {
      window.clearInterval(intervalId);
      cleanupRef.current.intervalId = null;
    }

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
      cleanupRef.current.timeoutId = null;
    }

    if (messageEl && document.body.contains(messageEl)) {
      document.body.removeChild(messageEl);
      cleanupRef.current.messageEl = null;
    }
  }, []);

  const triggerKonamiReward = useCallback(() => {
    clearKonamiArtifacts();

    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const intervalId = window.setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearKonamiArtifacts();
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ff6fa8', '#ffc0cb'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#9370db', '#ba55d3', '#dda0dd', '#ee82ee'],
      });
    }, 250);
    cleanupRef.current.intervalId = intervalId;

    // Show secret message
    const messageDiv = document.createElement('div');
    messageDiv.setAttribute('role', 'status');
    messageDiv.setAttribute('aria-live', 'polite');
    messageDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        background: linear-gradient(135deg, #ff69b4, #9370db);
        color: white;
        padding: 40px 60px;
        border-radius: 20px;
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: pulse 2s ease-in-out;
      ">
        🎉 SECRET UNLOCKED! 🎉<br/>
        <span style="font-size: 18px; font-weight: normal; margin-top: 10px; display: block;">
          You found the hidden surprise! You're amazing! 💖
        </span>
      </div>
    `;
    document.body.appendChild(messageDiv);
    cleanupRef.current.messageEl = messageDiv;

    const timeoutId = window.setTimeout(() => {
      clearKonamiArtifacts();
    }, duration);
    cleanupRef.current.timeoutId = timeoutId;

    konamiIndexRef.current = 0;
  }, [clearKonamiArtifacts]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedKey = event.key.toLowerCase();
      const expectedKey = KONAMI_SEQUENCE[konamiIndexRef.current];

      if (pressedKey === expectedKey) {
        konamiIndexRef.current += 1;

        if (konamiIndexRef.current === KONAMI_SEQUENCE.length) {
          triggerKonamiReward();
        }
        return;
      }

      konamiIndexRef.current = pressedKey === KONAMI_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearKonamiArtifacts();
    };
  }, [clearKonamiArtifacts, triggerKonamiReward]);

  return null;
}
