import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
}

export default function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const createPetals = () => {
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const petal: Petal = {
            id: Date.now() + i,
            left: Math.random() * 100,
            delay: Math.random() * 3,
          };
          
          setPetals(prev => [...prev, petal]);
          
          setTimeout(() => {
            setPetals(prev => prev.filter(p => p.id !== petal.id));
          }, 6000);
        }, i * 200);
      }
    };

    createPetals();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}
