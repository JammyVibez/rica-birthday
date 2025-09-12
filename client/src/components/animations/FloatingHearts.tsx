import { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number;
  delay: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const heart: Heart = {
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
          };
          
          setHearts(prev => [...prev, heart]);
          
          setTimeout(() => {
            setHearts(prev => prev.filter(h => h.id !== heart.id));
          }, 4000);
        }, i * 300);
      }
    };

    createHearts();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}
