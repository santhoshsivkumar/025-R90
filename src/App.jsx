import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import {
  useStore,
  todayKey,
  dayNumber,
  streak,
  doneCount,
} from "./hooks/useStore";
import {
  useNotifications,
  requestNotifPermission,
} from "./hooks/useNotifications";
import TodayTab from "./components/TodayTab";
import ScheduleTab from "./components/ScheduleTab";
import WorkoutTab from "./components/WorkoutTab";
import FoodTab from "./components/FoodTab";
import RulesTab from "./components/RulesTab";
import ProgressTab from "./components/ProgressTab";
import Toast from "./components/Toast";
import "./App.css";

const TABS = [
  { id: "today", label: "Today", icon: "🏠" },
  { id: "schedule", label: "Schedule", icon: "📅" },
  { id: "workout", label: "Workout", icon: "💪" },
  { id: "food", label: "Food", icon: "🍽️" },
  { id: "rules", label: "Rules", icon: "📋" },
  { id: "progress", label: "Progress", icon: "📊" },
];

export default function App() {
  const { state, update, clearAll } = useStore();
  const [tab, setTab] = useState(
    () => localStorage.getItem("r90-tab") || "today",
  );
  const [showSetup, setShowSetup] = useState(!state.startDate);
  const [setupName, setSetupName] = useState("");
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
  }, []);

  useEffect(() => {
    if (!toast.visible) return;
    const t = setTimeout(
      () => setToast((p) => ({ ...p, visible: false })),
      3500,
    );
    return () => clearTimeout(t);
  }, [toast.visible]);

  const toggleTheme = useCallback(() => {
    const next = state.theme === "dark" ? "light" : "dark";
    update({ theme: next });
    document.documentElement.setAttribute("data-theme", next);
  }, [state.theme, update]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state.theme]);

  const handleSetup = useCallback(() => {
    if (!setupName.trim()) return;
    update({ name: setupName.trim(), startDate: todayKey() });
    setShowSetup(false);
    showToast(`Welcome, ${setupName.trim()}! Let's go 🚀`);
  }, [setupName, update, showToast]);

  const handleClear = useCallback(() => {
    if (window.confirm("Reset ALL data? This cannot be undone.")) {
      clearAll();
      setShowSetup(true);
      showToast("All data cleared");
    }
  }, [clearAll, showToast]);

  const day = useMemo(() => dayNumber(state.startDate), [state.startDate]);
  const stk = useMemo(() => streak(state.checkins), [state.checkins]);
  const done = useMemo(() => doneCount(state.checkins), [state.checkins]);

  // Schedule real notifications
  useNotifications(state.notif);

  const handleNotifToggle = useCallback(async () => {
    if (state.notif) {
      update({ notif: false });
      showToast("Notifications off");
      return;
    }
    const result = await requestNotifPermission();
    if (result === "granted") {
      update({ notif: true });
      showToast("Notifications enabled! You'll be reminded at key times ✅");
    } else if (result === "denied") {
      showToast("Permission denied — enable in your browser/OS settings");
    } else if (result === "unsupported") {
      showToast("Notifications not supported on this device");
    }
  }, [state.notif, update, showToast]);

  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    localStorage.setItem("r90-tab", tab);
  }, [tab]);

  const renderTab = useCallback(() => {
    const props = { state, update, showToast, day, stk, done };
    switch (tab) {
      case "today":
        return <TodayTab {...props} />;
      case "schedule":
        return <ScheduleTab {...props} />;
      case "workout":
        return <WorkoutTab {...props} />;
      case "food":
        return <FoodTab />;
      case "rules":
        return <RulesTab />;
      case "progress":
        return <ProgressTab {...props} />;
      default:
        return <TodayTab {...props} />;
    }
  }, [tab, state, update, showToast, day, stk, done]);

  return (
    <div className="app">
      {/* Sidebar — desktop */}
      <nav className="sidebar">
        <div className="sidebar-brand">⚡ R90</div>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`nav-btn${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-title">Day {day}/90</span>
            {state.name && (
              <span className="topbar-name">Hi, {state.name}</span>
            )}
          </div>
          <div className="topbar-right">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {state.theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              className={`icon-btn${state.notif ? " active" : ""}`}
              onClick={handleNotifToggle}
              title={state.notif ? "Notifications on" : "Enable notifications"}
            >
              {state.notif ? "🔔" : "🔕"}
            </button>
            <button
              className="icon-btn"
              onClick={handleClear}
              title="Clear all data"
            >
              🗑️
            </button>
          </div>
        </header>

        <div className="tab-content" ref={contentRef}>
          <div className="tab-page tab-enter" key={tab}>
            {renderTab()}
          </div>
        </div>
      </main>

      {/* Bottom nav — mobile */}
      <nav className="bottom-nav">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`nav-btn${tab === t.id ? " active" : ""}`}
            onClick={() => setTab(t.id)}
          >
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Setup Modal */}
      {showSetup && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>⚡ 90-Day Reset Protocol</h2>
            <p>Enter your name to begin your transformation.</p>
            <input
              type="text"
              placeholder="Your name"
              value={setupName}
              onChange={(e) => setSetupName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSetup()}
              autoFocus
            />
            <button className="checkin-btn" onClick={handleSetup}>
              Start My Reset
            </button>
          </div>
        </div>
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
