
import { motion } from 'framer-motion';

interface FloatingAnimalProps {
  emoji: string;
  delay?: number;
  x?: number;
  y?: number;
  size?: string;
  tooltip?: string;
}

const FloatingAnimal = ({ 
  emoji, 
  delay = 0, 
  x = 0, 
  y = 0, 
  size = "text-4xl",
  tooltip
}: FloatingAnimalProps) => {
  return (
    <motion.div
      className={`absolute ${size} select-none cursor-pointer group`}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: 1.2,
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 }
      }}
      whileTap={{ scale: 0.9 }}
    >
      {emoji}
      
      {/* Tooltip */}
      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-midnight-wolf font-medium shadow-lg border border-white/50 whitespace-nowrap pointer-events-none"
        >
          {tooltip}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FloatingAnimal;
