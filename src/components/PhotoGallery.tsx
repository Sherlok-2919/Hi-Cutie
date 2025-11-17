import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Heart, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const cardWidth = 320;
  const gap = 24;

  useEffect(() => {
    const controls = animate(x, -currentIndex * (cardWidth + gap), {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
    return controls.stop;
  }, [currentIndex, x]);

  const handleDragEnd = (_: any, info: any) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) > 500 || Math.abs(offset) > cardWidth / 2) {
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < 0 && currentIndex < photos.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const next = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                disabled={currentIndex === 0}
                className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                disabled={currentIndex === photos.length - 1}
                className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -(photos.length - 1) * (cardWidth + gap), right: 0 }}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              style={{ x }}
              className="flex gap-6 cursor-grab active:cursor-grabbing py-8"
            >
              {photos.map((photo, index) => {
                const isActive = index === currentIndex;
                
                return (
                  <motion.div
                    key={photo.id}
                    animate={{
                      scale: isActive ? 1.05 : 0.95,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 group"
                    style={{ width: cardWidth }}
                  >
                    <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                      {/* Image */}
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
                      
                      {/* Fallback gradient */}
                      <div className={`hidden absolute inset-0 bg-gradient-to-br ${photo.color} flex items-center justify-center`}>
                        <div className="text-8xl opacity-30">💝</div>
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-8 bg-pink-400 rounded-full" />
                            <div>
                              <h3 className="text-2xl font-bold">{photo.title}</h3>
                              <p className="text-sm text-pink-200">{photo.subtitle}</p>
                            </div>
                          </div>
                        </motion.div>

                        {/* Heart indicator */}
                        <motion.div
                          className="absolute top-4 right-4"
                          animate={{
                            scale: isActive ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }}
                        >
                          <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                        </motion.div>
                      </div>

                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group"
              >
                <motion.div
                  animate={{
                    width: index === currentIndex ? 32 : 8,
                    backgroundColor: index === currentIndex ? '#f472b6' : '#ffffff40',
                  }}
                  className="h-2 rounded-full transition-all"
                />
              </button>
            ))}
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
            Drag or use arrows to explore our beautiful memories 💝
          </p>
        </motion.div>
      </div>
    </section>
  );
}
