# 🎉 Birthday Website Animation Enhancement Guide

A comprehensive guide to add delightful, polished animations inspired by modern UI libraries like shadcn/ui, Radix UI, and React Bits.

---

## 🎨 Animation Ideas Overview

### 1. **Magnetic Button Hover Effect** 
**Location:** Landing Page & Message Card  
**What Happens:** Buttons subtly follow the cursor when hovering nearby, creating a playful "magnetic" pull effect.  
**When:** On hover within ~100px radius of button  
**How:** Track mouse position, calculate distance, apply transform offset

**Technical Approach:**
- **Library:** Framer Motion + React hooks
- **Method:** `useMotionValue` for smooth cursor tracking
- **Accessibility:** Disable on touch devices, respect reduced motion

```tsx
// Implementation Example
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

export function MagneticButton({ children, ...props }: React.ComponentProps<'button'>) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    if (!ref.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      // Magnetic effect within 100px
      if (distance < 100) {
        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
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
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.95 }}
      className="relative bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg"
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

**Performance Note:** Use `will-change: transform` sparingly, throttle mousemove events for older devices.

---

### 2. **Staggered Text Reveal Animation**
**Location:** Landing Page Title & Celebration Heading  
**What Happens:** Each word or character of the heading animates in with a cascading delay, creating a typewriter-like reveal.  
**When:** On page load or scroll into view  
**How:** Split text into spans, apply staggered animation with `transition.staggerChildren`

**Technical Approach:**
- **Library:** Framer Motion
- **Method:** `variants` with `staggerChildren` + `delayChildren`
- **Accessibility:** Text remains readable if animations disabled

```tsx
// Implementation Example
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
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export function StaggeredHeading({ text }: { text: string }) {
  const words = text.split(' ');
  
  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
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
    </motion.h1>
  );
}
```

**Accessibility:** Ensure `prefers-reduced-motion` skips 3D transforms, use `@media (prefers-reduced-motion: reduce)` to simplify.

---

### 3. **Parallax Floating Elements**
**Location:** All Pages (Background)  
**What Happens:** Decorative elements (hearts, stars, balloons) move at different speeds as you scroll, creating depth.  
**When:** Continuous during scroll  
**How:** Use `useScroll` + `useTransform` to map scroll position to Y offset

**Technical Approach:**
- **Library:** Framer Motion `useScroll` + `useTransform`
- **Method:** Multiple layers with different scroll speeds (0.2x, 0.5x, 0.8x)
- **Performance:** Use `transform` instead of `top/left`, limit to ~10-15 elements

```tsx
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  
  // Different speeds for depth
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute top-20 left-10">
        <span className="text-6xl opacity-40">🎈</span>
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-40 right-20">
        <span className="text-8xl opacity-30">✨</span>
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-40 left-1/3">
        <span className="text-7xl opacity-25">💖</span>
      </motion.div>
    </div>
  );
}
```

**Mobile Optimization:** Reduce element count on small screens, disable parallax if `matchMedia('(max-width: 768px)')`.

---

### 4. **Photo Gallery Hover Tilt Effect**
**Location:** Photo Gallery  
**What Happens:** Photos tilt in 3D toward the cursor on hover, with a subtle glow/shadow following the tilt direction.  
**When:** On mouse enter/move over photo cards  
**How:** Track mouse position relative to card center, apply `rotateX` and `rotateY` transforms

**Technical Approach:**
- **Library:** Framer Motion or vanilla React + CSS transforms
- **Method:** Calculate cursor position → normalize → apply 3D rotation
- **Accessibility:** Touch devices get simple scale animation instead

```tsx
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const rotateXSpring = useSpring(rotateX, { stiffness: 100, damping: 10 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 100, damping: 10 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXVal = ((y - centerY) / centerY) * -10;
    const rotateYVal = ((x - centerX) / centerX) * 10;
    
    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ scale: 1.05 }}
      className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
    >
      {children}
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"
        style={{
          x: useSpring(rotateY, { stiffness: 100, damping: 10 }),
          y: useSpring(rotateX, { stiffness: 100, damping: 10 }),
        }}
      />
    </motion.div>
  );
}
```

**Note:** Add `will-change: transform` on hover only to avoid performance issues.

---

### 5. **Confetti Burst on Milestones**
**Location:** Cake Section (after cutting) & Message Card (on reveal)  
**What Happens:** Colorful confetti particles explode from a point when user completes an action.  
**When:** On cake cut, message card open  
**How:** Use `canvas-confetti` library for physics-based particle animation

**Technical Approach:**
- **Library:** `canvas-confetti` (already in your project)
- **Method:** Fire confetti from specific coordinates with custom colors/shapes
- **Accessibility:** Respect `prefers-reduced-motion` with `disableForReducedMotion: true`

```tsx
import confetti from 'canvas-confetti';

export function triggerCelebrationConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const colors = ['#FFD700', '#FF69B4', '#FF1493', '#FF6347', '#FFA500', '#9370DB'];

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

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

// Usage in component
<button onClick={triggerCelebrationConfetti}>
  🎉 Celebrate!
</button>
```

**Performance:** Canvas-based, GPU-accelerated; safe for mobile. Limit duration to 3-5 seconds.

---

### 6. **Shimmer/Shine Text Effect**
**Location:** Landing Page Title, Birthday Heading  
**What Happens:** A glossy light sweeps across the gradient text periodically, creating a "shimmering" effect.  
**When:** Continuous loop or on hover  
**How:** Animated gradient position or pseudo-element with `linear-gradient` + `background-position` animation

**Technical Approach:**
- **Library:** Pure CSS keyframes or Framer Motion `animate`
- **Method:** Animate `background-position` or overlay with `translateX`
- **Performance:** CSS animations run on compositor thread (very smooth)

```tsx
import { motion } from 'framer-motion';

export function ShimmerText({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
        {children}
      </h1>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)',
        }}
        animate={{
          x: ['-200%', '200%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'linear',
          repeatDelay: 2,
        }}
      />
    </div>
  );
}
```

**CSS Alternative:**
```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shimmer-text {
  background: linear-gradient(90deg, 
    #ec4899 0%, 
    #fff 50%, 
    #a855f7 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
```

**Accessibility:** Pure visual enhancement, no impact on screen readers.

---

### 7. **Toast Notification for Actions**
**Location:** Landing Page (after name submit), Cake Section (after cut)  
**What Happens:** A cute toast message slides in from the top/corner confirming the action with an emoji + message.  
**When:** After key user interactions  
**How:** Use Radix UI Toast primitive or Framer Motion + portal for slide-in animation

**Technical Approach:**
- **Library:** Radix UI `@radix-ui/react-toast` + Framer Motion
- **Method:** AnimatePresence for enter/exit, portal for positioning
- **Accessibility:** ARIA live region, keyboard dismissible, focus trap

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string; emoji: string }[]>([]);

  const showToast = (message: string, emoji: string = '🎉') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, emoji }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  return { toasts, showToast };
}

export function ToastContainer({ toasts }: { toasts: any[] }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg px-6 py-4 flex items-center gap-3 border border-pink-200"
          >
            <span className="text-3xl">{toast.emoji}</span>
            <p className="font-medium text-gray-800">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Usage:
// const { toasts, showToast } = useToast();
// <ToastContainer toasts={toasts} />
// showToast('Welcome to the celebration!', '🎊');
```

**Mobile Note:** Position `bottom-4` on mobile for thumb-friendly dismissal.

---

## 🎯 Implementation Priority

### High Priority (Implement First)
1. ✅ **Staggered Text Reveal** - Immediate visual impact on landing
2. ✅ **Confetti Burst** - Already partially implemented, enhance it
3. ✅ **Parallax Floating Elements** - Adds depth across all pages

### Medium Priority
4. ⭐ **Magnetic Button Hover** - Delightful interaction, desktop-focused
5. ⭐ **Photo Gallery Tilt Effect** - Makes gallery memorable

### Nice-to-Have
6. 💫 **Shimmer Text Effect** - Polish for headings
7. 💫 **Toast Notifications** - UX feedback enhancement

---

## ♿ Accessibility Checklist

### Motion Preferences
```css
/* Add to index.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### React Hook for Reduced Motion
```tsx
import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return prefersReduced;
}

// Usage:
const shouldReduceMotion = usePrefersReducedMotion();
```

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Add focus rings: `focus-visible:ring-4 focus-visible:ring-pink-300`
- Trap focus in modals/cards
- Use semantic HTML (`<button>`, not `<div onClick>`)

### Screen Readers
- Add `aria-live="polite"` to toast container
- Use `aria-label` for icon-only buttons
- Ensure text contrast ratio ≥ 4.5:1 (WCAG AA)

---

## 🚀 Performance Optimization

### Lazy Loading
```tsx
import { lazy, Suspense } from 'react';

const PhotoGallery = lazy(() => import('./components/PhotoGallery'));

<Suspense fallback={<div>Loading photos...</div>}>
  <PhotoGallery />
</Suspense>
```

### Animation Performance Tips
1. **Use `transform` and `opacity`** - GPU accelerated
2. **Avoid `width`, `height`, `top`, `left`** - triggers layout reflow
3. **Limit concurrent animations** - max 3-5 heavy animations at once
4. **Use `will-change` sparingly** - only during animation
5. **Debounce scroll listeners** - use `passive: true` option

### Code Splitting
```tsx
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'gsap': ['gsap'],
        },
      },
    },
  },
});
```

---

## 📱 Mobile Responsiveness

### Touch-Friendly Adjustments
```tsx
const isTouchDevice = 'ontouchstart' in window;

// Disable hover effects on touch
{!isTouchDevice && <MagneticButton />}

// Simplify animations on mobile
const animationVariants = {
  desktop: { rotate: 360, scale: 1.2 },
  mobile: { scale: 1.1 },
};

<motion.div
  animate={isTouchDevice ? 'mobile' : 'desktop'}
  variants={animationVariants}
/>
```

### Viewport-Based Scaling
```tsx
// Use clamp() for responsive text
className="text-[clamp(2rem,5vw,4rem)]"

// Scale animations based on viewport
const scale = window.innerWidth < 768 ? 0.8 : 1;
```

---

## 🎨 Color Palette (Pastel Theme)

```css
:root {
  --pink-50: #fef2f2;
  --pink-100: #fee2e2;
  --pink-200: #fecaca;
  --pink-400: #fb7185;
  --pink-500: #f43f5e;
  
  --purple-100: #f3e8ff;
  --purple-400: #c084fc;
  --purple-500: #a855f7;
  
  --blue-100: #dbeafe;
  --blue-400: #60a5fa;
  
  --rose-400: #fb7185;
  --yellow-300: #fde047;
}
```

---

## 📦 Required Dependencies

```bash
npm install framer-motion canvas-confetti
npm install @radix-ui/react-toast  # Optional for toasts
npm install gsap  # If using GSAP timelines
```

---

## 🎬 Quick Start Implementation Order

1. **Day 1:** Staggered Text + Parallax Background
2. **Day 2:** Photo Gallery Tilt + Enhanced Confetti
3. **Day 3:** Magnetic Buttons + Shimmer Effect
4. **Day 4:** Toast Notifications + Accessibility Polish
5. **Day 5:** Performance optimization + Mobile testing

---

## 💡 Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [GSAP Animation](https://greensock.com/gsap/)
- [21st.dev Components](https://21st.dev/)
- [React Bits](https://www.reactbits.dev/)
- [shadcn/ui](https://ui.shadcn.com/)

---

**Happy Building! 🎉 Make it magical! ✨**
