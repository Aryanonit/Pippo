
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimalData } from '../data/animalData';
import html2canvas from 'html2canvas';

interface DownloadableCardProps {
  animal: AnimalData;
}

const DownloadableCard = ({ animal }: DownloadableCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        width: 600,
        height: 800,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true
      });

      const link = document.createElement('a');
      link.download = `${animal.name.toLowerCase()}-spirit-animal-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating card:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold text-midnight-wolf mb-6">
        Download Your Spirit Animal Card
      </h3>

      {/* Downloadable Card */}
      <div className="inline-block mb-6">
        <div
          ref={cardRef}
          className="w-[300px] h-[400px] p-8 rounded-3xl text-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${animal.color.replace('from-', 'rgba(').replace(' to-', ', 0.3), rgba(').replace(/\w+-(\d+)/g, '255, 255, 255')}, 0.1))`
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-2xl">✨</div>
            <div className="absolute top-4 right-4 text-2xl">🌙</div>
            <div className="absolute bottom-4 left-4 text-2xl">⭐</div>
            <div className="absolute bottom-4 right-4 text-2xl">💫</div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            {/* Animal Emoji */}
            <div className="text-6xl mb-4">
              {animal.emoji}
            </div>

            {/* Animal Name */}
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-midnight-wolf mb-2">
                {animal.name}
              </h2>
              <p className="text-sm text-midnight-wolf/80 mb-4 italic">
                {animal.title}
              </p>

              {/* Key Traits */}
              <div className="space-y-2">
                {animal.traits.slice(0, 3).map((trait, index) => (
                  <div
                    key={trait}
                    className="text-xs bg-white/40 rounded-full px-3 py-1 text-midnight-wolf font-medium"
                  >
                    {trait}
                  </div>
                ))}
              </div>
            </div>

            {/* Branding */}
            <div className="text-xs text-midnight-wolf/60 mt-4">
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
    </div>
  );
};

export default DownloadableCard;
