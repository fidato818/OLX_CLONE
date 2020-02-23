// STEP #3
const cacheName = 'v1';
const cacheAssets = [
    '/',
    './js/app.js',
    './js/home.js',
    './js/messagesjs.js',
    './css/bootstrap.min.css',
    './css/olx.css',
    './pages/signin.html',
    './pages/myads.html',
    './pages/chat.html',
    './pages/adcrte.html',
    'index.html'
];

// STEP #1  
// call install events
self.addEventListener('install', e =>{
    console.log('service worker: installed ')
    
    // STEP #4
    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            cache.addAll(cacheAssets);
            console.log('service worker: All Files added in cachefiles ')
        })
        .then(()=> self.skipWaitiing())
    )
})
// STEP #2
//call activate events
self.addEventListener('activate' , e =>{
    console.log('service worker: activated')
    e.waitUntil(
        caches
        .keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache !== cacheName)
                    console.log('Serice Worker: Cleaning old Caching')
                    return caches.delete(cache)
                })
            )
        })
    )
})

// STEP #5
self.addEventListener('fetch', e =>{
    e.respondWith(
        fetch(e.request).catch(()=> caches.match(e.request)));
    console.log('fetching')
    e.respondWith(fetch(e.request).catch(()=> caches.match(e.request)));
})