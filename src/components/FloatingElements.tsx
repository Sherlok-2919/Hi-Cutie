import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

export default function FloatingElements() {
  const elements = [
    { Icon: Heart, color: 'text-pink-300', delay: 0, size: 'w-6 h-6' },
    { Icon: Star, color: 'text-yellow-300', delay: 1, size: 'w-5 h-5' },
    { Icon: Sparkles, color: 'text-purple-300', delay: 2, size: 'w-7 h-7' },
    { Icon: Heart, color: 'text-rose-300', delay: 3, size: 'w-5 h-5' },
    { Icon: Star, color: 'text-blue-300', delay: 4, size: 'w-6 h-6' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((elem, i) => (
        <motion.div
          key={i}
          className={`absolute ${elem.color}`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.6, 0.6, 0],
            rotate: 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            delay: elem.delay,
            ease: 'linear',
          }}
        >
          <elem.Icon className={elem.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
