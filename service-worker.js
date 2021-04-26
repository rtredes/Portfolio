const cacheName = 'TredesReiniel'

const staticAssets = [
  '/index.html',
  '/404.html',
  '/favicon.ico',
  '/Css/Main.css',
  '/Images/Lyrics.jpg',
  '/Images/Portfolio.jpg',
  '/Images/Scenery.jpg',
  '/Images/Scenery512.png',
  '/Js/404.js',
  '/Js/Canvas.js',
  '/Js/Containers.js',
  '/Js/Definitions.js',
  '/Js/Home.js',
  '/Js/Main.js',
  '/JSON/Projects.json',
  '/projects/LyricMaker/Css/Main.css',
  '/projects/LyricMaker/Js/LyricMaker.js',
  '/projects/LyricMaker/Js/Main.js',
  '/projects/LyricMaker/index.html',
  '/projects/Scenery/images/1 - cloud.png',
  '/projects/Scenery/images/2 - cloud.png',
  '/projects/Scenery/images/3 - cloud.png',
  '/projects/Scenery/images/4 - cloud.png',
  '/projects/Scenery/images/5 - cloud.png',
  '/projects/Scenery/images/6 - cloud.png',
  '/projects/Scenery/images/7 - cloud.png',
  '/projects/Scenery/images/land1.png',
  '/projects/Scenery/images/land2.png',
  '/projects/Scenery/images/land3.png',
  '/projects/Scenery/images/land4.png',
  '/projects/Scenery/images/land5.png',
  '/projects/Scenery/images/SaM.png',
  '/projects/Scenery/images/samE.png',
  '/projects/Scenery/scripts/Ambient.js',
  '/projects/Scenery/scripts/Cloud.js',
  '/projects/Scenery/scripts/Index.js',
  '/projects/Scenery/scripts/Land.js',
  '/projects/Scenery/scripts/sprites.js',
  '/projects/Scenery/scripts/Star.js',
  '/projects/Scenery/scripts/SunAndMoon.js',
  '/projects/Scenery/scripts/Text.js',
  '/projects/Scenery/styles/Main.css',
  '/projects/Scenery/index.html',
  'https://kit.fontawesome.com/077d2e0cbc.js',
  'https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css',
  'https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css',
  'https://kit-free.fontawesome.com/releases/latest/css/free.min.css',
  'https://fonts.googleapis.com/css2?family=Montserrat&display=swap',
  '/__/firebase/7.8.2/firebase-app.js',
  '/__/firebase/7.8.2/firebase-firestore.js',
  '/__/firebase/7.8.2/firebase-auth.js',
  '/__/firebase/init.js',
]

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName)
  await cache.addAll(staticAssets)
  return self.skipWaiting()
})

self.addEventListener('activate', e => {
  self.clients.claim()
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  )
})