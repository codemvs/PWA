((Log)=>{
    /*---- Callback-------*/
    Log("|||||||||||||| Callback ||||||||||||");
    const cuadrado=(value, callback)=>{
        setTimeout(()=>{
            callback(value, value*value)
        }, Math.random()*100);
    }
    
    //callback
    cuadrado(2,(value,result)=>{
        Log("Inico de callback");
        Log(`callaback: ${value}, ${result}`);
        cuadrado(4,(value,result)=>{
            Log(`callaback: ${value}, ${result}`);
            cuadrado(6,(value,result)=>{
                Log(`callaback: ${value}, ${result}`);
                Log("Fin Callback");
                Log("|||||||||||||| Promesas ||||||||||||");
            });
        });        
    });
    
    /*---- Promise-------*/
    const cuadradoP=value=>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve({value:value,result:value*value});
            }, Math.random()*100);
        });        
    }

    cuadradoP(2)
        .then(obj=>{
            Log("Inico de Promise");
            Log(`Promise: ${obj.value}, ${obj.result}`);
            return cuadradoP(4);
        })
        .then(obj=>{
            Log("Inico de Promise");
            Log(`Promise: ${obj.value}, ${obj.result}`);
            return cuadradoP(6);
        })
        .then(obj=>{
            Log("Inico de Promise");
            Log(`Promise: ${obj.value}, ${obj.result}`);   
            Log("Fin Promise");         
        }).catch(err=>Log(err));

})(console.log);