import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import FloatingAnimal from '../components/FloatingAnimal';
import SpiritAnimalCard from '../components/SpiritAnimalCard';
import SpiritAnimalQuiz from '../components/SpiritAnimalQuiz';
import Sparkle from '../components/Sparkle';
import ButterflyIntro from '../components/ButterflyIntro';
import Logo from '../components/Logo';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import SpiritualParticles from '../components/SpiritualParticles';
import BackgroundMusic from '../components/BackgroundMusic';

const spiritAnimals = [
  {
    name: "Wolf",
    emoji: "🐺",
    description: "Independent and intuitive, you trust your instincts and value deep connections.",
    wisdom: "You carry the loyalty of the pack and the wisdom of solitude"
  },
  {
    name: "Dolphin", 
    emoji: "🐬",
    description: "Playful and intelligent, you bring joy and healing wherever you flow.",
    wisdom: "Your heart flows with compassion and playful wisdom"
  },
  {
    name: "Owl",
    emoji: "🦉", 
    description: "Wise and observant, you see through illusions and embrace the night.",
    wisdom: "Ancient wisdom flows through your quiet observations"
  },
  {
    name: "Tiger",
    emoji: "🐅",
    description: "Fierce and passionate, you pursue your dreams with unstoppable courage.",
    wisdom: "Your inner fire burns bright with unstoppable determination"
  },
  {
    name: "Butterfly",
    emoji: "🦋",
    description: "Transformative and graceful, you embrace change as beautiful growth.",
    wisdom: "You dance through life's transformations with ethereal grace"
  },
  {
    name: "Eagle",
    emoji: "🦅",
    description: "Visionary and free, you soar above challenges with clear perspective.",
    wisdom: "Your spirit soars with the clarity of mountain peaks"
  },
  {
    name: "Fox",
    emoji: "🦊",
    description: "Clever and adaptable, you navigate life with wit and charm.",
    wisdom: "Your cleverness is matched only by your gentle charm"
  },
  {
    name: "Turtle",
    emoji: "🐢",
    description: "Patient and grounded, you carry ancient wisdom in your gentle soul.",
    wisdom: "Time moves differently for souls as wise as yours"
  }
];

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleBackToHome = () => {
    setShowQuiz(false);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen sparkle-bg overflow-hidden">
      {/* Logo - Always visible */}
      <Logo 
        showReturnHome={showQuiz} 
        onReturnHome={handleBackToHome}
      />

      {/* Background Music Controls */}
      <BackgroundMusic />

      <AnimatePresence mode="wait">
        {/* Butterfly Intro */}
        {showIntro && (
          <ButterflyIntro key="intro" onComplete={handleIntroComplete} />
        )}

        {/* Quiz Flow */}
        {showQuiz && !showIntro && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            {/* Floating Sparkles */}
            <div className="fixed inset-0 pointer-events-none">
              <Sparkle x={10} y={20} delay={0} />
              <Sparkle x={80} y={30} delay={1} />
              <Sparkle x={20} y={70} delay={2} />
              <Sparkle x={90} y={60} delay={0.5} />
              <Sparkle x={50} y={10} delay={1.5} />
              <Sparkle x={70} y={80} delay={2.5} />
            </div>

            {/* Quiz Content */}
            <section className="min-h-screen flex items-center justify-center px-6 py-20">
              <SpiritAnimalQuiz />
            </section>
          </motion.div>
        )}

        {/* Main Homepage */}
        {!showQuiz && !showIntro && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Floating Sparkles */}
            <div className="fixed inset-0 pointer-events-none">
              <Sparkle x={10} y={20} delay={0} />
              <Sparkle x={80} y={30} delay={1} />
              <Sparkle x={20} y={70} delay={2} />
              <Sparkle x={90} y={60} delay={0.5} />
              <Sparkle x={50} y={10} delay={1.5} />
              <Sparkle x={70} y={80} delay={2.5} />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6">
              {/* Enhanced Floating Animals with tooltips */}
              <FloatingAnimal 
                emoji="🐺" 
                delay={0} 
                x={10} 
                y={20} 
                tooltip="The loyal guardian of the soul"
              />
              <FloatingAnimal 
                emoji="🦋" 
                delay={1} 
                x={85} 
                y={15} 
                tooltip="The transformer of dreams"
              />
              <FloatingAnimal 
                emoji="🦉" 
                delay={2} 
                x={15} 
                y={70} 
                tooltip="The keeper of ancient wisdom"
              />
              <FloatingAnimal 
                emoji="🐬" 
                delay={0.5} 
                x={80} 
                y={75} 
                tooltip="The healer of hearts"
              />
              <FloatingAnimal 
                emoji="🦊" 
                delay={1.5} 
                x={5} 
                y={45} 
                tooltip="The clever navigator"
              />
              <FloatingAnimal 
                emoji="🦅" 
                delay={2.5} 
                x={90} 
                y={40} 
                tooltip="The visionary of heights"
              />
              <FloatingAnimal 
                emoji="🐅" 
                delay={3} 
                x={25} 
                y={25} 
                tooltip="The fierce protector"
              />
              <FloatingAnimal 
                emoji="🐢" 
                delay={3.5} 
                x={75} 
                y={60} 
                tooltip="The patient sage"
              />

              <div className="text-center max-w-4xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold text-midnight-wolf mb-6 leading-tight"
                >
                  What Animal Lives in{' '}
                  <span className="text-transparent bg-gradient-to-r from-pastel-pink to-butterfly-blue bg-clip-text">
                    Your Soul?
                  </span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-xl md:text-2xl text-midnight-wolf/80 mb-12 leading-relaxed font-light"
                >
                  Your spirit animal reflects your hidden patterns, your light and your shadows. 
                  Discover the gentle creature that guides your heart's deepest wisdom.
                </motion.p>
                
                {/* Enhanced CTA Button with glow */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartQuiz}
                  className="bg-gradient-to-r from-pastel-pink to-butterfly-blue text-midnight-wolf px-12 py-6 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto relative overflow-hidden group"
                >
                  {/* Pulsing glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pastel-pink/50 to-butterfly-blue/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="relative z-10">✨ Find your spirit animal</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </section>

            {/* Meet the Spirits Section */}
            <section className="py-20 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-midnight-wolf mb-6">
                    Meet the <span className="text-sage-green">Spirits</span> 🐾
                  </h2>
                  <p className="text-lg text-midnight-wolf/70 max-w-2xl mx-auto">
                    Each spirit animal carries ancient wisdom and unique gifts. 
                    Which one calls to your soul?
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {spiritAnimals.map((animal, index) => (
                    <SpiritAnimalCard
                      key={animal.name}
                      name={animal.name}
                      emoji={animal.emoji}
                      description={animal.description}
                      wisdom={animal.wisdom}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Enhanced What is a Spirit Animal Section */}
            <section className="py-20 px-6 relative">
              {/* Background Particles */}
              <div className="absolute inset-0 overflow-hidden">
                <SpiritualParticles />
              </div>

              {/* Floating Paw Print Watermark */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-5 text-8xl pointer-events-none"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                🐾
              </motion.div>

              <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
                >
                  {/* Glowing background effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 30%, rgba(251, 216, 245, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 70%, rgba(201, 233, 246, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 40% 60%, rgba(216, 234, 214, 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 30%, rgba(251, 216, 245, 0.1) 0%, transparent 50%)',
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4 text-2xl opacity-60"
                  >
                    🍃
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-3xl font-bold text-midnight-wolf mb-8"
                  >
                    What is a Spirit Animal? 🌿
                  </motion.h3>

                  {/* Enhanced Typewriter Text */}
                  <div className="text-lg text-midnight-wolf/80 leading-relaxed">
                    <TypewriterText
                      text="A spirit animal is more than a symbol—it's a reflection of your deepest self. It represents the qualities you embody, the strengths you carry, and the wisdom your soul has gathered through countless experiences. Your spirit animal is a gentle guide, whispering truths about who you are when the world gets quiet and you listen to your heart."
                      delay={1000}
                      speed={30}
                    />
                  </div>

                  {/* Floating spirit trails */}
                  <motion.div
                    className="absolute bottom-4 left-4 text-lg opacity-30"
                    animate={{
                      x: [0, 20, 0],
                      y: [0, -10, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/2 right-6 text-lg opacity-30"
                    animate={{
                      x: [0, -15, 0],
                      y: [0, 15, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    🦋
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Enhanced CTA Section */}
            <section className="py-20 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-4xl font-bold text-midnight-wolf mb-8">
                    Ready to Meet Your Soul Companion? ✨
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartQuiz}
                    className="bg-gradient-to-r from-sage-green to-butterfly-blue text-midnight-wolf px-16 py-8 rounded-full text-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-4 mx-auto group relative overflow-hidden"
                  >
                    {/* Animated sparkle */}
                    <motion.div
                      animate={{ rotate: [0, 180, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-8 h-8" />
                    </motion.div>
                    Begin the Soul Quiz
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="py-16 px-6 border-t border-white/20">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-2 text-midnight-wolf/60 mb-6"
                >
                  <span>Made with spirit</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-lg"
                  >
                    🐺
                  </motion.span>
                  <span>by Pippo</span>
                </motion.div>
                
                {/* Buy me a chai section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <p className="text-sm text-midnight-wolf/70 mb-4">
                    🫶 Enjoyed your spirit journey?
                  </p>
                  <motion.a
                    href="https://buymeacoffee.com/AWARAALU"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pastel-pink/50 to-sage-green/50 text-midnight-wolf font-medium hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/30"
                  >
                    <Heart className="w-4 h-4" />
                    Buy me a chai 🍵
                  </motion.a>
                </motion.div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
