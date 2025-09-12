import { useEffect, useState } from "react";

interface Firework {
  id: number;
  left: number;
  top: number;
}

export default function Fireworks() {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const createFireworks = () => {
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          const firework: Firework = {
            id: Date.now() + i,
            left: Math.random() * 100,
            top: Math.random() * 100,
          };
          
          setFireworks(prev => [...prev, firework]);
          
          setTimeout(() => {
            setFireworks(prev => prev.filter(f => f.id !== firework.id));
          }, 3000);
        }, i * 400);
      }
    };

    createFireworks();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="firework-particle"
          style={{
            left: `${firework.left}%`,
            top: `${firework.top}%`,
          }}
        >
          🎆
        </div>
      ))}
    </div>
  );
}
