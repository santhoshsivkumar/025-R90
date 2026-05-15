import { useMemo, useEffect, useRef } from "react";
import { useClock } from "../hooks/useClock";
import { fmt12, getCurrentSlot, toMins } from "../hooks/useStore";
import { SCHEDULE } from "../data/constants";

export default function ScheduleTab() {
  const time = useClock();
  const slot = useMemo(() => getCurrentSlot(SCHEDULE), [time]);
  const currentRef = useRef(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  const nowMins = useMemo(
    () => time.getHours() * 60 + time.getMinutes(),
    [time],
  );

  return (
    <div className="schedule-tab">
      <h2 className="sec-title">📅 Daily Schedule</h2>
      <div className="timeline">
        {SCHEDULE.map((item, i) => {
          const isCurrent = i === slot.cur;
          const startMins = toMins(item.t);
          const endMins = toMins(item.e);
          const isOvernight = endMins < startMins;
          // overnight slot (e.g. Sleep 22:15→05:45) is "past" only between its end and its start
          const isPast = isOvernight
            ? nowMins >= endMins && nowMins < startMins
            : nowMins >= endMins;
          const statusClass = isCurrent ? "current" : isPast ? "past" : "";

          return (
            <div
              key={i}
              className={`tl-item ${statusClass} fade-up`}
              style={{ "--d": i }}
              ref={isCurrent ? currentRef : null}
            >
              <div className="tl-dot-col">
                <div className={`tl-dot${isCurrent ? " pulse" : ""}`} />
                {i < SCHEDULE.length - 1 && <div className="tl-line" />}
              </div>
              <div className="tl-body">
                <div className="tl-head">
                  <strong>{item.name}</strong>
                  {isCurrent && <span className="now-pill">NOW</span>}
                </div>
                <span className="tl-time">
                  {fmt12(item.t)} – {fmt12(item.e)}
                </span>
                <p className="tl-detail">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
