import Fireworks from "../animations/Fireworks";
import { useBirthdayContext } from "../../contexts/BirthdayContext";

interface EndingPageProps {
  onRestart: () => void;
}

export default function EndingPage({ onRestart }: EndingPageProps) {
  const { customization, isLoading, updateField } = useBirthdayContext();
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="text-center relative">
      <Fireworks />
      <h2 className="page-title">Happy Birthday Rica! 🎉</h2>
      <p className="subtitle">Hope this made you smile as much as you make me smile! ✨</p>
      
      <button
        data-testid="button-restart"
        onClick={onRestart}
        className="px-8 py-4 text-xl border-none rounded-full bg-gradient-to-r from-[var(--primary-sky)] to-[var(--primary-rose)] text-white font-comfortaa font-semibold cursor-pointer shadow-xl transition-all duration-300 my-8 hover:transform hover:-translate-y-1 hover:scale-105"
      >
        🔄 Start Over
      </button>
      
      <div className="text-[var(--text-muted)] text-sm mt-10">
        Made with ❤️ by{" "}
        <span 
          className="cursor-pointer hover:text-[var(--primary-rose)] transition-colors underline"
          onClick={() => {
            const newAuthorName = prompt("Edit your name:", customization?.authorName || "");
            if (newAuthorName !== null) updateField("authorName", newAuthorName);
          }}
          data-testid="author-name-edit"
        >
          {customization?.authorName || "[Your Name]"}
        </span>
        <div className="text-xs mt-1 italic">Click to edit your name</div>
      </div>
    </div>
  );
}
