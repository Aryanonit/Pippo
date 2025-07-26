
import { useState } from 'react';
import { checkForPhoenix, getPhoenixResult } from '../utils/phoenixLogic';

interface SpiritAnimal {
  animal: string;
  emoji: string;
  title: string;
  description: string;
  affirmations: string[];
}

// Dummy responses for now - we'll replace with real API later
const dummyResults: SpiritAnimal[] = [
  {
    animal: "Wolf",
    emoji: "🐺",
    title: "The Quiet Alpha",
    description: "You move through the world with silent strength and devotion. You protect others not with loud roars, but with deep presence.",
    affirmations: [
      "Loyal without needing attention",
      "A protector with deep intuition", 
      "Gentle but never weak"
    ]
  },
  {
    animal: "Owl",
    emoji: "🦉",
    title: "The Quiet Seer",
    description: "You hold stillness like a superpower. You notice what others miss and protect what matters deeply.",
    affirmations: [
      "Wise beyond your years",
      "Calm under pressure",
      "You see through illusion"
    ]
  },
  {
    animal: "Butterfly",
    emoji: "🦋",
    title: "The Free Spirit",
    description: "You flutter through life with creativity and openness, inspiring others with your lightness of being.",
    affirmations: [
      "Playful and adaptable",
      "Creative without fear",
      "hopeful in dark times"
    ]
  },
  {
    animal: "Dolphin",
    emoji: "🐬",
    title: "The Joyful Healer",
    description: "You bring healing through laughter and connection. Your playful spirit lifts others and creates waves of positive energy.",
    affirmations: [
      "Naturally uplifting to others",
      "Intelligent and emotionally aware",
      "You find joy in simple moments"
    ]
  },
  {
    animal: "Elephant",
    emoji: "🐘",
    title: "The Gentle Giant",
    description: "You carry ancient wisdom in your gentle soul. Your presence alone brings comfort and your memory holds the stories that matter.",
    affirmations: [
      "Strong yet infinitely gentle",
      "A keeper of precious memories",
      "You lead with compassion"
    ]
  },
  {
    animal: "Tiger",
    emoji: "🐅",
    title: "The Fierce Dreamer",
    description: "You pursue your dreams with unstoppable courage and passion. Your inner fire lights the way for others to follow their own path.",
    affirmations: [
      "Courageous in pursuing dreams",
      "A natural born leader",
      "You inspire others to be brave"
    ]
  },
  {
    animal: "Rabbit",
    emoji: "🐰",
    title: "The Swift Intuitive",
    description: "You navigate life with quick wit and keen intuition. Your gentle energy masks a sharp intelligence and surprising resilience.",
    affirmations: [
      "Quick to sense what others miss",
      "Gentle strength that endures",
      "You bring luck wherever you go"
    ]
  },
  {
    animal: "Tortoise",
    emoji: "🐢",
    title: "The Patient Sage",
    description: "You understand that the most meaningful journeys take time. Your steady persistence and deep wisdom guide you to lasting success.",
    affirmations: [
      "Patient with yourself and others",
      "Wise in the art of persistence",
      "You know that slow and steady wins"
    ]
  }
];

export const useSpiritAnimalAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSpiritAnimal = async (answers: string[]): Promise<SpiritAnimal> => {
    setLoading(true);
    setError(null);

    try {
      // Check for Phoenix trigger first
      if (checkForPhoenix(answers)) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        setLoading(false);
        return getPhoenixResult();
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For now, return a random result based on answers
      // Later we'll replace this with actual Gemini API call
      const randomIndex = Math.floor(Math.random() * dummyResults.length);
      const result = dummyResults[randomIndex];
      
      setLoading(false);
      return result;
      
    } catch (err) {
      setError('Unable to connect with your spirit animal. Please try again.');
      setLoading(false);
      throw err;
    }
  };

  // Future Gemini API implementation
  const getSpiritAnimalFromGemini = async (answers: string[]): Promise<SpiritAnimal> => {
    const prompt = `Based on these personality answers:\n\n${answers.map(
      (ans, i) => `${i + 1}. ${ans}`
    ).join('\n')}

Choose the most aligned spirit animal from the following list:
Wolf, Owl, Dolphin, Butterfly, Elephant, Tiger, Rabbit, Tortoise.

Return the result in this exact JSON format:
{
  "animal": "Wolf",
  "emoji": "🐺", 
  "title": "The Quiet Alpha",
  "description": "You move through the world with silent strength and devotion. You protect others not with loud roars, but with deep presence.",
  "affirmations": [
    "Loyal without needing attention",
    "A protector with deep intuition",
    "Gentle but never weak"
  ]
}`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const result = await response.json();
    const content = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(content);
  };

  return {
    getSpiritAnimal,
    getSpiritAnimalFromGemini,
    loading,
    error
  };
};
