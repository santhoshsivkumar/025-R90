import { useMemo, useCallback } from "react";
import { useClock } from "../hooks/useClock";
import { todayKey, fmt12, getCurrentSlot } from "../hooks/useStore";
import { SCHEDULE, HABITS, MOTTOS } from "../data/constants";

export default function TodayTab({ state, update, showToast, day, stk, done }) {
  const time = useClock();
  const key = todayKey();

  const timeStr = useMemo(() => {
    const h = String(time.getHours()).padStart(2, "0");
    const m = String(time.getMinutes()).padStart(2, "0");
    const s = String(time.getSeconds()).padStart(2, "0");
    return { h, m, s };
  }, [time]);

  const slot = useMemo(() => getCurrentSlot(SCHEDULE), [time]);

  const habits = useMemo(() => state.habits[key] || {}, [state.habits, key]);
  const waterCount = useMemo(() => state.water[key] || 0, [state.water, key]);
  const checkedIn = useMemo(() => !!state.checkins[key], [state.checkins, key]);
  const motto = useMemo(() => MOTTOS[day % MOTTOS.length], [day]);

  const toggleHabit = useCallback(
    (id) => {
      const dayHabits = {
        ...(state.habits[key] || {}),
        [id]: !(state.habits[key] || {})[id],
      };
      update({ habits: { ...state.habits, [key]: dayHabits } });
    },
    [state.habits, key, update],
  );

  const toggleWater = useCallback(
    (i) => {
      const cur = state.water[key] || 0;
      const next = i < cur ? i : i + 1;
      update({ water: { ...state.water, [key]: next } });
    },
    [state.water, key, update],
  );

  const handleCheckin = useCallback(() => {
    update({ checkins: { ...state.checkins, [key]: true } });
    showToast("Day " + day + " checked in! 🎉");
  }, [state.checkins, key, update, showToast, day]);

  const pct = Math.round((day / 90) * 100);
  const remaining = 90 - day;

  return (
    <div className="today-tab">
      <div className="hero card fade-up" style={{ "--d": "0" }}>
        <div className="hero-top">
          <span className="hero-day">Day {day}</span>
          <span className="hero-pct">{pct}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="hero-msg">
          {day <= 30
            ? "Building foundations. Every rep counts."
            : day <= 60
              ? "Momentum phase. You're becoming unstoppable."
              : "Final stretch. Finish what you started."}
        </p>
      </div>

      <div className="now-card card fade-up" style={{ "--d": "1" }}>
        <div className="clock-time">
          {timeStr.h}:{timeStr.m}
          <span className="clock-sec">:{timeStr.s}</span>
        </div>
        <div className="now-badge">▶ RIGHT NOW</div>
        <strong className="now-name">{SCHEDULE[slot.cur].name}</strong>
        <p className="now-detail">{SCHEDULE[slot.cur].detail}</p>
        <div className="now-footer">
          <span>
            Next → <strong>{SCHEDULE[slot.nxt].name}</strong>
          </span>
          <span className="now-next-time">{fmt12(SCHEDULE[slot.nxt].t)}</span>
        </div>
      </div>

      <div className="stats-row fade-up" style={{ "--d": "2" }}>
        <div className="stat">
          <span className="stat-val">{stk}</span>
          <span className="stat-label">Streak</span>
        </div>
        <div className="stat">
          <span className="stat-val">{remaining}</span>
          <span className="stat-label">Left</span>
        </div>
        <div className="stat">
          <span className="stat-val">{pct}%</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      <div className="card fade-up" style={{ "--d": "3" }}>
        <div className="card-label">Daily Habits</div>
        {HABITS.map((h) => (
          <div
            key={h.id}
            className="habit-row"
            onClick={() => toggleHabit(h.id)}
          >
            <span className="habit-icon">{h.icon}</span>
            <span className="habit-label">{h.label}</span>
            <div className={`toggle${habits[h.id] ? " on" : ""}`}>
              <div className="toggle-thumb" />
            </div>
          </div>
        ))}
      </div>

      <div className="card fade-up" style={{ "--d": "4" }}>
        <div className="card-label">Water — {waterCount}/8 glasses</div>
        <div className="water-grid">
          {Array.from({ length: 8 }, (_, i) => (
            <button
              key={i}
              className={`wglass${i < waterCount ? " filled" : ""}`}
              onClick={() => toggleWater(i)}
            >
              💧
            </button>
          ))}
        </div>
      </div>

      <div className="card motto fade-up" style={{ "--d": "5" }}>
        <div className="card-label">Today's Motto</div>
        <p>{motto}</p>
      </div>

      <div className="fade-up" style={{ "--d": "6" }}>
        <button
          className="checkin-btn"
          onClick={handleCheckin}
          disabled={checkedIn}
        >
          {checkedIn ? "✅ Checked In Today" : "🔥 Check In for Day " + day}
        </button>
      </div>
    </div>
  );
}
