import { useState, useEffect, useRef } from 'react';

export function useClock() {
  const [time, setTime] = useState(() => new Date());
  const rafRef = useRef(null);
  const lastSec = useRef(-1);

  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      const now = new Date();
      const sec = now.getSeconds();
      if (sec !== lastSec.current) {
        lastSec.current = sec;
        setTime(now);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  return time;
}
