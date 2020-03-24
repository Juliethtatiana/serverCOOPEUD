

  const { Client } = require('pg');

  const connectionData = {
      user: 'postgres',
      host: 'localhost',
      database: 'GestorEventos',
      port: 5432,
    }
    const client = new Client(connectionData)
  
    client.connect();
 function consultarUltimoDetalleInsc(){
 
    var sentence= 'SELECT k_detalleinsc FROM detalle_inscripcion ORDER BY k_detalleinsc DESC LIMIT 1 ';
    return new Promise((resolve, reject) => {
        client.query(sentence)
    .then(response => {       
      resolve(response.rows);
    })
    .catch(err => {
       console.log('error: '+ err)
    })
      });
    }
    function consultarInsc(data){
   
      var sentence= 'SELECT * FROM inscripcion WHERE k_evento = '+data.k_evento;
      console.log(sentence);
      return new Promise((resolve, reject) => {
          client.query(sentence)
      .then(response => {       
        resolve(response.rows);
         
      })
      .catch(err => {
        
      })
        });
      }
      function consultarInscFamiliar(data){
   
        var sentence= 'SELECT k_inscripcion FROM inscripcion WHERE k_numeroa = '+data.k_numeroa;
        console.log(sentence);
        return new Promise((resolve, reject) => {
            client.query(sentence)
        .then(response => {       
          resolve(response.rows);
           
        })
        .catch(err => {
          
        })
          });
        }
   module.exports.consultarInscFamiliar=consultarInscFamiliar;
    module.exports.consultarInsc=consultarInsc;
    module.exports.consultarUltimoDetalleInsc=consultarUltimoDetalleInsc;