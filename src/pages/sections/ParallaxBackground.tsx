import { motion, useScroll, useTransform } from 'framer-motion';

const elements = [
  { emoji: '🎈', top: '10%', left: '10%', speed: -200, size: 'text-6xl', color: 'text-rose-200' },
  { emoji: '✨', top: '20%', right: '15%', speed: -400, size: 'text-8xl', color: 'text-sky-100' },
  { emoji: '💖', top: '50%', left: '20%', speed: -600, size: 'text-7xl', color: 'text-pink-300' },
  { emoji: '🎂', top: '30%', right: '25%', speed: -350, size: 'text-6xl', color: 'text-amber-100' },
  { emoji: '🎉', top: '70%', left: '15%', speed: -500, size: 'text-7xl', color: 'text-lime-200' },
  { emoji: '⭐', top: '60%', right: '20%', speed: -300, size: 'text-5xl', color: 'text-indigo-100' },
  { emoji: '🎁', top: '80%', left: '30%', speed: -450, size: 'text-6xl', color: 'text-amber-200' },
  { emoji: '🌸', top: '40%', left: '5%', speed: -250, size: 'text-7xl', color: 'text-fuchsia-200' },
  { emoji: '🦋', top: '15%', right: '30%', speed: -550, size: 'text-6xl', color: 'text-cyan-100' },
  { emoji: '🎪', top: '85%', right: '10%', speed: -380, size: 'text-8xl', color: 'text-violet-200' },
];

export default function ParallaxBackground() {
  const { scrollYProgress } = useScroll();

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Reduce elements on mobile
  const displayElements = isMobile ? elements.slice(0, 6) : elements;

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {displayElements.map((element, index) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, element.speed]);
        
        return (
          <motion.div
            key={index}
            style={{ 
              y,
              position: 'absolute',
              top: element.top,
              left: element.left,
              right: element.right,
            }}
            className="opacity-40"
          >
            <span className={`${element.size} ${element.color}`}>{element.emoji}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
