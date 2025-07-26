
export interface AnimalData {
  slug: string;
  name: string;
  emoji: string;
  title: string;
  description: string;
  traits: string[];
  meditation: string;
  affirmation: string;
  quote: string;
  color: string;
  image?: string;
}

export const animalData: Record<string, AnimalData> = {
  wolf: {
    slug: "wolf",
    name: "Wolf",
    emoji: "🐺",
    title: "The Quiet Alpha",
    description: "You move through the world with silent strength and devotion. You protect others not with loud roars, but with deep presence. The wolf spirit represents loyalty, family bonds, and intuitive wisdom that comes from trusting your instincts.",
    traits: ["Loyal", "Protective", "Intuitive", "Strong", "Patient"],
    meditation: "Sit quietly and imagine yourself running with a pack through moonlit forests. Feel the connection to your chosen family and trust in your inner knowing.",
    affirmation: "I trust my instincts and protect what matters most",
    quote: "The strength of the pack is the wolf, and the strength of the wolf is the pack",
    color: "from-slate-400 to-gray-600"
  },
  owl: {
    slug: "owl",
    name: "Owl",
    emoji: "🦉",
    title: "The Quiet Seer",
    description: "You hold stillness like a superpower. You notice what others miss and protect what matters deeply. The owl spirit embodies ancient wisdom, silent observation, and the ability to see truth in darkness.",
    traits: ["Wise", "Observant", "Calm", "Intuitive", "Mysterious"],
    meditation: "In the quiet of evening, close your eyes and listen deeply. What wisdom is trying to reach you through the silence?",
    affirmation: "I see clearly through illusion and trust my inner wisdom",
    quote: "In the depth of silence, all answers are found",
    color: "from-amber-400 to-orange-600"
  },
  butterfly: {
    slug: "butterfly",
    name: "Butterfly",
    emoji: "🦋",
    title: "The Free Spirit",
    description: "You flutter through life with creativity and openness, inspiring others with your lightness of being. The butterfly represents transformation, beauty, and the courage to embrace change as a path to growth.",
    traits: ["Creative", "Adaptable", "Joyful", "Transformative", "Free"],
    meditation: "Visualize yourself emerging from a cocoon, spreading colorful wings. What new version of yourself is ready to take flight?",
    affirmation: "I embrace change as my path to beautiful transformation",
    quote: "What the caterpillar calls the end, the world calls a butterfly",
    color: "from-pink-400 to-purple-600"
  },
  dolphin: {
    slug: "dolphin",
    name: "Dolphin",
    emoji: "🐬",
    title: "The Joyful Healer",
    description: "You bring healing through laughter and connection. Your playful spirit lifts others and creates waves of positive energy. The dolphin embodies intelligence, emotional depth, and the power of community.",
    traits: ["Playful", "Intelligent", "Healing", "Social", "Joyful"],
    meditation: "Imagine swimming in warm, clear waters, surrounded by loving companions. Feel the joy of connection and shared laughter.",
    affirmation: "I heal others through my joy and authentic connection",
    quote: "Joy is the medicine that heals the deepest wounds",
    color: "from-blue-400 to-cyan-600"
  },
  elephant: {
    slug: "elephant",
    name: "Elephant",
    emoji: "🐘",
    title: "The Gentle Giant",
    description: "You carry ancient wisdom in your gentle soul. Your presence alone brings comfort and your memory holds the stories that matter. The elephant represents strength tempered by compassion and the importance of family legacy.",
    traits: ["Wise", "Gentle", "Strong", "Memory", "Compassionate"],
    meditation: "Stand tall like an ancient tree, feeling your roots deep in wisdom. What family stories and traditions do you carry forward?",
    affirmation: "I am strong yet gentle, carrying wisdom through generations",
    quote: "Strength without compassion is tyranny; compassion without strength is weakness",
    color: "from-gray-400 to-slate-600"
  },
  tiger: {
    slug: "tiger",
    name: "Tiger",
    emoji: "🐅",
    title: "The Fierce Dreamer",
    description: "You pursue your dreams with unstoppable courage and passion. Your inner fire lights the way for others to follow their own path. The tiger embodies raw power, determination, and the courage to stand alone when necessary.",
    traits: ["Courageous", "Passionate", "Independent", "Fierce", "Determined"],
    meditation: "Feel the fire in your belly, the power in your stride. What dreams are calling for your fierce dedication?",
    affirmation: "I pursue my dreams with unstoppable courage and passion",
    quote: "The fire within you is stronger than any storm around you",
    color: "from-orange-400 to-red-600"
  },
  rabbit: {
    slug: "rabbit",
    name: "Rabbit",
    emoji: "🐰",
    title: "The Swift Intuitive",
    description: "You navigate life with quick wit and keen intuition. Your gentle energy masks a sharp intelligence and surprising resilience. The rabbit represents fertility, luck, and the wisdom of knowing when to act swiftly.",
    traits: ["Quick", "Intuitive", "Gentle", "Lucky", "Clever"],
    meditation: "Sit in a meadow at dawn, feeling your connection to the earth's rhythms. What subtle messages is your intuition sending?",
    affirmation: "I trust my quick instincts and gentle strength",
    quote: "Sometimes the smallest step in the right direction is the biggest step of your life",
    color: "from-green-400 to-emerald-600"
  },
  tortoise: {
    slug: "tortoise",
    name: "Tortoise",
    emoji: "🐢",
    title: "The Patient Sage",
    description: "You understand that the most meaningful journeys take time. Your steady persistence and deep wisdom guide you to lasting success. The tortoise embodies patience, longevity, and the understanding that slow progress is still progress.",
    traits: ["Patient", "Wise", "Persistent", "Steady", "Enduring"],
    meditation: "Move slowly and deliberately, feeling each step. What important goal deserves your patient, steady attention?",
    affirmation: "I trust in the power of patience and steady progress",
    quote: "Slow and steady wins the race, but also enjoys the journey",
    color: "from-green-500 to-teal-600"
  },
  phoenix: {
    slug: "phoenix",
    name: "Phoenix",
    emoji: "🔥",
    title: "The Reborn Flame",
    description: "You are the rare soul who transforms pain into wisdom, darkness into light. Your spirit has been tested by fire and emerged more radiant than before. The phoenix represents rebirth, resilience, and the power to create beauty from ashes.",
    traits: ["Resilient", "Transformative", "Radiant", "Wise", "Inspiring"],
    meditation: "Feel the flames of transformation burning away what no longer serves you. What new version of yourself is ready to rise?",
    affirmation: "I rise stronger from every challenge, transformed and radiant",
    quote: "What burns you transforms you, what transforms you makes you radiant",
    color: "from-red-500 to-yellow-600"
  }
};

export const getAnimalBySlug = (slug: string): AnimalData | null => {
  return animalData[slug] || null;
};

export const getAllAnimalSlugs = (): string[] => {
  return Object.keys(animalData);
};
