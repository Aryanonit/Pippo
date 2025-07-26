
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  const animals = ['🐺', '🦉', '🐬', '🦋', '🐘', '🐅', '🐰', '🐢'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="glass-card rounded-3xl p-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mx-auto mb-6 relative"
        >
          {animals.map((animal, index) => (
            <motion.div
              key={index}
              className="absolute text-2xl"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
              }}
              animate={{
                rotate: [0, 360],
                x: Math.cos((index * 2 * Math.PI) / animals.length) * 30 - 12,
                y: Math.sin((index * 2 * Math.PI) / animals.length) * 30 - 12,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.1,
              }}
            >
              {animal}
            </motion.div>
          ))}
        </motion.div>

        <motion.h3
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xl font-semibold text-midnight-wolf mb-4"
        >
          Connecting with your spirit...
        </motion.h3>

        <p className="text-midnight-wolf/70">
          The universe is revealing which animal guides your soul ✨
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
