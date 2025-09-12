import FloatingHearts from "../animations/FloatingHearts";

interface GreetingPageProps {
  onEnter: () => void;
}

export default function GreetingPage({ onEnter }: GreetingPageProps) {
  return (
    <div className="text-center relative flex flex-col justify-center items-center min-h-full">
      <FloatingHearts />
      <h1 className="page-title">Happy Birthday Rica!</h1>
      <p className="subtitle">Wishing you the best day ever 💖</p>
      <button
        data-testid="button-enter"
        onClick={onEnter}
        className="px-8 py-4 text-xl border-none rounded-full bg-gradient-to-r from-[var(--accent-gold)] to-[var(--primary-rose)] text-white font-comfortaa font-semibold cursor-pointer shadow-xl transition-all duration-300 mt-10 hover:transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
      >
        Enter ✨
      </button>
    </div>
  );
}
