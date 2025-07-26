// src/components/VisitorCounter.tsx

import React, { useEffect, useState } from 'react';

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(
          'https://api.api-ninjas.com/v1/counter?id=spirit-animal-visits&hit=true',
          {
            headers: {
              'X-Api-Key': 'nXMILqYZ+0rTdRGy8fra7w==6Z6medR89pJiXIvY', // ← Replace this
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch counter');

        const data = await response.json();
        setCount(data.value);
      } catch (error) {
        console.error('Visitor count error:', error);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <div className="text-sm text-gray-500">
      {count !== null
        ? `🌍 ${count} visitors have discovered their spirit animal!`
        : 'Loading visitor count...'}
    </div>
  );
};

export default VisitorCounter; // ✅ Default export
