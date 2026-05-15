import { useState, useMemo, useCallback } from "react";
import { todayKey } from "../hooks/useStore";
import { WORKOUTS } from "../data/constants";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WorkoutTab({ state, update }) {
  const todayDow = useMemo(() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  }, []);

  const [selectedDay, setSelectedDay] = useState(todayDow);
  const workout = WORKOUTS[selectedDay];
  const key = todayKey();

  const toggleEx = useCallback(
    (exIdx) => {
      const wkKey = `${key}-${selectedDay}-${exIdx}`;
      const next = { ...state.wkChecks, [wkKey]: !state.wkChecks[wkKey] };
      update({ wkChecks: next });
    },
    [state.wkChecks, key, selectedDay, update],
  );

  const completedCount = useMemo(() => {
    let c = 0;
    workout.exs.forEach((_, i) => {
      if (state.wkChecks[`${key}-${selectedDay}-${i}`]) c++;
    });
    return c;
  }, [state.wkChecks, key, selectedDay, workout.exs]);

  return (
    <div className="workout-tab">
      <h2 className="sec-title">💪 Workout</h2>

      <div className="day-chips">
        {DAY_NAMES.map((name, i) => (
          <button
            key={i}
            className={`chip${selectedDay === i ? " active" : ""}${todayDow === i ? " today" : ""}`}
            onClick={() => setSelectedDay(i)}
          >
            {name}
          </button>
        ))}
      </div>

      <div
        className="card workout-card fade-up"
        style={{ "--d": "0" }}
        key={selectedDay}
      >
        <div className="workout-header">
          <div
            className="workout-icon-box"
            style={{ background: workout.color + "22", color: workout.color }}
          >
            {workout.icon}
          </div>
          <div>
            <h3>{workout.focus}</h3>
            <span className="text-muted">
              {workout.day} • {completedCount}/{workout.exs.length} done
            </span>
          </div>
        </div>

        <div className="ex-list">
          {workout.exs.map((ex, i) => {
            const wkKey = `${key}-${selectedDay}-${i}`;
            const done = !!state.wkChecks[wkKey];
            return (
              <div
                key={`${selectedDay}-${i}`}
                className={`ex-item${done ? " done" : ""} fade-up`}
                style={{ "--d": i }}
                onClick={() => toggleEx(i)}
              >
                <div className={`ex-cb${done ? " checked" : ""}`}>
                  {done && "✓"}
                </div>
                <span className={`ex-name${done ? " crossed" : ""}`}>{ex}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
