import { useBirthdayContext } from "../../contexts/BirthdayContext";

export default function TimelinePage() {
  const { customization, isLoading, updateTimelineEntry } = useBirthdayContext();
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-xl text-[var(--text-muted)]">Loading...</div>
      </div>
    );
  }

  const timelineEntries = customization?.timelineEntries || Array.from({ length: 16 }, (_, i) => `[Add your memory from day ${i + 1} here]`);

  return (
    <div>
      <h2 className="page-title">Our 16 Days</h2>
      
      <div className="max-w-2xl mx-auto">
        {timelineEntries.map((entry, index) => {
          const day = index + 1;
          return (
            <div
              key={day}
              data-testid={`timeline-item-${day}`}
              className="flex items-center mb-8 cursor-pointer transition-all duration-300 hover:transform hover:translate-x-2"
              onClick={() => {
                const newEntry = prompt(`What happened on day ${day}?`, entry);
                if (newEntry !== null) updateTimelineEntry(index, newEntry);
              }}
            >
              <div className="w-15 h-15 rounded-full bg-gradient-to-br from-[var(--primary-rose)] to-[var(--primary-sky)] flex items-center justify-center text-white font-semibold mr-5 shadow-lg">
                {day}
              </div>
              <div className="flex-1 bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="font-semibold mb-2">Day {day}</h4>
                <p className="text-[var(--text-muted)]">{entry}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <p className="text-center mt-8 italic text-[var(--text-muted)]">
        💝 Click on any day to edit that memory!
      </p>
    </div>
  );
}
