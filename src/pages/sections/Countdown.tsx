import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const calculateTimeLeft = (): TimeLeft => {
    const nextBirthday = new Date();
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    nextBirthday.setMonth(10); // November (0-indexed)
    nextBirthday.setDate(16);
    nextBirthday.setHours(0, 0, 0, 0);

    const difference = nextBirthday.getTime() - new Date().getTime();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBoxes = [
    { value: timeLeft.days, label: 'Days', color: 'from-pink-400 to-rose-400' },
    { value: timeLeft.hours, label: 'Hours', color: 'from-purple-400 to-pink-400' },
    { value: timeLeft.minutes, label: 'Minutes', color: 'from-blue-400 to-purple-400' },
    { value: timeLeft.seconds, label: 'Seconds', color: 'from-rose-400 to-pink-400' },
  ];

  return (
    <section className="py-16 px-4 bg-white/50 backdrop-blur-sm relative">
      {/* Floating GIFs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-12 left-4 md:left-8 pointer-events-none z-30"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/1.gif"
          className="w-20 md:w-24 drop-shadow-2xl rounded-lg"
          alt="waving"
          animate={{ y: [-8, 8, -8], rotate: [-6, 6, -6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute bottom-12 right-4 md:right-8 pointer-events-none z-30"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/2.gif"
          className="w-20 md:w-24 drop-shadow-2xl rounded-lg"
          alt="blushing"
          animate={{ y: [-10, 10, -10], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Calendar className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Counting Down to Your Next Special Day
          </h2>
          <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
            Can't wait to celebrate you again <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeBoxes.map((box, index) => (
            <motion.div
              key={box.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${box.color} rounded-2xl p-6 shadow-xl text-white`}
            >
              <motion.div
                key={box.value}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
                className="text-5xl md:text-6xl font-bold mb-2 text-center"
              >
                {String(box.value).padStart(2, '0')}
              </motion.div>
              <div className="text-sm md:text-base font-semibold text-center uppercase tracking-wider opacity-90">
                {box.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-600 text-lg italic"
        >
          Every moment with you is worth the wait 💝
        </motion.p>
      </div>
    </section>
  );
}
