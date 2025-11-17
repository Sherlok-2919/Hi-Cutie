/**
 * Performance utilities for mobile optimization
 */

/**
 * Checks if the device is a mobile device based on screen width and touch capability
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
    window.innerWidth < 768
  );
};

/**
 * Checks if the user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Reduces the number of animated elements on mobile devices
 */
export const getOptimizedElementCount = (desktopCount: number, mobileRatio: number = 0.5): number => {
  return isMobileDevice() ? Math.floor(desktopCount * mobileRatio) : desktopCount;
};

/**
 * Throttle function for performance-critical operations
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastRan = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastRan >= delay) {
      func.apply(this, args);
      lastRan = now;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastRan = Date.now();
      }, delay - (now - lastRan));
    }
  };
};

/**
 * Debounce function for performance-critical operations
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Returns optimized animation duration based on device performance
 */
export const getOptimizedDuration = (baseDuration: number): number => {
  if (prefersReducedMotion()) return 0.01;
  if (isMobileDevice()) return baseDuration * 0.7; // Faster animations on mobile
  return baseDuration;
};

/**
 * Lazy load images with Intersection Observer
 */
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  } else {
    // Fallback for browsers without IntersectionObserver
    img.src = src;
  }
};
