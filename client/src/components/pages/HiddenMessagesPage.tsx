
import { useState, useEffect } from "react";

interface HiddenMessage {
  id: string;
  emoji: string;
  title: string;
  message: string;
  unlocked: boolean;
}

const hiddenMessages: HiddenMessage[] = [
  {
    id: "star",
    emoji: "⭐",
    title: "First Star",
    message: "You shine brighter than any star in the sky. Your smile lights up my entire world.",
    unlocked: false
  },
  {
    id: "flower",
    emoji: "🌸",
    title: "Cherry Blossom",
    message: "Like sakura petals, you bring beauty and grace to every moment we share.",
    unlocked: false
  },
  {
    id: "heart",
    emoji: "💖",
    title: "Hidden Heart",
    message: "Every day I discover something new to love about you. You're amazing, Rica.",
    unlocked: false
  },
  {
    id: "moon",
    emoji: "🌙",
    title: "Moonlight Secret",
    message: "Even in the darkest nights, thinking of you makes everything bright again.",
    unlocked: false
  },
  {
    id: "butterfly",
    emoji: "🦋",
    title: "Butterfly Whisper",
    message: "You've transformed my world in the most beautiful way, just like a butterfly's metamorphosis.",
    unlocked: false
  }
];

export default function HiddenMessagesPage() {
  const [messages, setMessages] = useState<HiddenMessage[]>(hiddenMessages);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("hidden-messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  const unlockMessage = (id: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, unlocked: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem("hidden-messages", JSON.stringify(updatedMessages));
    
    // Show sparkles animation
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 2000);
  };

  const unlockedCount = messages.filter(m => m.unlocked).length;

  return (
    <div className="max-w-2xl mx-auto relative">
      <h2 className="page-title">Hidden Messages 💌</h2>
      <p className="subtitle mb-8">
        Find and unlock secret notes! ({unlockedCount}/{messages.length} found)
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
              message.unlocked 
                ? 'bg-gradient-to-br from-[var(--accent-gold)] to-[var(--primary-rose)] text-white shadow-xl' 
                : 'bg-gradient-to-br from-[var(--primary-cream)] to-[var(--primary-lavender)] hover:shadow-lg hover:scale-105'
            }`}
            onClick={() => !message.unlocked && unlockMessage(message.id)}
            data-testid={`hidden-message-${message.id}`}
          >
            <div className="text-4xl mb-2">{message.emoji}</div>
            <div className="text-center px-4">
              {message.unlocked ? (
                <span className="font-semibold">{message.title}</span>
              ) : (
                <span className="text-sm opacity-70">Click to unlock</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Unlocked Messages */}
      <div className="space-y-4">
        {messages.filter(m => m.unlocked).map((message) => (
          <div
            key={`unlocked-${message.id}`}
            className="bg-gradient-to-br from-white to-[var(--primary-cream)] rounded-2xl p-6 shadow-lg border-l-4 border-[var(--accent-gold)]"
            data-testid={`unlocked-message-${message.id}`}
          >
            <h4 className="flex items-center gap-2 text-[var(--primary-rose)] font-semibold mb-3">
              {message.emoji} {message.title}
            </h4>
            <p className="text-[var(--text-dark)] leading-relaxed font-dancing text-lg">
              {message.message}
            </p>
          </div>
        ))}
      </div>

      {/* Sparkles Effect */}
      {showSparkles && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
