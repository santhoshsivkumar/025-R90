import { useState, useCallback, useRef } from 'react';

const STORAGE_KEY = 'r90_react_v1';

const defaultState = {
  startDate: null,
  name: '',
  checkins: {},
  habits: {},
  water: {},
  wkChecks: {},
  theme: 'dark',
  notif: false,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultState, ...JSON.parse(raw) };
  } catch {}
  return { ...defaultState };
}

export function useStore() {
  const [state, setState] = useState(loadState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const update = useCallback((patch) => {
    setState((prev) => {
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ ...defaultState });
  }, []);

  return { state, update, clearAll };
}

// Pure utility functions — O(1) lookups using hash maps
export const todayKey = () => new Date().toISOString().split('T')[0];

export function dayNumber(startDate) {
  if (!startDate) return 1;
  const s = new Date(startDate);
  s.setHours(0, 0, 0, 0);
  const n = new Date();
  n.setHours(0, 0, 0, 0);
  return Math.max(1, Math.min(90, Math.floor((n - s) / 86400000) + 1));
}

export function streak(checkins) {
  let k = 0;
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  for (let i = 0; i < 90; i++) {
    if (checkins[d.toISOString().split('T')[0]]) k++;
    else break;
    d.setDate(d.getDate() - 1);
  }
  return k;
}

export function doneCount(checkins) {
  let c = 0;
  for (const k in checkins) if (checkins[k]) c++;
  return c;
}

export const toMins = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

export function fmt12(t) {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

export function getCurrentSlot(schedule) {
  const n = new Date();
  const mins = n.getHours() * 60 + n.getMinutes();
  for (let i = 0; i < schedule.length; i++) {
    const s = toMins(schedule[i].t);
    const e = toMins(schedule[i].e);
    if (e < s) {
      if (mins >= s || mins < e) return { cur: i, nxt: (i + 1) % schedule.length };
    } else {
      if (mins >= s && mins < e) return { cur: i, nxt: (i + 1) % schedule.length };
    }
  }
  return { cur: schedule.length - 1, nxt: 0 };
}
