import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, Heart } from 'lucide-react';
import MagneticButton from '../components/ui/MagneticButton';

interface LandingPageProps {
  onSubmit: (name: string) => void;
}

export default function LandingPage({ onSubmit }: LandingPageProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [topGifOnCard, setTopGifOnCard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    const normalized = trimmed.toUpperCase();

    if (normalized === 'ANKITA') {
      setError('');
      onSubmit('Ankita');
    } else {
      setError('That name is not the secret word. Try "Ankita" ✨');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-3 sm:p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: -50,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 800,
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="text-pink-300 w-4 h-4 sm:w-6 sm:h-6 opacity-40" fill="currentColor" />
            ) : i % 3 === 1 ? (
              <Sparkles className="text-yellow-300 w-4 h-4 sm:w-6 sm:h-6 opacity-40" />
            ) : (
              <Gift className="text-purple-300 w-4 h-4 sm:w-6 sm:h-6 opacity-40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating GIFs around the form */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden sm:block absolute top-1/4 left-4 md:left-24 pointer-events-none z-0"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/1.gif"
          className="w-24 sm:w-32 md:w-40 drop-shadow-2xl rounded-lg"
          alt="waving"
          animate={{ y: [-12, 12, -12], rotate: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="hidden sm:block absolute bottom-1/4 right-4 md:right-24 pointer-events-none z-0"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/2.gif"
          className="w-24 sm:w-32 md:w-40 drop-shadow-2xl rounded-lg"
          alt="blushing"
          animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Special GIF: starts behind the card, ends up on top of the card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: -40 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.8 }}
        onAnimationComplete={() => setTopGifOnCard(true)}
        className={`absolute left-1/2 -translate-x-1/2 pointer-events-none ${
          topGifOnCard ? 'z-30' : 'z-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/1.gif"
          className="w-20 sm:w-28 md:w-32 drop-shadow-2xl rounded-lg"
          alt="waving on card"
          animate={{
            rotate: [-6, 6, -6],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(244,114,182,0.4)] p-6 sm:p-8 md:p-12 max-w-md w-full relative z-10 border border-pink-100"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="inline-block text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            A Special Day!
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Someone has prepared a tiny magical world just for you.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-3 text-center text-base sm:text-lg">
              What's your name?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg border-2 border-pink-200 rounded-2xl bg-pink-50/40 focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-400 transition-all duration-300 text-center font-medium placeholder:text-pink-300"
              placeholder="Enter your name"
              required
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center text-sm font-medium text-pink-500"
            >
              {error}
            </motion.p>
          )}

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <MagneticButton
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg touch:active:scale-95"
            >
              Let's Celebrate! 🎊
            </MagneticButton>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-sm text-gray-500"
        >
          Get ready for something magical ✨
        </motion.div>
      </motion.div>
    </div>
  );
}
