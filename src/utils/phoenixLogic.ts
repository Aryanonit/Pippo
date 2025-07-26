
interface SpiritAnimal {
  animal: string;
  emoji: string;
  title: string;
  description: string;
  affirmations: string[];
}

const PHOENIX_TRIGGER_KEYWORDS = [
  "I reflect and look inward before acting",
  "Loyalty and emotional depth", 
  "Spending time alone in silence",
  "Emotional safety and deep connections"
];

export const checkForPhoenix = (answers: string[]): boolean => {
  // Check for 3+ emotional depth keywords
  const emotionalMatches = answers.filter(answer => 
    PHOENIX_TRIGGER_KEYWORDS.some(keyword => answer.includes(keyword))
  ).length;
  
  // Trigger if 3+ matches OR rare 3% chance
  return emotionalMatches >= 3 || Math.random() < 0.03;
};

export const getPhoenixResult = (): SpiritAnimal => ({
  animal: "Phoenix",
  emoji: "🔥",
  title: "The Reborn Flame",
  description: "You are the rare soul who transforms pain into wisdom, darkness into light. Your spirit has been tested by fire and emerged more radiant than before.",
  affirmations: [
    "You rise stronger from every challenge",
    "Your scars are proof of your resilience", 
    "You inspire others through your transformation"
  ]
});
