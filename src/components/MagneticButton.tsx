import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  magneticRange?: number;
  strength?: number;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({ 
  children, 
  magneticRange = 100,
  strength = 0.3,
  className = '',
  onClick,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    if (!ref.current) return;
    
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      // Magnetic effect within range
      if (distance < magneticRange) {
        x.set(distanceX * strength);
        y.set(distanceY * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    document.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);
    
    const currentRef = ref.current;
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      currentRef?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, magneticRange, strength]);

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
