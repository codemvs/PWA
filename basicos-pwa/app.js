if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./sw.js')
                 .then(registration=>{
                    console.log(registration);
                    console.log("Serice Worker registrado con éxito!",
                        registration.scope
                    );
                 })
                 .catch(err=>console.log("Registro de service worker fallido", err));
    });
}