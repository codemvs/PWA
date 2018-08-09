var num;
self.addEventListener("message",e=>{
    num = e.data;
});

var sumar = ()=>{
    num++;
    postMessage(num);
};
setInterval("sumar()",500);