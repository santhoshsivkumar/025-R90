import { useEffect, useRef } from "react";

// Key schedule points to notify — action triggers only, not every slot
const NOTIF_SLOTS = [
  {
    t: "05:45",
    title: "⚡ Wake Up!",
    body: "Rise and shine. 1 glass of water. No phone for 1 hour.",
  },
  {
    t: "07:00",
    title: "🍳 Breakfast Time",
    body: "Eat clean: eggs + oats, or idli + eggs. Protein first.",
  },
  {
    t: "13:00",
    title: "🍱 Lunch Break",
    body: "Step away from work. Eat mindfully. No phone at table.",
  },
  {
    t: "16:30",
    title: "🍌 Snack Time",
    body: "Fruits + nuts only. Nothing processed. Stay disciplined.",
  },
  {
    t: "18:00",
    title: "💪 Workout Time!",
    body: "Your daily training block. Full effort. Phone away.",
  },
  {
    t: "19:15",
    title: "🥘 Dinner Time",
    body: "Eat light and clean. Chapati + protein. Eat slowly.",
  },
  {
    t: "20:00",
    title: "📚 Reading Time",
    body: "30 minutes minimum. Atomic Habits, Deep Work, or similar.",
  },
  {
    t: "21:30",
    title: "🌙 Night Routine",
    body: "Skincare. Prep tomorrow. Wind down. No screens.",
  },
  {
    t: "22:15",
    title: "😴 Lights Out!",
    body: "Sleep now. Your body rebuilds muscle, skin, and mind. Protect it.",
  },
];

function toMins(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

export function useNotifications(enabled) {
  const timersRef = useRef([]);

  useEffect(() => {
    // Clear any previous timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    if (!enabled) return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();
    const nowSecs = now.getSeconds();

    // Try to send via service worker (works in background)
    const swReady = navigator.serviceWorker?.controller;

    NOTIF_SLOTS.forEach((slot) => {
      const slotMins = toMins(slot.t);
      let msUntil;

      if (slotMins > nowMins) {
        msUntil = (slotMins - nowMins) * 60 * 1000 - nowSecs * 1000;
      } else {
        // Schedule for tomorrow
        msUntil = (24 * 60 - nowMins + slotMins) * 60 * 1000 - nowSecs * 1000;
      }

      if (msUntil < 500) return; // skip if less than 0.5s away

      if (swReady) {
        // Send to SW to handle (survives tab background)
        navigator.serviceWorker.controller.postMessage({
          type: "SCHEDULE_NOTIF",
          delay: msUntil,
          title: slot.title,
          body: slot.body,
          tag: slot.t,
        });
      } else {
        // Fallback: direct setTimeout (tab must be open)
        const id = setTimeout(() => {
          new Notification(slot.title, {
            body: slot.body,
            icon: "/icon-192.svg",
            badge: "/icon-192.svg",
            tag: slot.t,
          });
        }, msUntil);
        timersRef.current.push(id);
      }
    });

    // Re-schedule daily at midnight
    const msToMidnight =
      (24 * 60 * 60 -
        (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds())) *
      1000;
    const midnight = setTimeout(() => {
      // This effect will re-run because component re-renders with new day
    }, msToMidnight);
    timersRef.current.push(midnight);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [enabled]);
}

export async function requestNotifPermission() {
  if (!("Notification" in window)) return "unsupported";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return await Notification.requestPermission();
}
