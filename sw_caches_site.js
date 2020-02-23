// STEP #3
const cacheName = 'v2';

// STEP #1
// call install events
self.addEventListener('install', e =>{
    console.log('service worker: installed ')
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
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const resClone = res.clone()
            caches.open(cacheName)
            .then(cache => {
                cache.put(e.request, resClone)
            })
            return res
        }).catch(err => caches.match(e.request).then(res => res))
    );
})