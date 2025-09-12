export default function AboutRicaPage() {
  return (
    <div>
      <h2 className="page-title">About You</h2>
      
      <div className="bg-gradient-to-br from-[var(--primary-cream)] to-white rounded-2xl p-8 text-center shadow-lg mb-8">
        <div className="w-30 h-30 rounded-full bg-gradient-to-br from-[var(--primary-rose)] to-[var(--primary-lavender)] mx-auto mb-5 flex items-center justify-center text-4xl text-white shadow-lg">
          👑
        </div>
        <h3 className="font-comfortaa mb-2 text-xl">Rica</h3>
        <p className="font-dancing text-xl text-[var(--text-muted)]">
          Your smile makes days brighter ✨
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <div className="bg-white p-5 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🌈</div>
          <h4 className="font-semibold mb-2">Favorite Color</h4>
          <p className="text-[var(--text-muted)]">[Your favorite color]</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🌸</div>
          <h4 className="font-semibold mb-2">Favorite Flower</h4>
          <p className="text-[var(--text-muted)]">[Your favorite flower]</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🍰</div>
          <h4 className="font-semibold mb-2">Favorite Food</h4>
          <p className="text-[var(--text-muted)]">[Your favorite food]</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-lg text-center">
          <div className="text-3xl mb-2">🎵</div>
          <h4 className="font-semibold mb-2">Favorite Song</h4>
          <p className="text-[var(--text-muted)]">[Your favorite song]</p>
        </div>
      </div>
      
      <p className="text-center mt-8 italic text-[var(--text-muted)]">
        💝 Edit these details to make them yours!
      </p>
    </div>
  );
}
