const nats = require('nats').connect();

nats.on('connect',(nats)=>{
    let i =0
    setInterval( function (){
        i++
        const data =  JSON.stringify({
            id: i,
            content_uid: 'bla'
        });
        nats.publish('foo', data, function() {
        
        });
    },3000)

})

   

    
    

  
  