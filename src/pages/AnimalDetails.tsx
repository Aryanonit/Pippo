
import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, Twitter, Facebook, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAnimalBySlug } from '../data/animalData';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

const AnimalDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const animal = slug ? getAnimalBySlug(slug) : null;
  
  // Check if we came from results (when location state has fromResults flag)
  const fromResults = location.state?.fromResults;

  if (!animal) {
    return (
      <div className="min-h-screen sparkle-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-midnight-wolf mb-4">Animal not found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </div>
    );
  }

  const pageUrl = `${window.location.origin}/animal/${animal.slug}`;
  const twitterText = `My spirit animal is the ${animal.name} ${animal.emoji} – ${animal.title.toLowerCase()}. Find yours on Pippo ✨ → ${pageUrl}`;
  const instagramCaption = `Spirit Animal: ${animal.name} ${animal.emoji} – ${animal.title}. What's yours? #pippo #spiritanimal #${animal.slug}energy #spiritualjourney`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(instagramCaption);
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } catch (err) {
      console.error('Failed to copy caption:', err);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    
    try {
      // Wait a bit for any animations to complete
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        width: 300,
        height: 400,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        logging: false,
        onclone: (clonedDoc) => {
          // Ensure fonts are loaded in the cloned document
          const clonedElement = clonedDoc.querySelector('[data-card-ref]') as HTMLElement;
          if (clonedElement) {
            clonedElement.style.fontFamily = 'system-ui, -apple-system, sans-serif';
          }
        }
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${animal.name.toLowerCase().replace(/\s+/g, '-')}-spirit-animal-card.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Card download successful');
    } catch (error) {
      console.error('Error generating card:', error);
      alert('Sorry, there was an error generating your card. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackClick = () => {
    if (fromResults) {
      // Go back to previous page (results)
      navigate(-1);
    } else {
      // Go to homepage
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen sparkle-bg">
      {/* Header with Back Button */}
      <div className="fixed top-6 left-6 z-40">
        <Button
          onClick={handleBackClick}
          variant="outline"
          className="rounded-full bg-white/80 backdrop-blur-md border-white/50 hover:bg-white/90"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {fromResults ? 'Back to Results' : 'Back to Quiz'}
        </Button>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-8xl mb-6"
            >
              {animal.emoji}
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-midnight-wolf mb-4">
              {animal.name}
            </h1>
            
            <p className="text-xl text-pastel-pink font-medium mb-8">
              {animal.title}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              {/* Traits */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-midnight-wolf mb-4 flex items-center">
                  ✨ Your Traits
                </h3>
                <div className="flex flex-wrap gap-3">
                  {animal.traits.map((trait, index) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="px-4 py-2 bg-white/40 rounded-full text-midnight-wolf font-medium"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Meditation */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-midnight-wolf mb-4 flex items-center">
                  🧘‍♀️ Meditation
                </h3>
                <p className="text-midnight-wolf/80 leading-relaxed italic">
                  {animal.meditation}
                </p>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              {/* Description */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-midnight-wolf mb-4 flex items-center">
                  💡 Your Spirit
                </h3>
                <p className="text-midnight-wolf/80 leading-relaxed">
                  {animal.description}
                </p>
              </div>

              {/* Affirmation */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-midnight-wolf mb-4 flex items-center">
                  🪞 Affirmation
                </h3>
                <p className="text-lg text-midnight-wolf font-medium italic text-center">
                  "{animal.affirmation}"
                </p>
              </div>

              {/* Quote */}
              <div className="glass-card rounded-3xl p-8">
                <h3 className="text-xl font-semibold text-midnight-wolf mb-4 flex items-center">
                  🪶 Sacred Wisdom
                </h3>
                <p className="text-lg text-midnight-wolf/80 italic text-center">
                  "{animal.quote}"
                </p>
              </div>
            </motion.div>
          </div>

          {/* Downloadable Card Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-xl font-semibold text-midnight-wolf mb-6">
              Download Your Spirit Animal Card
            </h3>

            {/* Downloadable Card */}
            <div className="inline-block mb-6">
              <div
                ref={cardRef}
                data-card-ref
                className="w-[300px] h-[400px] p-6 rounded-2xl text-center relative overflow-hidden bg-gradient-to-br from-pastel-pink/20 to-butterfly-blue/15 border-2 border-white/30"
                style={{
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-4 left-4 text-2xl">✨</div>
                  <div className="absolute top-4 right-4 text-2xl">🌙</div>
                  <div className="absolute bottom-4 left-4 text-2xl">⭐</div>
                  <div className="absolute bottom-4 right-4 text-2xl">💫</div>
                </div>

                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Animal Emoji */}
                  <div className="text-6xl mb-4 leading-none">
                    {animal.emoji}
                  </div>

                  {/* Animal Name and Title */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-midnight-wolf mb-2 leading-tight">
                      {animal.name}
                    </h2>
                    <p className="text-sm text-midnight-wolf/70 mb-4 italic leading-snug">
                      {animal.title}
                    </p>

                    {/* Key Traits */}
                    <div className="space-y-2">
                      {animal.traits.slice(0, 3).map((trait) => (
                        <div
                          key={trait}
                          className="text-xs bg-white/50 rounded-full px-3 py-1 text-midnight-wolf font-medium inline-block mx-1"
                        >
                          {trait}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Branding */}
                  <div className="text-xs text-midnight-wolf/50 mt-4 font-medium">
                    via pippo.app ✨
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pastel-pink to-butterfly-blue text-midnight-wolf font-semibold hover:shadow-lg transition-all"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Card
                </>
              )}
            </Button>
          </motion.div>

          {/* Social Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold text-midnight-wolf mb-6 text-center">
              Share Your Spirit Animal ✨
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              {/* Twitter Share */}
              <Button
                onClick={handleTwitterShare}
                className="flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all"
              >
                <Twitter className="w-5 h-5" />
                Share on Twitter
              </Button>

              {/* Facebook Share */}
              <Button
                onClick={handleFacebookShare}
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
              >
                <Facebook className="w-5 h-5" />
                Share on Facebook
              </Button>

              {/* Instagram Caption Copy */}
              <Button
                onClick={handleCopyCaption}
                variant="outline"
                className="flex items-center gap-3 px-6 py-3 rounded-full border-pastel-pink text-midnight-wolf hover:bg-pastel-pink/20 transition-all"
              >
                {copiedCaption ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy for Instagram
                  </>
                )}
              </Button>
            </div>

            {/* Preview of what will be shared */}
            <div className="p-4 bg-white/20 rounded-2xl border border-white/30">
              <p className="text-sm text-midnight-wolf/70 mb-2">Preview:</p>
              <p className="text-midnight-wolf text-sm italic">
                "{twitterText}"
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
