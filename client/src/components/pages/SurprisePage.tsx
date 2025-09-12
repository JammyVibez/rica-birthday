import { useState, useEffect } from "react";

export default function SurprisePage() {
  const [giftRevealed, setGiftRevealed] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{ id: number; left: number; top: number }>>([]);

  const revealGift = () => {
    setGiftRevealed(true);
    createSparkles();
  };

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setSparkles(newSparkles);
    
    setTimeout(() => setSparkles([]), 2000);
  };

  return (
    <div className="text-center max-w-2xl mx-auto relative">
      <h2 className="page-title">Click for your gift 🎁</h2>
      
      {!giftRevealed && (
        <button
          data-testid="button-gift"
          onClick={revealGift}
          className="w-36 h-36 border-none bg-gradient-to-br from-[var(--accent-gold)] to-[var(--primary-rose)] rounded-2xl cursor-pointer text-6xl text-white shadow-2xl transition-all duration-300 mb-10 hover:transform hover:rotate-6 hover:scale-105"
        >
          🎁
        </button>
      )}
      
      {giftRevealed && (
        <div
          data-testid="gift-reveal"
          className={`bg-gradient-to-br from-[var(--primary-cream)] to-white rounded-2xl p-10 shadow-2xl border-2 border-[var(--accent-gold)] transition-all duration-500 ${
            giftRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="font-dancing text-xl leading-relaxed text-[var(--text-dark)]">
            Rica, I don't have money to buy you something fancy for your birthday… but I still wanted to give you something from the heart. So I made you a gift I hope you'll never forget. It may not cost anything, but it has all my effort and care in it. I hope it makes you smile the way you make me smile. 💖
          </div>
        </div>
      )}

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle-effect text-2xl absolute"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}
