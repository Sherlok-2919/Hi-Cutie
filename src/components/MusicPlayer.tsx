import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <Music className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Our Song 🎵
          </h2>
          <p className="text-lg text-gray-600">
            The melody that plays in my heart when I think of you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/40"
        >
          {/* Vinyl Record */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                duration: 3,
                repeat: isPlaying ? Infinity : 0,
                ease: 'linear',
              }}
              className="relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-500" />
              <div className="absolute inset-0 rounded-full border-4 border-gray-700 opacity-20" />
            </motion.div>
          </div>

          <audio ref={audioRef} src="/our-song.mp3" loop />

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white flex items-center justify-center shadow-lg"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </motion.button>

            <p className="text-gray-600 text-sm italic">
              {isPlaying ? 'Playing our special song...' : 'Click to play our song'}
            </p>

            <div className="mt-4 text-center">
              <p className="text-gray-800 font-semibold text-lg">
                "Place your special song here"
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Add /our-song.mp3 to the public folder
              </p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce">
            🎵
          </div>
          <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>
            💕
          </div>
        </motion.div>
      </div>
    </section>
  );
}
