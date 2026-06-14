// APEX ARENA — Service Worker (offline-first)
// v2: corrige el bug de iOS PWA "Response served by service worker has redirections"
const CACHE = "apex-arena-v2";
const ASSETS = ["/", "/index.html", "/manifest.webmanifest", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// iOS no permite que una respuesta de navegación sea un redirect: la reconstruimos limpia.
async function stripRedirect(resp) {
  if (resp && resp.redirected) {
    const body = await resp.blob();
    return new Response(body, { status: resp.status, statusText: resp.statusText, headers: resp.headers });
  }
  return resp;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Firebase / fuentes: pasar a la red

  // Navegaciones: network-first y respuesta SIN redirect
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        return await stripRedirect(await fetch(req));
      } catch (_) {
        const cached = (await caches.match("/index.html")) || (await caches.match("/"));
        return (await stripRedirect(cached)) || Response.error();
      }
    })());
    return;
  }

  // Recursos: cache-first con actualización en segundo plano
  e.respondWith((async () => {
    const cached = await caches.match(req);
    const fetchP = fetch(req)
      .then((res) => {
        if (res && res.status === 200 && req.method === "GET") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => cached);
    return cached || fetchP;
  })());
});
