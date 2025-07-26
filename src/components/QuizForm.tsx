
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: { value: string; label: string; emoji: string }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you recharge when life feels overwhelming?",
    options: [
      { value: "alone", label: "Spending time alone in silence", emoji: "🌙" },
      { value: "social", label: "Being around people I trust, having fun", emoji: "🌊" },
      { value: "reflect", label: "Reflecting and journaling or meditating", emoji: "🌸" },
      { value: "action", label: "Getting active, taking bold action", emoji: "🌞" }
    ]
  },
  {
    id: 2,
    question: "What's your deepest strength?",
    options: [
      { value: "loyalty", label: "Loyalty and emotional depth", emoji: "🐺" },
      { value: "creativity", label: "Creativity and adaptability", emoji: "🦋" },
      { value: "wisdom", label: "Wisdom and calm presence", emoji: "🐘" },
      { value: "courage", label: "Courage and assertiveness", emoji: "🐅" }
    ]
  },
  {
    id: 3,
    question: "What makes you feel most at peace?",
    options: [
      { value: "nature", label: "Being surrounded by nature and stillness", emoji: "🌿" },
      { value: "creating", label: "Creating or imagining something new", emoji: "🎨" },
      { value: "connection", label: "Deep conversation with a loved one", emoji: "💬" },
      { value: "leading", label: "Leading, protecting, or taking action", emoji: "🔥" }
    ]
  },
  {
    id: 4,
    question: "How do you handle challenges?",
    options: [
      { value: "reflect", label: "I reflect and look inward before acting", emoji: "🧘" },
      { value: "optimistic", label: "I stay optimistic and go with the flow", emoji: "🤗" },
      { value: "direct", label: "I face them head-on, fast and fearless", emoji: "💪" },
      { value: "steady", label: "I take steady, thoughtful steps over time", emoji: "🐢" }
    ]
  },
  {
    id: 5,
    question: "What role do you play in your social circle?",
    options: [
      { value: "protector", label: "The protector and loyal guardian", emoji: "🛡️" },
      { value: "creative", label: "The imaginative and expressive one", emoji: "🎭" },
      { value: "wise", label: "The wise, grounded listener", emoji: "🧓" },
      { value: "motivator", label: "The motivator and bold decision-maker", emoji: "🔥" }
    ]
  },
  {
    id: 6,
    question: "What do you crave most in life?",
    options: [
      { value: "connection", label: "Emotional safety and deep connections", emoji: "🧿" },
      { value: "freedom", label: "Freedom to explore and be myself", emoji: "🧚" },
      { value: "peace", label: "Stillness, patience, and quiet purpose", emoji: "🧘‍♂️" },
      { value: "achievement", label: "Achievement, excitement, and power", emoji: "🏹" }
    ]
  }
];

interface QuizFormProps {
  onComplete: (answers: string[]) => void;
}

const QuizForm = ({ onComplete }: QuizFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const handleNext = () => {
    if (!selectedAnswer) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (currentQuestion === quizQuestions.length - 1) {
      onComplete([...newAnswers, selectedAnswer]);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1] || '');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-midnight-wolf/60 mb-2">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-pastel-pink to-butterfly-blue h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-3xl p-8"
      >
        <h2 className="text-2xl font-semibold text-midnight-wolf mb-8 text-center">
          {question.question}
        </h2>

        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-4 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setSelectedAnswer(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex items-center gap-3 cursor-pointer flex-1 text-midnight-wolf"
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-lg">{option.label}</span>
                </Label>
              </motion.div>
            ))}
          </div>
        </RadioGroup>

        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="px-6 py-3 rounded-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pastel-pink to-butterfly-blue text-midnight-wolf font-semibold hover:shadow-lg transition-all"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Get My Spirit Animal' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizForm;
