export default function TimelinePage() {
  const timelineItems = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div>
      <h2 className="page-title">Our 16 Days</h2>
      
      <div className="max-w-2xl mx-auto">
        {timelineItems.map((day) => (
          <div
            key={day}
            data-testid={`timeline-item-${day}`}
            className="flex items-center mb-8 cursor-pointer transition-all duration-300 hover:transform hover:translate-x-2"
          >
            <div className="w-15 h-15 rounded-full bg-gradient-to-br from-[var(--primary-rose)] to-[var(--primary-sky)] flex items-center justify-center text-white font-semibold mr-5 shadow-lg">
              {day}
            </div>
            <div className="flex-1 bg-white p-5 rounded-2xl shadow-lg">
              <h4 className="font-semibold mb-2">Day {day}</h4>
              <p className="text-[var(--text-muted)]">[Add your memory from day {day} here]</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
