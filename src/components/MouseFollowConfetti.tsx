import { useEffect, useRef } from 'react';

export default function MouseFollowConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
    emoji?: string;
  }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastEmitRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = [
      '#ff69b4', '#ff1493', '#ff6fa8', '#ffc0cb',
      '#ffb3d9', '#c71585', '#db7093', '#ff85c0',
      '#ffd700', '#ffa500', '#ff6347', '#ff4500'
    ];

    const emojis = ['✨', '💖', '🎉', '🎊', '⭐', '💫', '🌟', '💝', '🎈', '🎆'];

    const createParticle = (mouseX: number, mouseY: number) => {
      const angle = (Math.random() - 0.5) * Math.PI * 0.6; // Spread angle
      const speed = 8 + Math.random() * 6;
      const startY = canvas.height + 20;
      const startX = mouseX + (Math.random() - 0.5) * 100;
      
      const useEmoji = Math.random() > 0.6;

      return {
        x: startX,
        y: startY,
        targetX: mouseX,
        targetY: mouseY,
        vx: Math.sin(angle) * speed,
        vy: -Math.abs(Math.cos(angle) * speed) - 4,
        life: 1,
        maxLife: 60 + Math.random() * 40,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: useEmoji ? 20 + Math.random() * 10 : 4 + Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        emoji: useEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : undefined,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      const now = Date.now();
      if (now - lastEmitRef.current > 150) { // Emit every 150ms
        lastEmitRef.current = now;
        
        // Create burst of particles
        const particleCount = 8 + Math.floor(Math.random() * 5);
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(createParticle(e.clientX, e.clientY));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life--;
        
        // Apply gravity and movement
        particle.vy += 0.3; // gravity
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Fade out
        const opacity = particle.life / particle.maxLife;

        if (particle.life <= 0 || particle.y > canvas.height + 50) {
          return false;
        }

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.globalAlpha = opacity;

        if (particle.emoji) {
          ctx.font = `${particle.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.emoji, 0, 0);
        } else {
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          
          // Random shapes
          const shapeType = Math.floor(Math.random() * 3);
          if (shapeType === 0) {
            // Circle
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          } else if (shapeType === 1) {
            // Square
            ctx.rect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
          } else {
            // Triangle
            ctx.moveTo(0, -particle.size);
            ctx.lineTo(particle.size, particle.size);
            ctx.lineTo(-particle.size, particle.size);
            ctx.closePath();
          }
          
          ctx.fill();
        }

        ctx.restore();
        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
