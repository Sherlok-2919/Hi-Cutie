import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Fortune {
  id: number;
  message: string;
}

export default function FortuneCookies() {
  const fortunes: Fortune[] = [
    { id: 1, message: "Your smile is the most beautiful thing I've ever seen 😊" },
    { id: 2, message: 'Every moment with you is a treasure 💎' },
    { id: 3, message: 'You make the world a better place just by being in it 🌍' },
    { id: 4, message: 'Your kindness touches everyone around you 💕' },
    { id: 5, message: 'You are my sunshine on the cloudiest days ☀️' },
    { id: 6, message: 'Together, we can conquer anything 🚀' },
    { id: 7, message: 'Your laughter is my favorite sound 🎵' },
    { id: 8, message: 'You inspire me to be better every day 🌟' },
    { id: 9, message: 'With you, every day is an adventure 🗺️' },
  ];

  const [crackedCookies, setCrackedCookies] = useState<Set<number>>(new Set());

  const crackCookie = (id: number) => {
    setCrackedCookies(new Set([...crackedCookies, id]));
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Fortune Cookies 🥠
          </h2>
          <p className="text-lg text-gray-600">
            Click each cookie to reveal a special message just for you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fortunes.map((fortune) => (
            <motion.div
              key={fortune.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: fortune.id * 0.1 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {!crackedCookies.has(fortune.id) ? (
                  <motion.div
                    key="cookie"
                    exit={{ scale: 0, rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => crackCookie(fortune.id)}
                    className="cursor-pointer text-center p-6 sm:p-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="text-7xl sm:text-8xl mb-4">🥠</div>
                    <p className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                      Tap to open
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="fortune"
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 sm:p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl shadow-xl min-h-[240px] flex items-center justify-center"
                  >
                    <div className="text-center space-y-4">
                      <div className="text-5xl sm:text-6xl">✨</div>
                      <p className="text-gray-800 text-xl sm:text-2xl font-bold leading-relaxed tracking-tight">
                        {fortune.message}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {crackedCookies.size === fortunes.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              You've discovered all the fortunes! 💖
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
