import { motion } from 'framer-motion';
import { Heart, Camera } from 'lucide-react';

export default function PhotoGallery() {
  const photos = [
    { id: 1, src: '/photos/1.jpg', title: 'Beautiful Moments', subtitle: 'Our Journey Together', color: 'from-pink-400 to-rose-400' },
    { id: 2, src: '/photos/2.jpg', title: 'Sweet Memories', subtitle: 'Every Smile Counts', color: 'from-purple-400 to-pink-400' },
    { id: 3, src: '/photos/3.jpg', title: 'Special Days', subtitle: 'Treasured Forever', color: 'from-blue-400 to-purple-400' },
    { id: 4, src: '/photos/4.jpg', title: 'Happy Times', subtitle: 'With You Always', color: 'from-rose-400 to-pink-400' },
    { id: 5, src: '/photos/5.jpg', title: 'Pure Joy', subtitle: 'Endless Laughter', color: 'from-pink-400 to-purple-400' },
    { id: 6, src: '/photos/6.jpg', title: 'Magical Moments', subtitle: 'You & Me', color: 'from-purple-400 to-blue-400' },
    { id: 7, src: '/photos/7.jpg', title: 'Golden Memories', subtitle: 'Time Stands Still', color: 'from-blue-400 to-pink-400' },
    { id: 8, src: '/photos/8.jpg', title: 'Forever Us', subtitle: 'Side by Side', color: 'from-rose-400 to-purple-400' },
    { id: 9, src: '/photos/9.jpg', title: 'Love Story', subtitle: 'Our Adventure', color: 'from-pink-400 to-blue-400' },
    { id: 10, src: '/photos/10.jpg', title: 'Always & Forever', subtitle: 'Chapter Ten', color: 'from-purple-400 to-amber-400' },
    { id: 11, src: '/photos/11.jpg', title: 'Always & Forever', subtitle: 'Chapter Eleven', color: 'from-purple-400 to-amber-400' },
  ];

  const rows = [photos, [...photos].reverse()];
  const marqueeDuration = 28;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white relative">
      {/* Floating GIFs in gallery */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-16 right-4 md:right-12 pointer-events-none z-30"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/2.gif"
          className="w-20 md:w-28 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded-lg"
          alt="blushing"
          animate={{ y: [-12, 12, -12], rotate: [6, -6, 6] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-16 left-4 md:left-12 pointer-events-none z-30"
        style={{ willChange: 'transform' }}
      >
        <motion.img
          src="/gifs/1.gif"
          className="w-20 md:w-28 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded-lg"
          alt="waving"
          animate={{ y: [-10, 10, -10], scale: [1, 1.06, 1] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-10 h-10 text-pink-400" />
            <h2 className="text-5xl md:text-6xl font-bold">
              Our Memories
            </h2>
            <Heart className="w-10 h-10 text-pink-400 fill-pink-400" />
          </div>
          <p className="text-xl text-pink-200">
            Every moment with you is special ✨
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-lg p-4 sm:p-8 shadow-2xl">
            {/* Top glow */}
            <div className="absolute inset-x-0 top-6 sm:top-10 h-20 sm:h-24 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-70 pointer-events-none" />

            {/* Endless carousel */}
            <div className="space-y-8">
              {[...rows].map((row, rowIndex) => {
                const direction = rowIndex % 2 === 0 ? ['0%', '-50%'] : ['-50%', '0%'];
                const duration = marqueeDuration + rowIndex * 6;

                return (
                  <motion.div
                    key={rowIndex}
                    className="flex gap-8 w-max"
                    animate={{ x: direction }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'loop',
                      duration,
                      ease: 'linear',
                    }}
                  >
                    {[...row, ...row].map((photo, index) => (
                      <div
                        key={`${rowIndex}-${index}-${photo.id}`}
                        className="group relative flex-shrink-0 w-56 sm:w-64 md:w-72 h-[360px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/20"
                      >
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.classList.remove('hidden');
                          }}
                        />
                        <div className={`hidden absolute inset-0 bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
                          <div className="text-8xl opacity-30">💝</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                        <div className="absolute inset-x-0 bottom-0 p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-10 bg-pink-400 rounded-full" />
                            <div>
                              <h3 className="text-2xl font-bold">{photo.title}</h3>
                              <p className="text-sm text-pink-200">{photo.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-xs text-white/60 uppercase tracking-[0.2em]">
                            Infinite Moments
                          </p>
                        </div>

                        <div className="absolute top-4 right-4">
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
                          >
                            <Heart className="w-6 h-6 text-pink-400 fill-pink-400 drop-shadow-lg" />
                          </motion.div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-white/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-pink-200 italic"
        >
          <p className="text-lg">
            Infinity loop keeps our sweetest snaps flowing endlessly 💝
          </p>
        </motion.div>
      </div>
    </section>
  );
}
