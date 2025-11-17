import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

interface StaggeredHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function StaggeredHeading({ 
  text, 
  className = '', 
  as: Component = 'h1' 
}: StaggeredHeadingProps) {
  const words = text.split(' ');
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{ perspective: 1000 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={childVariants}
          className="inline-block mr-3"
          style={{ transformOrigin: 'center bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
