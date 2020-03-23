

  
 function consultarIDEvento(client){
   
    var sentence= 'SELECT k_evento,n_nomevento FROM evento ';
    return new Promise((resolve, reject) => {
        client.query(sentence)
    .then(response => {  
           
       resolve(response.rows);
        client.end()
    })
    .catch(err => {
        client.end()
    })
      });
    }

   

    
    

    module.exports.consultarIDEvento=consultarIDEvento;