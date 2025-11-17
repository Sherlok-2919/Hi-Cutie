import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function PolaroidBooth() {
  const [captured, setCaptured] = useState(false);
  const [imageData, setImageData] = useState<string>('');

  const captureMemory = async () => {
    const element = document.getElementById('capture-area');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
      });

      const imgData = canvas.toDataURL('image/png');
      setImageData(imgData);
      setCaptured(true);
    } catch (error) {
      console.error('Capture failed:', error);
    }
  };

  const downloadPhoto = () => {
    const link = document.createElement('a');
    link.download = `birthday-memory-${Date.now()}.png`;
    link.href = imageData;
    link.click();
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Camera className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Polaroid Photo Booth 📸
          </h2>
          <p className="text-lg text-gray-600">
            Capture this special moment in a vintage polaroid frame!
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          {/* Polaroid Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white p-4 pb-16 shadow-2xl" style={{ width: '400px' }}>
              <div
                id="capture-area"
                className="aspect-square bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center relative overflow-hidden"
              >
                {!captured ? (
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Happy Birthday!
                    </h3>
                    <p className="text-gray-600">
                      This is your special day
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      Customize this area with your content!
                    </div>
                  </div>
                ) : (
                  <img
                    src={imageData}
                    alt="Captured memory"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="font-handwriting text-gray-700 text-lg">
                  {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex gap-4">
            {!captured ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={captureMemory}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg flex items-center gap-2"
              >
                <Camera size={20} />
                Capture Photo
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCaptured(false);
                    setImageData('');
                  }}
                  className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-full shadow-lg"
                >
                  Retake
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadPhoto}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg flex items-center gap-2"
                >
                  <Download size={20} />
                  Download
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
