
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Hide controls after 10 seconds of no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Hidden audio element - You'll need to add your audio file */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        onEnded={() => setIsPlaying(false)}
      >
        {/* You would add your audio source here */}
        {/* <source src="/path-to-your-nature-sounds.mp3" type="audio/mpeg" /> */}
      </audio>

      {/* Music Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40"
            onMouseEnter={() => setShowControls(true)}
          >
            <div className="glass-card rounded-full p-3 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-pastel-pink/20 transition-colors"
                title={isPlaying ? "Pause ambient sounds" : "Play ambient sounds"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-midnight-wolf" />
                ) : (
                  <Play className="w-4 h-4 text-midnight-wolf" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-pastel-pink/20 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-midnight-wolf" />
                ) : (
                  <Volume2 className="w-4 h-4 text-midnight-wolf" />
                )}
              </motion.button>

              {/* Nature sound indicator */}
              <motion.div
                animate={{ 
                  scale: isPlaying ? [1, 1.1, 1] : 1,
                  opacity: isPlaying ? [0.7, 1, 0.7] : 0.5
                }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                className="text-sm text-midnight-wolf/70"
              >
                🍃
              </motion.div>
            </div>

            {/* Floating music note when playing */}
            {isPlaying && (
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.7, 1, 0.7],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-lg">🎵</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show controls on hover area */}
      <div
        className="fixed bottom-0 right-0 w-32 h-32 z-30"
        onMouseEnter={() => setShowControls(true)}
      />
    </>
  );
};

export default BackgroundMusic;
