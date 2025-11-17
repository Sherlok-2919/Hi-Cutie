import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { triggerCelebrationConfetti } from '../../utils/confetti';

interface CakeSectionProps {
  onCakeCut: () => void;
  cakeCut: boolean;
}

const boardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><circle cx="40" cy="40" r="65" fill="%23fde68a" fill-opacity="0.6"/><circle cx="120" cy="90" r="55" fill="%23fcd34d" fill-opacity="0.4"/><circle cx="80" cy="120" r="50" fill="%23fcb6ce" fill-opacity="0.25"/></svg>`;
const boardPatternData = `data:image/svg+xml;utf8,${encodeURIComponent(boardSvg)}`;

export default function CakeSection({ onCakeCut, cakeCut }: CakeSectionProps) {
  const [showKnife, setShowKnife] = useState(false);
  const leftSliceRef = useRef<HTMLDivElement>(null);
  const rightSliceRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCutting, setIsCutting] = useState(false);
  const [cutPoints, setCutPoints] = useState<{ x: number; y: number }[]>([]);
  const [showSplitCake, setShowSplitCake] = useState(false);
  const pointerTypeRef = useRef<'mouse' | 'touch' | 'pen'>('mouse');
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const moveFrameRef = useRef<number | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const MAX_POINTS = 48;
  const MIN_POINT_DISTANCE = 0.015;
  const sectionStyle = {
    backgroundImage:
      'radial-gradient(circle at 0% 0%, rgba(251, 207, 232, 0.9), transparent 55%), ' +
      'radial-gradient(circle at 100% 100%, rgba(199, 210, 254, 0.9), transparent 55%), ' +
      'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(251, 207, 232, 0.7))',
    backgroundSize: '140% 140%, 140% 140%, cover',
    backgroundRepeat: 'no-repeat',
  };
  const cakeBodyStyle = {
    backgroundImage: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.95), rgba(255,255,255,0.2)), url('${boardPatternData}')`,
    backgroundSize: 'cover',
  };
  const plateStyle = {
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.85), rgba(251, 207, 232, 0.7)), url('${boardPatternData}')`,
    backgroundSize: '220px 220px',
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsTouchDevice(('ontouchstart' in window) || navigator.maxTouchPoints > 0);

    return () => {
      if (moveFrameRef.current) {
        cancelAnimationFrame(moveFrameRef.current);
      }
    };
  }, []);

  const performCakeCut = () => {
    if (cakeCut) return;

    onCakeCut();

    if (leftSliceRef.current && rightSliceRef.current) {
      gsap.to(leftSliceRef.current, {
        x: -150,
        rotation: -20,
        duration: 1,
        ease: 'power2.out',
      });

      gsap.to(rightSliceRef.current, {
        x: 150,
        rotation: 20,
        duration: 1,
        ease: 'power2.out',
      });
    }

    setTimeout(() => {
      triggerCelebrationConfetti();
    }, 500);
  };

  const completeCut = () => {
    if (cakeCut) return;
    setShowSplitCake(true);
    setCutPoints([]);
    lastPointRef.current = null;
    performCakeCut();
  };

  const startCut = (e: React.PointerEvent<HTMLDivElement>) => {
    if (cakeCut) return;
    if (!containerRef.current) return;

    pointerTypeRef.current = (e.pointerType as 'mouse' | 'touch' | 'pen') || 'mouse';

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setIsCutting(true);
    lastPointRef.current = { x, y };
    setCutPoints([{ x, y }]);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const recordPoint = (x: number, y: number) => {
    const last = lastPointRef.current;
    const distance = last ? Math.hypot(x - last.x, y - last.y) : Infinity;

    if (distance < MIN_POINT_DISTANCE) return;

    lastPointRef.current = { x, y };
    setCutPoints((prev) => {
      const next = [...prev, { x, y }];
      if (next.length > MAX_POINTS) {
        return next.slice(next.length - MAX_POINTS);
      }
      return next;
    });
  };

  const moveCut = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isCutting || cakeCut) return;
    if (!containerRef.current) return;

    if (moveFrameRef.current) return;

    moveFrameRef.current = requestAnimationFrame(() => {
      moveFrameRef.current = null;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      recordPoint(x, y);
    });
  };

  const endCut = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (!isCutting || cakeCut) return;
    setIsCutting(false);
    e?.currentTarget.releasePointerCapture?.(e.pointerId);

    const shouldFinish =
      cutPoints.length >= 4 ||
      pointerTypeRef.current === 'touch' ||
      isTouchDevice;

    if (!shouldFinish) {
      setCutPoints([]);
      return;
    }

    completeCut();
  };

  return (
    <section
      style={sectionStyle}
      className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 relative"
    >
      {/* dreamy background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80 overflow-hidden">
        <div className="absolute -top-24 -left-10 w-64 h-64 bg-pink-300/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -right-16 w-72 h-72 bg-purple-300/40 blur-3xl rounded-full" />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-200/40 blur-3xl rounded-full" />
      </div>

      {/* Cute GIFs floating around - behind the cake card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="hidden sm:block absolute top-16 left-4 md:left-12 z-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/2.gif"
          className="w-16 sm:w-20 md:w-28 drop-shadow-2xl rounded-lg"
          alt="blushing"
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden sm:block absolute top-16 right-4 md:right-12 z-0 pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/1.gif"
          className="w-16 sm:w-20 md:w-28 drop-shadow-2xl rounded-lg"
          alt="waving"
          animate={{ y: [-10, 10, -10], rotate: [5, -5, 5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* floating emojis behind the cake */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{
              x: Math.random() * 100 + '%',
              y: '110%',
              rotate: Math.random() * 360,
            }}
            animate={{
              y: '-20%',
              rotate: 360,
            }}
            transition={{
              duration: 18 + Math.random() * 8,
              repeat: Infinity,
              delay: i * 0.6,
              ease: 'linear',
            }}
          >
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '🎈' : '💖'}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 shadow-md border border-pink-100">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-pink-500">
              Step 2
            </span>
            <span className="text-xs text-gray-500">Make a wish & cut the cake</span>
          </div>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-3">
          {!cakeCut ? 'Make a wish and cut the cake! 🎂' : 'Enjoy your special day! 🎉'}
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto px-4">
          Tap the cake and watch the magic happen with sparkles, slices, and confetti made just for you.
        </p>

        <div
          className="relative w-full max-w-2xl mx-auto cursor-pointer group"
          onMouseEnter={() => !cakeCut && setShowKnife(true)}
          onMouseLeave={() => {
            setShowKnife(false);
          }}
        >
          {/* glow frame around cake */}
          <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-tr from-pink-300/50 via-rose-300/40 to-purple-300/50 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

          <div
            ref={containerRef}
            className="relative rounded-2xl sm:rounded-[28px] bg-white/5 backdrop-blur-[26px] shadow-[0_25px_60px_rgba(244,114,182,0.35)] overflow-hidden border border-white/40"
            style={{ aspectRatio: '1/1', ...cakeBodyStyle, touchAction: 'none' }}
            onPointerDown={startCut}
            onPointerMove={moveCut}
            onPointerUp={endCut}
            onPointerLeave={endCut}
          >
            {isCutting && cutPoints.length > 1 && (
              <div className="absolute inset-0 pointer-events-none z-30">
                {cutPoints.slice(1).map((p, idx) => {
                  const prev = cutPoints[idx];
                  const x1 = prev.x * 100;
                  const y1 = prev.y * 100;
                  const x2 = p.x * 100;
                  const y2 = p.y * 100;

                  const length = Math.hypot(x2 - x1, y2 - y1);
                  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

                  return (
                    <div
                      key={idx}
                      className="absolute bg-pink-400 shadow-sm"
                      style={{
                        left: `${x1}%`,
                        top: `${y1}%`,
                        width: `${length}%`,
                        height: 2,
                        transformOrigin: '0 50%',
                        transform: `rotate(${angle}deg)`,
                        borderRadius: 9999,
                      }}
                    />
                  );
                })}
              </div>
            )}
            <AnimatePresence>
              {!cakeCut && showKnife && (
                <motion.div
                  initial={{ opacity: 0, y: -20, rotate: -25 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: [-25, 5, -10],
                    x: [-10, 10, -4],
                  }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 text-4xl"
                >
                  🔪
                </motion.div>
              )}
            </AnimatePresence>

            {/* soft glow under the cake */}
            <div
              className="absolute inset-x-6 bottom-8 h-14 rounded-full shadow-[0_20px_50px_rgba(236,72,153,0.45)] border border-white/30"
              style={plateStyle}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              {/* whole cake before cut */}
              {!showSplitCake && (
                <div className="relative w-72 md:w-80 h-64 md:h-72">
                  <svg viewBox="0 0 220 220" className="w-full h-full">
                    <defs>
                      <linearGradient id="cake-body-full" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#ffb3d9" />
                        <stop offset="50%" stopColor="#ff6fa8" />
                        <stop offset="100%" stopColor="#ff4e8e" />
                      </linearGradient>
                      <linearGradient id="cake-icing-full" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#fff5fb" />
                        <stop offset="100%" stopColor="#ffd1ea" />
                      </linearGradient>
                    </defs>

                    <ellipse cx="110" cy="190" rx="90" ry="18" fill="#8B4513" />
                    <rect x="25" y="85" width="170" height="100" fill="url(#cake-body-full)" rx="18" />
                    <rect x="35" y="95" width="150" height="16" fill="#ffe0ef" />
                    <rect x="35" y="122" width="150" height="16" fill="#ffe0ef" />
                    <rect x="35" y="149" width="150" height="16" fill="#ffe0ef" />
                    <ellipse cx="110" cy="85" rx="90" ry="18" fill="url(#cake-icing-full)" />
                    <line x1="110" y1="40" x2="110" y2="80" stroke="#FFD700" strokeWidth="4" />
                    <rect x="103" y="55" width="14" height="24" rx="4" fill="#ffb3d9" />
                    <ellipse cx="110" cy="36" rx="7" ry="10" fill="#FFA500" className="candle-flame" />
                    <path d="M 110 20 Q 104 27 110 33 Q 116 27 110 20" fill="#FF6347" className="candle-flame" />
                  </svg>
                </div>
              )}

              {/* split cake after successful cut */}
              {showSplitCake && (
                <>
                  <div
                    ref={leftSliceRef}
                    className="relative w-40 md:w-44 h-64 md:h-72 origin-right"
                  >
                    <svg viewBox="0 0 220 220" className="w-full h-full">
                      <defs>
                        <linearGradient id="cake-body-left" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%" stopColor="#ffb3d9" />
                          <stop offset="50%" stopColor="#ff6fa8" />
                          <stop offset="100%" stopColor="#ff4e8e" />
                        </linearGradient>
                        <linearGradient id="cake-icing-left" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#fff5fb" />
                          <stop offset="100%" stopColor="#ffd1ea" />
                        </linearGradient>
                      </defs>

                      <ellipse cx="110" cy="190" rx="90" ry="18" fill="#8B4513" />
                      <clipPath id="left-half">
                        <rect x="20" y="0" width="100" height="220" />
                      </clipPath>

                      <g clipPath="url(#left-half)">
                        <rect x="25" y="85" width="170" height="100" fill="url(#cake-body-left)" rx="18" />
                        <rect x="35" y="95" width="150" height="16" fill="#ffe0ef" />
                        <rect x="35" y="122" width="150" height="16" fill="#ffe0ef" />
                        <rect x="35" y="149" width="150" height="16" fill="#ffe0ef" />
                        <ellipse cx="110" cy="85" rx="90" ry="18" fill="url(#cake-icing-left)" />
                        <line x1="95" y1="40" x2="95" y2="80" stroke="#FFD700" strokeWidth="4" />
                        <rect x="88" y="55" width="14" height="24" rx="4" fill="#ffb3d9" />
                        <ellipse cx="95" cy="36" rx="7" ry="10" fill="#FFA500" className="candle-flame" />
                        <path d="M 95 20 Q 89 27 95 33 Q 101 27 95 20" fill="#FF6347" className="candle-flame" />
                      </g>
                    </svg>
                  </div>

                  <div
                    ref={rightSliceRef}
                    className="relative w-40 md:w-44 h-64 md:h-72 origin-left"
                  >
                    <svg viewBox="0 0 220 220" className="w-full h-full">
                      <defs>
                        <linearGradient id="cake-body-right" x1="1" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#ffb3d9" />
                          <stop offset="50%" stopColor="#ff6fa8" />
                          <stop offset="100%" stopColor="#ff4e8e" />
                        </linearGradient>
                        <linearGradient id="cake-icing-right" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#fff5fb" />
                          <stop offset="100%" stopColor="#ffd1ea" />
                        </linearGradient>
                      </defs>

                      <ellipse cx="110" cy="190" rx="90" ry="18" fill="#8B4513" />
                      <clipPath id="right-half">
                        <rect x="100" y="0" width="100" height="220" />
                      </clipPath>

                      <g clipPath="url(#right-half)">
                        <rect x="25" y="85" width="170" height="100" fill="url(#cake-body-right)" rx="18" />
                        <rect x="35" y="95" width="150" height="16" fill="#ffe0ef" />
                        <rect x="35" y="122" width="150" height="16" fill="#ffe0ef" />
                        <rect x="35" y="149" width="150" height="16" fill="#ffe0ef" />
                        <ellipse cx="110" cy="85" rx="90" ry="18" fill="url(#cake-icing-right)" />
                      </g>
                    </svg>
                  </div>
                </>
              )}

              {cakeCut && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 text-2xl"
                      initial={{
                        opacity: 0,
                        y: 10,
                        x: (i - 2.5) * 8,
                        scale: 0.6,
                      }}
                      animate={{
                        opacity: 1,
                        y: -40 - i * 6,
                        x: (i - 2.5) * 18,
                        scale: 1,
                      }}
                      transition={{ duration: 1.2 + i * 0.1, ease: 'easeOut' }}
                    >
                      {i % 2 === 0 ? '💖' : '✨'}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!cakeCut && (
            <>
              <motion.div
                className="text-center mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 font-semibold px-4"
                animate={{ scale: [1, 1.05, 1], y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Tap or drag your finger across the cake to slice it! 🎂
              </motion.div>
              {isTouchDevice && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={completeCut}
                  className="mx-auto mt-3 sm:mt-4 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm sm:text-base font-semibold rounded-full shadow-lg flex items-center gap-2"
                >
                  ✨ Slice it for me
                </motion.button>
              )}
            </>
          )}
        </div>

        {cakeCut && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              May all your wishes come true! ✨
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
