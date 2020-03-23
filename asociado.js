
const { Client } = require('pg');

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'GestorEventos',
    port: 5432,
  }
  const client = new Client(connectionData)
  client.connect();


 function consultarCodigoAsociado(){
    
    var sentence= 'SELECT k_numeroa FROM asociado ';
    return new Promise((resolve, reject) => {
        client.query(sentence)
    .then(response => {  
       

       resolve(response.rows);
      
    })
    .catch(err => {
        
    })
      });
    }

   

    
    

    module.exports.consultarCodigoAsociado=consultarCodigoAsociado;