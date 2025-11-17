import { useState } from 'react';
import CakeSection from './CakeSection';
import PhotoGallery from './PhotoGallery';
import MessageCard from './MesseageCard';
import ScrollVideo from './ScrollVideo';
import ParallaxBackground from './ParallaxBackground';
import StaggeredHeading from './StaggeredHeading';
import MouseFollowConfetti from './MouseFollowConfetti';
import MusicPlayer from './MusicPlayer';
import Countdown from './Countdown';
import Scrapbook from './Scrapbook';
import FortuneCookies from './FortuneCookies';
import PolaroidBooth from './PolaroidBooth';
import CustomCursor from './CustomCursor';
import AmbientParticles from './AmbientParticles';
import EasterEggs from './EasterEggs';
import { motion, AnimatePresence } from 'framer-motion';

interface CelebrationPageProps {
  name: string;
}

export default function CelebrationPage({ name }: CelebrationPageProps) {
  const [cakeCut, setCakeCut] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Global Effects */}
      <CustomCursor />
      <EasterEggs />
      <AmbientParticles />
      
      {/* Mouse-follow confetti effect */}
      <MouseFollowConfetti />
      
      {/* Scroll-controlled background video */}
      <ScrollVideo videoSrc="/birthday-video.mp4" />
      
      {/* Parallax floating elements */}
      <ParallaxBackground />

      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 -left-16 w-80 h-80 bg-purple-300/40 blur-3xl rounded-full" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-300/40 blur-3xl rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-12 pb-8 px-4 relative z-10"
        >
          <StaggeredHeading
            text={`Happy Birthday, ${name}!`}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-700"
          >
            Today is all about celebrating you! 🎉
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <CakeSection onCakeCut={() => setCakeCut(true)} cakeCut={cakeCut} />

      <MusicPlayer />

      <PhotoGallery />

      <Countdown />

      <FortuneCookies />

      <Scrapbook />

      <PolaroidBooth />

      <MessageCard name={name} />
    </div>
  );
}
