
import { useState, useEffect } from "react";

export default function CountdownPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // You can customize these dates
  const meetingDate = new Date('2024-01-01'); // When you first met
  const nextBirthday = new Date('2025-12-25'); // Next birthday

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDaysSince = (startDate: Date) => {
    const diffTime = currentTime.getTime() - startDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDaysUntil = (futureDate: Date) => {
    const diffTime = futureDate.getTime() - currentTime.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getTimeUnits = (days: number) => {
    const hours = days * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    return { days, hours, minutes, seconds };
  };

  const daysSinceMeeting = getDaysSince(meetingDate);
  const daysUntilBirthday = getDaysUntil(nextBirthday);
  const sinceUnits = getTimeUnits(daysSinceMeeting);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="page-title">Our Time Together ⏳</h2>
      <p className="subtitle mb-12">Every second with you matters</p>
      
      {/* Count Up - Days Since Meeting */}
      <div className="bg-gradient-to-br from-[var(--primary-lavender)] to-[var(--primary-sky)] rounded-2xl p-8 mb-8 text-white shadow-xl">
        <h3 className="text-2xl font-comfortaa mb-6">We've Known Each Other For:</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl font-bold" data-testid="days-counter">
              {sinceUnits.days.toLocaleString()}
            </div>
            <div className="text-sm opacity-80">Days</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl font-bold" data-testid="hours-counter">
              {sinceUnits.hours.toLocaleString()}
            </div>
            <div className="text-sm opacity-80">Hours</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl font-bold" data-testid="minutes-counter">
              {sinceUnits.minutes.toLocaleString()}
            </div>
            <div className="text-sm opacity-80">Minutes</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-3xl font-bold" data-testid="seconds-counter">
              {sinceUnits.seconds.toLocaleString()}
            </div>
            <div className="text-sm opacity-80">Seconds</div>
          </div>
        </div>
        
        <p className="font-dancing text-xl">
          And counting... ✨
        </p>
      </div>

      {/* Countdown - Next Birthday */}
      <div className="bg-gradient-to-br from-[var(--accent-gold)] to-[var(--primary-rose)] rounded-2xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-comfortaa mb-6">Next Birthday Countdown:</h3>
        
        <div className="text-6xl font-bold mb-4" data-testid="birthday-countdown">
          {daysUntilBirthday > 0 ? daysUntilBirthday : 0}
        </div>
        <div className="text-xl opacity-90 mb-4">
          {daysUntilBirthday > 0 ? 'days to go!' : 'Happy Birthday! 🎉'}
        </div>
        
        <p className="font-dancing text-lg">
          {daysUntilBirthday > 0 
            ? "Can't wait to celebrate you again! 🎂" 
            : "Hope your special day is amazing! 💖"
          }
        </p>
      </div>

      {/* Fun Facts */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
        <h4 className="text-[var(--primary-rose)] font-semibold mb-4">✨ Fun Time Facts</h4>
        <div className="space-y-2 text-sm text-[var(--text-muted)]">
          <p>🌍 We've experienced {daysSinceMeeting} sunrises together</p>
          <p>⭐ That's {Math.floor(daysSinceMeeting / 7)} weeks of memories</p>
          <p>🌙 And {Math.floor(daysSinceMeeting / 30)} months of friendship</p>
          <p>💫 Every moment has been a gift</p>
        </div>
      </div>
    </div>
  );
}
