
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AnimalPageLinkProps {
  animalSlug: string;
  animalName: string;
  className?: string;
}

const AnimalPageLink = ({ animalSlug, animalName, className = "" }: AnimalPageLinkProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/animal/${animalSlug}`);
  };

  return (
    <Button
      onClick={handleViewDetails}
      variant="outline"
      className={`rounded-full border-white/30 text-midnight-wolf hover:bg-white/20 transition-all ${className}`}
    >
      <ExternalLink className="w-4 h-4 mr-2" />
      Learn About {animalName}
    </Button>
  );
};

export default AnimalPageLink;
