
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SpiritAnimalCardProps {
  name: string;
  emoji: string;
  description: string;
  index: number;
  wisdom?: string;
}

const SpiritAnimalCard = ({ name, emoji, description, index, wisdom }: SpiritAnimalCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-card rounded-3xl p-8 text-center cursor-pointer group relative overflow-hidden"
    >
      {/* Floating emoji with animation */}
      <motion.div
        className="text-6xl mb-4 relative z-10"
        animate={{
          y: [0, -5, 0],
          rotate: isHovered ? [0, -10, 10, -10, 0] : [0, 2, -2, 0]
        }}
        transition={{ 
          duration: isHovered ? 0.5 : 4,
          repeat: isHovered ? 1 : Infinity,
          ease: "easeInOut"
        }}
      >
        {emoji}
      </motion.div>

      <h3 className="text-xl font-semibold text-midnight-wolf mb-2">{name}</h3>
      <p className="text-midnight-wolf/70 text-sm leading-relaxed mb-4">{description}</p>

      {/* Enhanced Hover wisdom tooltip with theme-matching colors */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.9
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-midnight-wolf font-medium text-sm bg-pastel-pink/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-pastel-pink/50"
        style={{ textShadow: '0 1px 2px rgba(62, 46, 77, 0.1)' }}
      >
        {wisdom || `You might carry the spirit of the ${name} ✨`}
      </motion.div>

      {/* Enhanced glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.15 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(251, 216, 245, 0.6) 0%, transparent 70%)'
        }}
      />
    </motion.div>
  );
};

export default SpiritAnimalCard;
