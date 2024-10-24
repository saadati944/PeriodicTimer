const VERSION = "v7";
const CACHE_NAME = `periodic-timer-${VERSION}`;
const ENABLE_DYNAMIC_CACHING = false;

const APP_STATIC_RESOURCES = [
  "/PeriodicTimer",
  "/PeriodicTimer/back.svg",
  "/PeriodicTimer/chunk-2XH7BA5S.js",
  "/PeriodicTimer/chunk-3BG456MW.js",
  "/PeriodicTimer/chunk-4TQ2J6AN.js",
  "/PeriodicTimer/chunk-7R4RPOVL.js",
  "/PeriodicTimer/chunk-AEH2CUDJ.js",
  "/PeriodicTimer/chunk-AT7X73VS.js",
  "/PeriodicTimer/chunk-B43CU5JX.js",
  "/PeriodicTimer/chunk-F7XBNY6P.js",
  "/PeriodicTimer/chunk-FA25AEA4.js",
  "/PeriodicTimer/chunk-FPJE3T2B.js",
  "/PeriodicTimer/chunk-H4KPTBBH.js",
  "/PeriodicTimer/chunk-HBAE7HOK.js",
  "/PeriodicTimer/chunk-JHI3MBHO.js",
  "/PeriodicTimer/chunk-JURA3N6O.js",
  "/PeriodicTimer/chunk-K6L7EKAC.js",
  "/PeriodicTimer/chunk-LF5XB4YN.js",
  "/PeriodicTimer/chunk-MXXUIFLA.js",
  "/PeriodicTimer/chunk-NMYJD6OP.js",
  "/PeriodicTimer/chunk-NY7FVCUI.js",
  "/PeriodicTimer/chunk-QYULWRQI.js",
  "/PeriodicTimer/chunk-RJZ75WJA.js",
  "/PeriodicTimer/chunk-TAFVU7UN.js",
  "/PeriodicTimer/chunk-TQEIIVVC.js",
  "/PeriodicTimer/chunk-V7CXUA4R.js",
  "/PeriodicTimer/chunk-YHCUE55Z.js",
  "/PeriodicTimer/egg-timer.svg",
  "/PeriodicTimer/egg-timer-large.png",
  "/PeriodicTimer/egg-timer-medium.png",
  "/PeriodicTimer/egg-timer-small.png",
  "/PeriodicTimer/favicon.ico",
  "/PeriodicTimer/index.html",
  "/PeriodicTimer/manifest.webmanifest",
  "/PeriodicTimer/main-HB5X2GH7.js",
  "/PeriodicTimer/polyfills-FFHMD2TL.js",
  "/PeriodicTimer/styles-DQOEOQCN.css"
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
  if (event.request.method != 'GET')
    return;

  // if (event.request.mode === "navigate") {
  //   event.respondWith(caches.match("/"));
  //   return;
  // }

  event.respondWith((async () => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
  
    const response = await fetch(event.request);
  
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }
  
    if (ENABLE_DYNAMIC_CACHING) {
      const responseToCache = response.clone();
      const cache = await caches.open(DYNAMIC_CACHE)
      await cache.put(event.request, response.clone());
    }
  
    return response;
  })());
});
