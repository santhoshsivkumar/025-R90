import { createPortal } from "react-dom";
import { HABITS, WORKOUTS } from "../data/constants";

export default function DayDetailModal({ dayIdx, startDate, state, onClose }) {
  if (dayIdx == null || !startDate) return null;

  const date = new Date(startDate);
  date.setDate(date.getDate() + dayIdx);
  const key = date.toISOString().split("T")[0];
  const dayOfWeek = date.getDay();
  const adjustedDow = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const workout = WORKOUTS[adjustedDow];

  const checkedIn = !!state.checkins[key];
  const dayHabits = state.habits[key] || {};
  const waterCount = state.water[key] || 0;
  const waterPct = Math.round((waterCount / 8) * 100);
  const habitsCompleted = HABITS.filter((h) => dayHabits[h.id]).length;

  return createPortal(
    <div className="dm-overlay" onClick={onClose}>
      <div className="dm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dm-header">
          <h3>
            Day {dayIdx + 1} —{" "}
            {date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </h3>
          <button className="dm-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="dm-body">
          <div
            className="dm-status"
            data-status={checkedIn ? "done" : "missed"}
          >
            {checkedIn ? "✅ Checked In" : "❌ Not Checked In"}
          </div>

          <div className="dm-cols">
            <div className="dm-section">
              <h4>
                Habits ({habitsCompleted}/{HABITS.length})
              </h4>
              {HABITS.map((h) => (
                <div key={h.id} className="dm-habit">
                  <span className="dm-habit-check">
                    {dayHabits[h.id] ? "✅" : "⬜"}
                  </span>
                  <span>
                    {h.icon} {h.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="dm-col-right">
              <div className="dm-section">
                <h4>Water ({waterCount}/8 glasses)</h4>
                <div className="dm-water-bar">
                  <div
                    className="dm-water-fill"
                    style={{ width: `${waterPct}%` }}
                  />
                </div>
              </div>

              <div className="dm-section">
                <h4>
                  {workout.icon} {workout.focus} — {workout.day}
                </h4>
                {workout.exs.map((ex, i) => {
                  const wkKey = `${key}-${adjustedDow}-${i}`;
                  const done = !!state.wkChecks[wkKey];
                  return (
                    <div key={i} className="dm-habit">
                      <span className="dm-habit-check">
                        {done ? "✅" : "⬜"}
                      </span>
                      <span>{ex}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
