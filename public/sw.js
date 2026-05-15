const CACHE = "r90-v1";
const STATIC = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.svg",
  "/icon-512.svg",
];

// Install: pre-cache static assets
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(STATIC))
      .then(() => self.skipWaiting()),
  );
});

// Activate: clear old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Fetch: network-first for navigation, cache-first for assets
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match("/index.html")));
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (res && res.status === 200 && res.type !== "opaque") {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      });
    }),
  );
});

// Notification click: focus or open app
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((list) => {
        for (const client of list) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            return client.focus();
          }
        }
        return clients.openWindow("/");
      }),
  );
});

// Message from page: schedule a notification
self.addEventListener("message", (e) => {
  if (e.data?.type === "SCHEDULE_NOTIF") {
    const { delay, title, body, tag } = e.data;
    if (delay <= 0) return;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: "/icon-192.svg",
        badge: "/icon-192.svg",
        tag,
        renotify: true,
        vibrate: [200, 100, 200],
      });
    }, delay);
  }
});
