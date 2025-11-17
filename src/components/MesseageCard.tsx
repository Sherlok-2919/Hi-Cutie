import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Star } from 'lucide-react';

interface MessageCardProps {
  name: string;
}

export default function MessageCard({ name }: MessageCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleReveal = () => {
    setShowButton(false);
    setTimeout(() => setIsFlipped(true), 300);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {showButton && !isFlipped && (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center"
            >
              <motion.button
                onClick={handleReveal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl"
              >
                <Mail className="w-6 h-6" />
                Here's a message for you
                <Sparkles className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isFlipped && (
            <motion.div
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ perspective: 1000 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-pink-200 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    >
                      {i % 2 === 0 ? (
                        <Heart className="text-pink-400 w-4 h-4" fill="currentColor" />
                      ) : (
                        <Star className="text-purple-400 w-4 h-4" fill="currentColor" />
                      )}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative z-10"
                >
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      className="inline-block text-6xl mb-4"
                    >
                      💝
                    </motion.div>
                    <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                      Dear {name},
                    </h3>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4 text-gray-700 text-lg leading-relaxed"
                  >
                    <p>
                      On this special day, I want you to know how incredibly grateful I am
                      to have you in my life. Your smile brightens even the darkest days,
                      and your presence makes everything better.
                    </p>
                    <p>
                      Every moment we share is a treasure, every laugh is a melody,
                      and every memory we create together is a gift I'll cherish forever.
                    </p>
                    <p>
                      May this year bring you endless joy, beautiful surprises,
                      and all the happiness your heart can hold. You deserve nothing
                      but the very best, today and always.
                    </p>
                    <motion.p
                      className="text-xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 pt-4"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      Happy Birthday, Beautiful! 🎂✨
                    </motion.p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-right text-2xl font-semibold text-gray-600 italic"
                  >
                    With all my love 💕
                  </motion.div>
                </motion.div>

                {/* GIF decorations - peeking from behind the message card */}
                <div className="absolute -top-12 -right-12 z-0">
                  <motion.img
                    src="/gifs/1.gif"
                    className="w-20 md:w-24 drop-shadow-2xl rounded-lg"
                    alt="waving"
                    style={{ willChange: 'transform' }}
                    animate={{ 
                      y: [-6, 6, -6],
                      rotate: [-8, 8, -8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>

                <div className="absolute -bottom-10 -left-10 z-0">
                  <motion.img
                    src="/gifs/2.gif"
                    className="w-20 md:w-24 drop-shadow-2xl rounded-lg"
                    alt="blushing"
                    style={{ willChange: 'transform' }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [5, -5, 5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>

                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-0">
                  <motion.img
                    src="/gifs/3.gif"
                    className="w-24 md:w-28 drop-shadow-2xl rounded-lg"
                    alt="happy"
                    style={{ willChange: 'transform' }}
                    animate={{
                      y: [8, -8, 8],
                      scale: [1, 1.08, 1]
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>

                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-pink-400" />
                  </motion.div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Heart className="w-8 h-8 text-purple-400 fill-purple-400" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
