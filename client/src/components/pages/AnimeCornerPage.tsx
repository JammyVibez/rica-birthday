import SakuraPetals from "../animations/SakuraPetals";

export default function AnimeCornerPage() {
  return (
    <div className="text-center relative">
      <SakuraPetals />
      <h2 className="page-title">Your Anime World 🎬</h2>
      
      <div className="w-72 h-96 bg-gradient-to-br from-[var(--primary-lavender)] to-[var(--primary-sky)] rounded-2xl mx-auto mb-8 shadow-2xl flex items-center justify-center text-xl text-[var(--text-muted)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[glow_3s_ease-in-out_infinite_alternate]"></div>
        <div className="text-center p-5 z-10">
          <div className="text-5xl mb-2">👼</div>
          <p>Kanade Placeholder<br/>Replace with Kanade image</p>
        </div>
      </div>
      
      <p className="text-xl text-center my-8 font-dancing">
        This character inspires you, just like you inspire me.
      </p>
      
      <div className="bg-[var(--primary-cream)] rounded-2xl p-6 mt-8 border-l-4 border-[var(--primary-rose)]">
        <h4 className="text-[var(--primary-rose)] mb-4 font-semibold">✨ Your Anime Facts</h4>
        <p className="mb-2"><strong>Favorite Character:</strong> Kanade — Angel Beats</p>
        <p><strong>Why she's your favorite:</strong> [Add your reason here]</p>
      </div>
    </div>
  );
}
