import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Camera, VideoOff } from 'lucide-react';

type CameraStatus = 'idle' | 'loading' | 'ready' | 'error';

export default function PolaroidBooth() {
  const [captured, setCaptured] = useState(false);
  const [imageData, setImageData] = useState<string>('');
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    if (cameraStatus === 'loading') return;

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setErrorMessage('Your browser does not support camera access.');
      setCameraStatus('error');
      return;
    }

    setErrorMessage('');
    setCameraStatus('loading');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1080 } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCaptured(false);
      setImageData('');
      setCameraStatus('ready');
    } catch (error) {
      console.error('Unable to start camera', error);
      setErrorMessage('Camera permission is required to take a photo. Please allow access and try again.');
      setCameraStatus('error');
    }
  }, [cameraStatus]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const captureMemory = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const width = video.videoWidth || 720;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, width, height);
    const imgData = canvas.toDataURL('image/png');
    setImageData(imgData);
    setCaptured(true);
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
            <div className="bg-white/95 p-4 pb-14 shadow-2xl rounded-[32px] w-full max-w-sm sm:max-w-md">
              <div
                id="capture-area"
                className="aspect-square bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center relative overflow-hidden rounded-2xl border border-white/70"
              >
                {!captured && cameraStatus === 'ready' ? (
                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : captured ? (
                  <img
                    src={imageData}
                    alt="Captured memory"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8 text-gray-700 space-y-4">
                    <VideoOff className="w-12 h-12 mx-auto text-pink-400" />
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Camera access needed</h3>
                      <p className="text-sm leading-relaxed">
                        Tap&nbsp;
                        <span className="font-semibold text-pink-500">Enable Camera</span>
                        &nbsp;below and allow the permission prompt to take your photo.
                      </p>
                    </div>
                    {errorMessage && (
                      <p className="text-sm text-rose-500 font-medium">{errorMessage}</p>
                    )}
                  </div>
                )}
                {cameraStatus === 'loading' && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-2 text-sm">
                    <div className="h-10 w-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
                    Connecting to your camera...
                  </div>
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
          <div className="flex flex-wrap gap-4 justify-center">
            {cameraStatus !== 'ready' && !captured && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startCamera}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg flex items-center gap-2"
              >
                <Camera size={20} />
                {cameraStatus === 'loading' ? 'Requesting Access...' : 'Enable Camera'}
              </motion.button>
            )}

            {cameraStatus === 'ready' && !captured && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={captureMemory}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full shadow-lg flex items-center gap-2"
              >
                <Camera size={20} />
                Capture Photo
              </motion.button>
            )}

            {captured && (
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
