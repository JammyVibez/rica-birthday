import { useState, useEffect, useCallback } from "react";
import GreetingPage from "./pages/GreetingPage";
import AboutRicaPage from "./pages/AboutRicaPage";
import AnimeCornerPage from "./pages/AnimeCornerPage";
import TimelinePage from "./pages/TimelinePage";
import ComplimentsPage from "./pages/ComplimentsPage";
import GalleryPage from "./pages/GalleryPage";
import SurprisePage from "./pages/SurprisePage";
import LetterPage from "./pages/LetterPage";
import EndingPage from "./pages/EndingPage";

const totalPages = 9;

export default function Birthday() {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const restartJourney = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <GreetingPage onEnter={nextPage} />;
      case 2:
        return <AboutRicaPage />;
      case 3:
        return <AnimeCornerPage />;
      case 4:
        return <TimelinePage />;
      case 5:
        return <ComplimentsPage />;
      case 6:
        return <GalleryPage />;
      case 7:
        return <SurprisePage />;
      case 8:
        return <LetterPage />;
      case 9:
        return <EndingPage onRestart={restartJourney} />;
      default:
        return <GreetingPage onEnter={nextPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl p-5">
        {/* Page Content */}
        <div className="min-h-[80vh] p-8 lg:p-10 rounded-3xl bg-white shadow-xl mb-8 relative overflow-hidden animate-[fadeIn_0.6s_ease-out]">
          {renderCurrentPage()}
        </div>

        {/* Navigation */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          <button
            data-testid="button-prev"
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-6 py-3 border-none rounded-full bg-gradient-to-r from-[var(--primary-rose)] to-[var(--primary-sky)] text-white font-comfortaa font-semibold cursor-pointer shadow-lg transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            ← Back
          </button>
          {currentPage < totalPages && (
            <button
              data-testid="button-next"
              onClick={nextPage}
              className="px-6 py-3 border-none rounded-full bg-gradient-to-r from-[var(--primary-rose)] to-[var(--primary-sky)] text-white font-comfortaa font-semibold cursor-pointer shadow-lg transition-all duration-300 text-sm hover:transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
