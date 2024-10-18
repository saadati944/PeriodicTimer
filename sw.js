const VERSION = "v2";
const CACHE_NAME = `periodic-timer-${VERSION}`;

const APP_STATIC_RESOURCES = [
  "/",
  "/back.svg",
  "/chunk-2XH7BA5S.js",
  "/chunk-3BG456MW.js",
  "/chunk-4TQ2J6AN.js",
  "/chunk-7R4RPOVL.js",
  "/chunk-AEH2CUDJ.js",
  "/chunk-AT7X73VS.js",
  "/chunk-B43CU5JX.js",
  "/chunk-F7XBNY6P.js",
  "/chunk-FA25AEA4.js",
  "/chunk-FPJE3T2B.js",
  "/chunk-H4KPTBBH.js",
  "/chunk-HBAE7HOK.js",
  "/chunk-JHI3MBHO.js",
  "/chunk-JURA3N6O.js",
  "/chunk-K6L7EKAC.js",
  "/chunk-LF5XB4YN.js",
  "/chunk-MXXUIFLA.js",
  "/chunk-NMYJD6OP.js",
  "/chunk-NY7FVCUI.js",
  "/chunk-QYULWRQI.js",
  "/chunk-RJZ75WJA.js",
  "/chunk-TAFVU7UN.js",
  "/chunk-TQEIIVVC.js",
  "/chunk-V7CXUA4R.js",
  "/chunk-YHCUE55Z.js",
  "/egg-timer.svg",
  "/favicon.ico",
  "/index.html",
  "/main-HB5X2GH7.js",
  "/polyfills-FFHMD2TL.js",
  "/styles-DQOEOQCN.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        }),
      );
      await clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(caches.match("/"));
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request.url);
      if (cachedResponse) {
        return cachedResponse;
      }
      return new Response(null, { status: 404 });
    })(),
  );
});
