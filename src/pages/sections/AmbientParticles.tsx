import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
}

export default function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const emojis = ['💖', '✨', '🎈', '⭐', '💝', '🌸', '🦋', '💕'];

  useEffect(() => {
    const generateParticle = (): Particle => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: -10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      delay: Math.random() * 2,
    });

    const initialParticles = Array.from({ length: 15 }, generateParticle);
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticles = [...prev];
        if (newParticles.length < 20) {
          newParticles.push(generateParticle());
        }
        return newParticles.slice(-20);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}vw`,
              y: '-10%',
              opacity: 0,
              scale: 0.5,
              rotate: 0,
            }}
            animate={{
              y: '110%',
              opacity: [0, 0.6, 0.6, 0],
              scale: [0.5, 1, 1, 0.5],
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 12 + Math.random() * 8,
              delay: particle.delay,
              ease: 'linear',
            }}
            className="absolute text-2xl"
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
