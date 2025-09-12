const letterText = `Rica,

Happy Birthday. I don't have a gift wrapped in a box, but I wrapped this website with care — every page is a small piece of how you make my days better.

We've only known each other a short while, but you've already become someone I think about often. Your smile, your laugh, and the things you love (like Kanade) tell me who you are — gentle, strong, and quietly beautiful.

I hope this little book makes you smile. I made it because I wanted you to know you matter — more than you might realize.

Always,
[Your Name]`;

export default function LetterPage() {
  const downloadLetter = () => {
    const blob = new Blob([letterText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Birthday_Letter_For_Rica.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyLetter = async () => {
    try {
      await navigator.clipboard.writeText(letterText);
      // Visual feedback could be added here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div>
      <h2 className="page-title">A Letter for You</h2>
      
      <div className="bg-gradient-to-br from-[var(--primary-cream)] to-white rounded-2xl p-10 shadow-2xl relative my-5">
        <div className="absolute top-0 left-10 w-0.5 h-full bg-[var(--primary-rose)] opacity-30"></div>
        <div
          data-testid="letter-text"
          className="font-dancing text-xl leading-loose text-[var(--text-dark)] mb-8 whitespace-pre-line"
        >
          {letterText}
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            data-testid="button-download"
            onClick={downloadLetter}
            className="px-6 py-3 border-none rounded-full bg-[var(--primary-rose)] text-white font-inter cursor-pointer transition-all duration-300 shadow-lg hover:transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            📄 Download Letter
          </button>
          <button
            data-testid="button-copy"
            onClick={copyLetter}
            className="px-6 py-3 border-none rounded-full bg-[var(--primary-rose)] text-white font-inter cursor-pointer transition-all duration-300 shadow-lg hover:transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            📋 Copy to Clipboard
          </button>
        </div>
      </div>

      {/* Optional Audio Player */}
      <div className="bg-white rounded-2xl p-5 shadow-lg my-8 text-center">
        <p className="mb-2 font-semibold">🎵 A Song for You</p>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Add your favorite song or a birthday message here!
        </p>
        <audio className="w-full mt-4" controls>
          <source src="placeholder-audio.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
