import { useMemo, useState, useCallback } from "react";
import { dayNumber, streak, doneCount, todayKey } from "../hooks/useStore";
import { HABITS, QUOTES } from "../data/constants";
import DayDetailModal from "./DayDetailModal";

export default function ProgressTab({ state }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const day = useMemo(() => dayNumber(state.startDate), [state.startDate]);
  const stk = useMemo(() => streak(state.checkins), [state.checkins]);
  const done = useMemo(() => doneCount(state.checkins), [state.checkins]);
  const remaining = 90 - done;
  const key = todayKey();

  const startDate = state.startDate;
  const endDate = useMemo(() => {
    if (!startDate) return null;
    const d = new Date(startDate);
    d.setDate(d.getDate() + 89);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [startDate]);

  const quote = useMemo(() => QUOTES[day % QUOTES.length], [day]);

  const grid = useMemo(() => {
    if (!startDate) return [];
    return Array.from({ length: 90 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dk = d.toISOString().split("T")[0];
      let status = "future";
      if (dk === key) status = "today";
      else if (dk < key) status = state.checkins[dk] ? "done" : "missed";
      return { idx: i, key: dk, status };
    });
  }, [startDate, state.checkins, key]);

  const habitStats = useMemo(() => {
    return HABITS.map((h) => {
      let completed = 0;
      for (let i = 0; i < day; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dk = d.toISOString().split("T")[0];
        if (state.habits[dk] && state.habits[dk][h.id]) completed++;
      }
      const pct = day > 0 ? Math.round((completed / day) * 100) : 0;
      return { ...h, completed, total: day, pct };
    });
  }, [state.habits, startDate, day]);

  const closeModal = useCallback(() => setSelectedDay(null), []);

  return (
    <div className="progress-tab">
      <h2 className="sec-title">📊 Progress</h2>

      <div className="stats-row fade-up" style={{ "--d": "0" }}>
        <div className="stat">
          <span className="stat-val">{stk}</span>
          <span className="stat-label">Streak</span>
        </div>
        <div className="stat">
          <span className="stat-val">{done}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-val">{remaining}</span>
          <span className="stat-label">Remaining</span>
        </div>
      </div>

      {startDate && (
        <div className="card fade-up" style={{ "--d": "1" }}>
          <div className="card-label">Timeline</div>
          <p style={{ color: "var(--text2)" }}>
            Start:{" "}
            <strong>
              {new Date(startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </strong>
            {" → "}End: <strong>{endDate}</strong>
          </p>
        </div>
      )}

      <div className="card fade-up" style={{ "--d": "2" }}>
        <div className="card-label">90-Day Grid</div>
        <div className="pg-grid">
          {grid.map((cell) => (
            <button
              key={cell.idx}
              className={`pg-day ${cell.status}`}
              onClick={() => setSelectedDay(cell.idx)}
              title={`Day ${cell.idx + 1}`}
            >
              {cell.idx + 1}
            </button>
          ))}
        </div>
        <div className="pg-legend">
          <span>
            <span className="pg-dot done" /> Done
          </span>
          <span>
            <span className="pg-dot today" /> Today
          </span>
          <span>
            <span className="pg-dot missed" /> Missed
          </span>
          <span>
            <span className="pg-dot future" /> Future
          </span>
        </div>
      </div>

      <div className="card fade-up" style={{ "--d": "3" }}>
        <div className="card-label">Habit Completion</div>
        <div className="habit-sum-grid">
          {habitStats.map((h) => (
            <div key={h.id} className="habit-sum-item">
              <span className="habit-sum-name">
                {h.icon} {h.label}
              </span>
              <div className="habit-sum-bar">
                <div
                  className="habit-sum-fill"
                  style={{ width: `${h.pct}%` }}
                />
              </div>
              <span className="habit-sum-pct">{h.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card fade-up" style={{ "--d": "4" }}>
        <div className="card-label">What to Expect</div>
        <div className="rule-item">
          <span className="rule-icon">📅</span>
          <span className="rule-text">
            Days 1–30: Building foundations. Hardest phase. Push through.
          </span>
        </div>
        <div className="rule-item">
          <span className="rule-icon">🚀</span>
          <span className="rule-text">
            Days 31–60: Momentum builds. Habits feel natural. Energy peaks.
          </span>
        </div>
        <div className="rule-item">
          <span className="rule-icon">👑</span>
          <span className="rule-text">
            Days 61–90: Identity shift complete. You won't want to go back.
          </span>
        </div>
      </div>

      <div className="card motto fade-up" style={{ "--d": "5" }}>
        <p>{quote}</p>
      </div>

      {selectedDay != null && (
        <DayDetailModal
          dayIdx={selectedDay}
          startDate={startDate}
          state={state}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
