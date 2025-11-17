import { useEffect, useRef, useState } from 'react';
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#ec4899');
  const [penSize, setPenSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
  }, [penColor, penSize]);

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
  const getCanvasPoint = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in event
      ? event.touches[0]
      : ('changedTouches' in event ? event.changedTouches[0] : event);
    return {
      x: point.clientX - rect.left,
      y: point.clientY - rect.top,
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    const ctx = canvasRef.current?.getContext('2d');
    const point = getCanvasPoint(event);
    if (!ctx || !point) return;
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    setIsDrawing(true);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    event.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    const point = getCanvasPoint(event);
    if (!ctx || !point) return;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 sm:mb-3">
            Digital Scrapbook 📖✨
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Decorate this page with stickers and make it yours!
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4 mb-6 sm:mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            {availableStickers.map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addSticker(emoji)}
                className="text-3xl sm:text-4xl cursor-pointer hover:drop-shadow-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {emoji}
              </motion.button>
            ))}
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center gap-3 sm:gap-4 justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <label className="font-semibold text-gray-600 uppercase tracking-wide text-xs">
                Pen Color
              </label>
              <input
                type="color"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="pen-size" className="font-semibold text-gray-600 uppercase tracking-wide text-xs">
                Pen Size
              </label>
              <input
                id="pen-size"
                type="range"
                min={2}
                max={12}
                step={1}
                value={penSize}
                onChange={(e) => setPenSize(Number(e.target.value))}
                className="accent-pink-500"
              />
              <span className="text-gray-500 w-6 text-right">{penSize}px</span>
            </div>
            <button
              onClick={clearCanvas}
              className="px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-md"
            >
              Clear Pen
            </button>
          </div>
        </motion.div>

        {/* Scrapbook Page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 sm:border-8 border-pink-200"
          style={{
            minHeight: '400px',
            height: 'clamp(400px, 60vh, 600px)',
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

          {/* Pen canvas */}
          <canvas
            ref={canvasRef}
            width={1100}
            height={700}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
            onTouchCancel={endDrawing}
          />

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
              className="absolute text-4xl sm:text-5xl cursor-move select-none"
              style={{ touchAction: 'none' }}
            >
              {sticker.emoji}
            </motion.div>
          ))}

          {/* Instructions */}
          {placedStickers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-400 text-base sm:text-lg md:text-xl text-center px-4">
                Click stickers above to add them, then drag to arrange! 🎨
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
