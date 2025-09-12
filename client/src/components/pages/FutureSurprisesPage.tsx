
import { useState, useEffect } from "react";

interface Surprise {
  id: string;
  title: string;
  message: string;
  date: string;
  revealed: boolean;
}

const defaultSurprises: Surprise[] = [
  {
    id: "1",
    title: "Monthly Letter",
    message: "Rica, it's been another amazing month getting to know you better. Here's what made me smile this month...",
    date: new Date().toLocaleDateString(),
    revealed: false
  },
  {
    id: "2", 
    title: "Random Thoughts",
    message: "I was thinking about you today and realized how much brighter my days have become since we started talking. Thank you for being you! 💖",
    date: new Date().toLocaleDateString(),
    revealed: false
  }
];

export default function FutureSurprisesPage() {
  const [surprises, setSurprises] = useState<Surprise[]>(defaultSurprises);
  const [secretCode, setSecretCode] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newSurprise, setNewSurprise] = useState({
    title: "",
    message: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("future-surprises");
    if (saved) {
      setSurprises(JSON.parse(saved));
    }
  }, []);

  const saveSurprises = (updatedSurprises: Surprise[]) => {
    localStorage.setItem("future-surprises", JSON.stringify(updatedSurprises));
    setSurprises(updatedSurprises);
  };

  const revealSurprise = (id: string) => {
    const updatedSurprises = surprises.map(s => 
      s.id === id ? { ...s, revealed: true } : s
    );
    saveSurprises(updatedSurprises);
  };

  const addSurprise = () => {
    if (newSurprise.title && newSurprise.message) {
      const surprise: Surprise = {
        ...newSurprise,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        revealed: false
      };
      saveSurprises([...surprises, surprise]);
      setNewSurprise({ title: "", message: "" });
      setIsAdding(false);
    }
  };

  const checkSecretCode = () => {
    // Secret codes to reveal surprises
    const codes = {
      "RICA": "1",
      "ANGEL": "2", 
      "BIRTHDAY": "3"
    };
    
    const surpriseId = codes[secretCode.toUpperCase() as keyof typeof codes];
    if (surpriseId) {
      revealSurprise(surpriseId);
      setSecretCode("");
    } else {
      alert("Hmm, that's not the right code. Try something related to you or Angel Beats! 💫");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="page-title">Future Surprises 🎁</h2>
      <p className="subtitle mb-8">New messages appear here from time to time...</p>
      
      {/* Secret Code Input */}
      <div className="bg-gradient-to-br from-[var(--primary-lavender)] to-[var(--primary-sky)] rounded-2xl p-6 mb-8 text-white text-center">
        <h3 className="text-xl font-semibold mb-4">🔮 Secret Code Portal</h3>
        <p className="mb-4 opacity-90">Enter a secret code to unlock hidden surprises!</p>
        <div className="flex gap-3 max-w-sm mx-auto">
          <input
            type="text"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Enter code..."
            className="flex-1 p-3 rounded-xl text-gray-800 focus:outline-none"
            data-testid="secret-code-input"
          />
          <button
            onClick={checkSecretCode}
            className="px-6 py-3 bg-white text-[var(--primary-rose)] rounded-xl font-semibold hover:shadow-lg transition-all"
            data-testid="check-code-button"
          >
            ✨ Try
          </button>
        </div>
        <p className="text-sm mt-3 opacity-75">
          Hint: Try your name, or something from Angel Beats! 💫
        </p>
      </div>

      {/* Admin Section (Hidden) */}
      <div className="mb-8">
        <div className="text-center">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="text-sm text-gray-400 hover:text-[var(--primary-rose)] transition-colors"
            data-testid="admin-toggle"
          >
            👨‍💻 Admin: Add New Surprise
          </button>
        </div>
        
        {isAdding && (
          <div className="bg-white rounded-2xl p-6 shadow-lg mt-4 border-2 border-dashed border-[var(--primary-lavender)]">
            <input
              type="text"
              placeholder="Surprise Title"
              value={newSurprise.title}
              onChange={(e) => setNewSurprise({...newSurprise, title: e.target.value})}
              className="w-full p-3 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)]"
              data-testid="surprise-title-input"
            />
            <textarea
              placeholder="Surprise Message"
              value={newSurprise.message}
              onChange={(e) => setNewSurprise({...newSurprise, message: e.target.value})}
              className="w-full p-3 border rounded-xl h-24 resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary-rose)]"
              data-testid="surprise-message-input"
            />
            <div className="flex gap-3">
              <button
                onClick={addSurprise}
                className="px-6 py-2 bg-[var(--primary-rose)] text-white rounded-xl hover:shadow-lg transition-all"
                data-testid="save-surprise-button"
              >
                Add Surprise
              </button>
              <button
                onClick={() => {setIsAdding(false); setNewSurprise({ title: "", message: "" });}}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-xl hover:shadow-lg transition-all"
                data-testid="cancel-surprise-button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Surprises List */}
      <div className="space-y-6">
        {surprises.filter(s => s.revealed).map((surprise) => (
          <div
            key={surprise.id}
            className="bg-gradient-to-br from-[var(--accent-gold)] to-[var(--primary-rose)] rounded-2xl p-6 text-white shadow-xl"
            data-testid={`surprise-${surprise.id}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎁</span>
              <h3 className="text-xl font-semibold">{surprise.title}</h3>
            </div>
            <p className="font-dancing text-lg leading-relaxed mb-3">
              {surprise.message}
            </p>
            <p className="text-sm opacity-80">Unlocked on {surprise.date}</p>
          </div>
        ))}
        
        {surprises.filter(s => !s.revealed).length > 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🔒</div>
            <p className="text-[var(--text-muted)]">
              {surprises.filter(s => !s.revealed).length} surprise(s) waiting to be unlocked...
            </p>
          </div>
        )}
        
        {surprises.filter(s => s.revealed).length === 0 && (
          <div className="text-center py-12 text-[var(--text-muted)]">
            <div className="text-6xl mb-4">✨</div>
            <p>No surprises unlocked yet. Try entering a secret code above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
