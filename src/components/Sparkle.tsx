
import { motion } from 'framer-motion';

interface SparkleProps {
  x: number;
  y: number;
  delay?: number;
}

const Sparkle = ({ x, y, delay = 0 }: SparkleProps) => {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-pastel-pink rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0.4, 1, 0.4],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default Sparkle;
