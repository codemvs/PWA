const CACHE_NAME = 'pwa-demo-edteam-cache-v1',
    urlsToCache=[
        '/',
        './',
        './?tum=homescreen',
        './index.html',
        '.index/?tum=homescreen',
        './app.css',
        './app.js',
        './sw.js',
        './img/ico5.ico',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
    ];

self.addEventListener("install",e=>{
    console.log("Evento : SW Instalado");
    //registro de cache
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            console.log("archivos en cache");
            return cache.addAll(urlsToCache);
        })
        .catch(err=>console.log("Fallo el registro de cache",err))
    );
});

self.addEventListener("activate",e=>{
    console.log("Evento: SW Active");    
    const cacheList=[CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cachesNames=>{ //depurar cache
            return Promise.all(
                cachesNames.map(cacheName=>{
                    if(cacheList.indexOf(cacheName)===-1){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(()=>{ //mensaje de aviso
            console.log("El cache está listo y actualizado");
            return self.clients.claim();
        })
    );
});

self.addEventListener("fetch",e=>{
    console.log("Evento: SW Recuperado");
    e.respondWith(
        caches.match(e.request)
        .then(res=>{
            if(res){
                return res
            }
            return fetch( res )
                    .then(res=>{
                        let resToCache=res.clone();
                        caches.open(cacheName)
                        .then(cache=>{
                            cache.put(request, resToCache)
                            .catch(err=>console.log(`${request.url}: ${err.message}`))
                        })
                        return res    
                    })
                    
        })
    );
}); 