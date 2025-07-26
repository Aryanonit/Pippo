
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const DonationButton = () => {
  const handleDonation = () => {
    console.log('Donation button clicked'); // Debug log
    try {
      window.open('https://buymeacoffee.com/AWARAALU', '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening donation link:', error);
      // Fallback: try direct navigation
      window.location.href = 'https://buymeacoffee.com/AWARAALU';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="mt-8 text-center"
    >
      <p className="text-sm text-midnight-wolf/70 mb-4">
        💖 Loved your spirit result? Support the creator
      </p>
      <motion.button
        onClick={handleDonation}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pastel-pink/50 to-sage-green/50 text-midnight-wolf font-medium hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/30 cursor-pointer"
      >
        <Heart className="w-4 h-4" />
        Buy me a chai 🍵
      </motion.button>
    </motion.div>
  );
};

export default DonationButton;
