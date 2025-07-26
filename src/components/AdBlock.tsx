
import React from 'react';
import { motion } from 'framer-motion';

interface AdBlockProps {
  onAdShown?: () => void;
}

const AdBlock = ({ onAdShown }: AdBlockProps) => {
  React.useEffect(() => {
    onAdShown?.();
  }, [onAdShown]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 p-4 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm"
    >
      <div className="text-xs text-midnight-wolf/50 mb-2 text-center">Sponsored</div>
      <div className="text-center p-6 text-midnight-wolf/70">
        <div className="text-sm mb-2">✨ Discover More About Yourself</div>
        <div className="text-xs leading-relaxed">
          Your spirit animal is just the beginning. Explore deeper personality insights 
          and spiritual guidance to unlock your full potential.
        </div>
        <div className="mt-3 text-xs text-pastel-pink hover:text-butterfly-blue transition-colors cursor-pointer">
          Learn More →
        </div>
      </div>
    </motion.div>
  );
};

export default AdBlock;
