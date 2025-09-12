import { useState, useEffect } from "react";

const compliments = [
  "Your smile makes my day brighter.",
  "You have the kindest heart I've ever seen.",
  "I love how you care about the little things.",
  "Your laugh is my favorite sound.",
  "You make simple moments feel special.",
  "You're creative and so thoughtful.",
  "I admire how strong and gentle you are.",
  "Talking to you is the highlight of my day.",
  "You've got a beautiful taste in anime (Kanade is perfect).",
  "I like you — more than I expected."
];

export default function ComplimentsPage() {
  const [currentCompliment, setCurrentCompliment] = useState(0);
  const [displayText, setDisplayText] = useState("Click the heart to see what makes you special! ✨");
  const [showCompliment, setShowCompliment] = useState(false);
  const [heartExploding, setHeartExploding] = useState(false);

  const showNextCompliment = () => {
    if (currentCompliment < compliments.length) {
      setShowCompliment(false);
      
      setTimeout(() => {
        setDisplayText(compliments[currentCompliment]);
        setShowCompliment(true);
        setCurrentCompliment(prev => prev + 1);
        
        // Special animation for final compliment
        if (currentCompliment === compliments.length - 1) {
          setTimeout(() => {
            setHeartExploding(true);
            setTimeout(() => setHeartExploding(false), 1000);
          }, 500);
        }
      }, 150);
    } else {
      // Reset
      setCurrentCompliment(0);
      setShowCompliment(false);
      setTimeout(() => {
        setDisplayText("Click the heart to see what makes you special! ✨");
        setShowCompliment(true);
      }, 150);
    }
  };

  useEffect(() => {
    setShowCompliment(true);
  }, []);

  return (
    <div className="text-center max-w-lg mx-auto relative">
      <h2 className="page-title">Things I Love About You</h2>
      
      <button
        data-testid="button-heart"
        onClick={showNextCompliment}
        className="w-24 h-24 border-none bg-gradient-to-br from-[var(--primary-rose)] to-pink-500 rounded-full cursor-pointer text-5xl text-white shadow-xl transition-all duration-300 mb-10 hover:transform hover:scale-110 hover:shadow-2xl"
      >
        💖
      </button>
      
      <div
        data-testid="compliment-display"
        className={`min-h-[100px] flex items-center justify-center text-xl font-dancing text-[var(--text-dark)] transition-all duration-500 ${
          showCompliment ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {displayText}
      </div>
      
      <p className="mt-8 text-[var(--text-muted)] text-sm">
        Compliment <span data-testid="compliment-counter">{currentCompliment}</span> of{" "}
        <span data-testid="total-compliments">{compliments.length}</span>
      </p>

      {heartExploding && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="heart-explode text-2xl"
              style={{
                left: '50%',
                top: '50%',
                animationDelay: `${i * 0.1}s`,
                transform: `translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`
              }}
            >
              💖
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
