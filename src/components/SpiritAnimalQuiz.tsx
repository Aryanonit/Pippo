
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuizForm from './QuizForm';
import QuizResult from './QuizResult';
import LoadingSpinner from './LoadingSpinner';
import { useSpiritAnimalAPI } from '../hooks/useSpiritAnimalAPI';

interface SpiritAnimal {
  animal: string;
  emoji: string;
  title: string;
  description: string;
  affirmations: string[];
}

const SpiritAnimalQuiz = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'loading' | 'result'>('intro');
  const [result, setResult] = useState<SpiritAnimal | null>(null);
  const [adsShown, setAdsShown] = useState(0);
  const { getSpiritAnimal, loading, error } = useSpiritAnimalAPI();

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = async (answers: string[]) => {
    setCurrentStep('loading');
    
    try {
      const spiritAnimal = await getSpiritAnimal(answers);
      setResult(spiritAnimal);
      setCurrentStep('result');
    } catch (err) {
      console.error('Error getting spirit animal:', err);
      // Handle error - maybe show error message and return to quiz
    }
  };

  const handleRetake = () => {
    setResult(null);
    setCurrentStep('intro');
  };

  const handleAdShown = () => {
    setAdsShown(prev => prev + 1);
  };

  if (currentStep === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="glass-card rounded-3xl p-12">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            ✨
          </motion.div>
          
          <h2 className="text-3xl font-bold text-midnight-wolf mb-6">
            Ready to Meet Your Soul Companion?
          </h2>
          
          <p className="text-lg text-midnight-wolf/70 mb-8 leading-relaxed">
            Answer 6 gentle questions about your inner world, and we'll reveal 
            which spirit animal guides your heart's deepest wisdom.
          </p>
          
          <motion.button
            onClick={handleStartQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-pastel-pink to-butterfly-blue text-midnight-wolf px-12 py-6 rounded-full text-xl font-semibold shadow-2xl spirit-glow hover:shadow-3xl transition-all duration-300"
          >
            Begin Your Journey ✨
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (currentStep === 'quiz') {
    return <QuizForm onComplete={handleQuizComplete} />;
  }

  if (currentStep === 'loading') {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="glass-card rounded-3xl p-12">
          <motion.h3
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xl font-semibold text-midnight-wolf mb-6"
          >
            Letting the spirits whisper...
          </motion.h3>
          <LoadingSpinner />
          <p className="text-midnight-wolf/70 mt-4">
            The universe is revealing your soul's companion ✨
          </p>
        </div>
      </div>
    );
  }

  if (currentStep === 'result' && result) {
    return (
      <QuizResult 
        result={result} 
        onRetake={handleRetake}
        showAd={adsShown < 2}
        onAdShown={handleAdShown}
      />
    );
  }

  return null;
};

export default SpiritAnimalQuiz;
