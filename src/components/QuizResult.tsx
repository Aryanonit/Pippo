import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw, Heart, Share2, ExternalLink } from 'lucide-react';
import { journalPrompts } from '../utils/journalPrompts';
import AdBlock from './AdBlock';
import DonationButton from './DonationButton';
import { useNavigate } from 'react-router-dom';
import VisitorCounter from "@/components/VisitorCounter";

interface SpiritAnimal {
  animal: string;
  emoji: string;
  title: string;
  description: string;
  affirmations: string[];
}

interface QuizResultProps {
  result: SpiritAnimal;
  onRetake: () => void;
  onAdShown?: () => void;
  showAd?: boolean;
}

const QuizResult = ({ result, onRetake, onAdShown, showAd = true }: QuizResultProps) => {
  const navigate = useNavigate();
  const journalPrompt = journalPrompts[result.animal as keyof typeof journalPrompts];
  const animalSlug = result.animal.toLowerCase();

  const [showAdDelayed, setShowAdDelayed] = useState(false);

  // ✅ Delay ad appearance by 3 seconds
  useEffect(() => {
    if (!showAd) return;
    const timer = setTimeout(() => {
      setShowAdDelayed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showAd]);

  const handleShare = async () => {
    const text = `I just discovered my spirit animal is the ${result.animal} ${result.emoji} - ${result.title}! 🌟`;
    const url = `${window.location.origin}/animal/${animalSlug}`;

    try {
      if (navigator.share && navigator.canShare) {
        const shareData = { title: 'My Spirit Animal', text, url };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }
    } catch (error) {
      console.log('Web Share API failed, falling back to Twitter:', error);
    }

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleViewDetails = () => {
    navigate(`/animal/${animalSlug}`, { state: { fromResults: true } });
  };

  return (
    <>
      {/* ✅ Visitor Counter Section */}
      <div className="text-center mt-8">
        <VisitorCounter />
      </div>

      {/* ✅ Result Card */}
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 text-3xl opacity-20">✨</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-20">🌙</div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            {result.emoji}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-bold text-midnight-wolf mb-2"
          >
            {result.animal}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-pastel-pink font-medium mb-6"
          >
            {result.title}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-midnight-wolf/80 leading-relaxed mb-8"
          >
            {result.description.split(' ').map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-4 mb-8"
          >
            <h3 className="text-lg font-semibold text-midnight-wolf flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-pastel-pink" />
              You are...
            </h3>

            <div className="space-y-3">
              {result.affirmations.map((affirmation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  className="bg-white/30 rounded-2xl px-6 py-3 text-midnight-wolf font-medium"
                >
                  • {affirmation}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {journalPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mb-8 p-6 bg-white/20 rounded-2xl border border-white/30"
            >
              <h4 className="text-lg font-semibold text-midnight-wolf mb-3 flex items-center justify-center gap-2">
                📝 Journal Reflection
              </h4>
              <p className="text-midnight-wolf/80 italic leading-relaxed">
                {journalPrompt}
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Button
              onClick={onRetake}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-sage-green to-butterfly-blue text-midnight-wolf font-semibold hover:shadow-lg transition-all"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Discover Another Spirit
            </Button>

            <Button
              onClick={handleShare}
              variant="outline"
              className="px-8 py-3 rounded-full border-white/30 text-midnight-wolf hover:bg-white/20 transition-all"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share My Spirit
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="mb-4"
          >
            <Button
              onClick={handleViewDetails}
              variant="outline"
              className="px-6 py-2 rounded-full border-white/30 text-midnight-wolf hover:bg-white/20 transition-all"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Learn About {result.animal}
            </Button>
          </motion.div>
        </motion.div>

        {/* ✅ Show Ad after 3s */}
        {showAd && showAdDelayed && <AdBlock onAdShown={onAdShown} />}

        <DonationButton />
      </div>
    </>
  );
};

export default QuizResult;
