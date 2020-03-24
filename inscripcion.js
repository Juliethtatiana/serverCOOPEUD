

  const { Client } = require('pg');

  const connectionData = {
      user: 'postgres',
      host: 'localhost',
      database: 'GestorEventos',
      port: 5432,
    }
    const client = new Client(connectionData)
  
    client.connect();
 function consultarUltimaInsc(){
   
    var sentence= 'SELECT k_inscripcion FROM inscripcion ';
    return new Promise((resolve, reject) => {
        client.query(sentence)
    .then(response => {       
       if(response.rowCount>0 ){  
           
        resolve(true);
       }else{
        resolve(false);
       }
        client.end()
    })
    .catch(err => {
        client.end()
    })
      });
    }

    module.exports.consultarUltimaInsc=consultarUltimaInsc;