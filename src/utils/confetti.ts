import confetti from 'canvas-confetti';

export function triggerCelebrationConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ['#FFD700', '#FF69B4', '#FF1493', '#FF6347', '#FFA500', '#9370DB'];

  const frame = () => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return;

    const particleCount = 50 * (timeLeft / duration);

    // Left side burst
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });

    // Right side burst
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });

    requestAnimationFrame(frame);
  };

  frame();
}

export function triggerCenterConfetti() {
  const colors = ['#FFD700', '#FF69B4', '#FF1493', '#FF6347', '#FFA500', '#9370DB'];
  
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors,
    disableForReducedMotion: true,
  });
}
