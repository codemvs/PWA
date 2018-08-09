var iniciar = $("#iniciar"),
    detener=$("#detener"),
    miworker=undefined,
    num=0;
var miblob = new Blob([$("#workerScript").text()]),
    bloburl=window.URL.createObjectURL(miblob);

iniciar.on("click",()=>{
    miworker = new Worker(bloburl);
    miworker.postMessage(num);
    miworker.onmessage=(e)=>{
        num=e.data;
        $("#numero").text(num);
    }
});
detener.on("click",()=>{
    miworker.terminate();
    miworker = undefined;
})   
