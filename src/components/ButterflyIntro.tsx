
import React from 'react';
import { motion } from 'framer-motion';

interface ButterflyIntroProps {
  onComplete: () => void;
}

const ButterflyIntro = ({ onComplete }: ButterflyIntroProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-br from-pastel-pink/20 to-butterfly-blue/20 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center">
        {/* Butterfly Animation */}
        <motion.div
          className="text-8xl mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 1.1, 1],
            opacity: [0, 1, 1, 1],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.7, 1]
          }}
          onAnimationComplete={() => {
            setTimeout(() => {
              // Fly away animation
              const element = document.querySelector('.butterfly-fly');
              if (element) {
                element.classList.add('animate-fly-away');
              }
              setTimeout(onComplete, 1000);
            }, 1000);
          }}
        >
          <motion.span
            className="butterfly-fly inline-block"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: 3,
              ease: "easeInOut"
            }}
          >
            🦋
          </motion.span>
        </motion.div>

        {/* Typewriter Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-2xl font-quicksand text-midnight-wolf"
        >
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
            className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-pastel-pink"
          >
            what animal lives within you?
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ButterflyIntro;
