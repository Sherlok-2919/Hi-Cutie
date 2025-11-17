import { useState } from 'react';
import CakeSection from './sections/CakeSection';
import PhotoGallery from './sections/PhotoGallery';
import MessageCard from './sections/MesseageCard';
import ScrollVideo from './sections/ScrollVideo';
import ParallaxBackground from './sections/ParallaxBackground';
import StaggeredHeading from '../components/ui/StaggeredHeading';
import MouseFollowConfetti from './sections/MouseFollowConfetti';
import MusicPlayer from './sections/MusicPlayer';
import Countdown from './sections/Countdown';
import Scrapbook from './sections/Scrapbook';
import FortuneCookies from './sections/FortuneCookies';
import PolaroidBooth from './sections/PolaroidBooth';
import CustomCursor from './sections/CustomCursor';
import AmbientParticles from './sections/AmbientParticles';
import EasterEggs from './sections/EasterEggs';
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
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-500 to-fuchsia-600 drop-shadow-[0_10px_35px_rgba(244,114,182,0.45)] mb-4"
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
