
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, Facebook, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimalData } from '../data/animalData';

interface SocialShareProps {
  animal: AnimalData;
}

const SocialShare = ({ animal }: SocialShareProps) => {
  const [copiedCaption, setCopiedCaption] = useState(false);
  
  const pageUrl = `https://pippo.app/animal/${animal.slug}`;
  
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

  return (
    <div className="glass-card rounded-3xl p-8">
      <h3 className="text-xl font-semibold text-midnight-wolf mb-6 text-center">
        Share Your Spirit Animal ✨
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="mt-6 p-4 bg-white/20 rounded-2xl border border-white/30"
      >
        <p className="text-sm text-midnight-wolf/70 mb-2">Preview:</p>
        <p className="text-midnight-wolf text-sm italic">
          "{twitterText}"
        </p>
      </motion.div>
    </div>
  );
};

export default SocialShare;
