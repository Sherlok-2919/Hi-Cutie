import { useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';

interface StickerPosition {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export default function Scrapbook() {
  const availableStickers = ['🎈', '💖', '✨', '🎂', '🌸', '🎉', '⭐', '🎁', '💝', '🦋', '🌈', '🎪'];
  const [placedStickers, setPlacedStickers] = useState<StickerPosition[]>([]);
  const [nextId, setNextId] = useState(0);

  const addSticker = (emoji: string) => {
    setPlacedStickers([
      ...placedStickers,
      {
        id: nextId,
        emoji,
        x: Math.random() * 300,
        y: Math.random() * 200,
      },
    ]);
    setNextId(nextId + 1);
  };

  const updateStickerPosition = (id: number, info: PanInfo) => {
    setPlacedStickers(
      placedStickers.map((sticker) =>
        sticker.id === id
          ? { ...sticker, x: sticker.x + info.delta.x, y: sticker.y + info.delta.y }
          : sticker
      )
    );
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Digital Scrapbook 📖✨
          </h2>
          <p className="text-lg text-gray-600">
            Decorate this page with stickers and make it yours!
          </p>
        </motion.div>

        {/* Sticker Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
        >
          {availableStickers.map((emoji) => (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addSticker(emoji)}
              className="text-4xl cursor-pointer hover:drop-shadow-lg transition-all"
            >
              {emoji}
            </motion.button>
          ))}
        </motion.div>

        {/* Scrapbook Page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-pink-200"
          style={{
            minHeight: '600px',
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 207, 232, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(199, 210, 254, 0.3), transparent 50%)',
          }}
        >
          {/* Notebook lines effect */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-px bg-gray-400"
                style={{ marginTop: '30px' }}
              />
            ))}
          </div>

          {/* Placed stickers */}
          {placedStickers.map((sticker) => (
            <motion.div
              key={sticker.id}
              drag
              dragMomentum={false}
              onDragEnd={(_, info) => updateStickerPosition(sticker.id, info)}
              initial={{ scale: 0 }}
              animate={{ scale: 1, x: sticker.x, y: sticker.y }}
              whileHover={{ scale: 1.3, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="absolute text-5xl cursor-move select-none"
              style={{ touchAction: 'none' }}
            >
              {sticker.emoji}
            </motion.div>
          ))}

          {/* Instructions */}
          {placedStickers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-400 text-xl text-center px-4">
                Click stickers above to add them, then drag to arrange! 🎨
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
