const CACHE = "ashvault-v2";
const PRECACHE = ["./index.html","./manifest.webmanifest","./css/app.css","./js/data.js","./js/save.js","./js/engine.js","./js/world.js","./js/run.js","./js/home.js","./js/ui.js","./js/main.js","./icons/icon.svg"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => { if (e.request.method !== "GET") return; e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => { const copy = res.clone(); if (res.ok) caches.open(CACHE).then((c) => c.put(e.request, copy)); return res; }).catch(() => caches.match("./index.html")))); });
