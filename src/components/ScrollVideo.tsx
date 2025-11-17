import { useEffect, useRef } from 'react';

interface ScrollVideoProps {
  videoSrc: string;
  className?: string;
}

export default function ScrollVideo({ videoSrc, className = '' }: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Ensure video is loaded
    video.load();

    const handleCanPlay = () => {
      video?.play().catch(() => {
        /* ignore autoplay block */
      });
    };

    const handleWheel = (event: WheelEvent) => {
      if (!video || !video.duration) return;

      const scrollSpeed = 0.0012;
      const targetTime = video.currentTime + event.deltaY * scrollSpeed;
      video.currentTime = Math.max(0, Math.min(video.duration, targetTime));
    };
    video.addEventListener('canplay', handleCanPlay);

    // Listen to scroll events
    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <div ref={containerRef} className={`fixed inset-0 -z-10 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/3 to-white/20 backdrop-blur-[0.3px]" />
    </div>
  );
}
