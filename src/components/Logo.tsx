
import * as React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  showReturnHome?: boolean;
  onReturnHome?: () => void;
}

const Logo = ({ showReturnHome = false, onReturnHome }: LogoProps) => {
  return (
    <div className="fixed top-6 left-6 z-40 flex items-center gap-4">
      {/* Logo Only */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer"
        onClick={onReturnHome}
      >
        <motion.img
          src="/Uploads/b5f30039-6994-47aa-893e-2684af70bf8d.png"
          alt="Pippo Logo"
          className="w-12 h-12 rounded-full shadow-lg"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Return Home Button */}
      {showReturnHome && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReturnHome}
          className="glass-card rounded-full px-4 py-2 text-midnight-wolf font-medium text-sm hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span>←</span>
          <span>Home</span>
        </motion.button>
      )}
    </div>
  );
};

export default Logo;
