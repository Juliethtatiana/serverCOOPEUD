  const { Client } = require('pg');

  const connectionData = {
      user: 'postgres',
      host: 'localhost',
      database: 'GestorEventos',
      port: 5432,
    }
    const client = new Client(connectionData)
  
    client.connect();

    function validarInscripcion(data){

      var sentence= 'SELECT * FROM detalle_inscripcion WHERE k_numerof= '+data.k_numerof ;
      console.log();
      return new Promise((resolve, reject) => {
          client.query(sentence)
      .then(response => {  
         
  
         resolve(response.rowCount);
        
      })
      .catch(err => {
          console.log(err);
      })
        });
      }

    function consultarIDFamiliar(data){
   
      var sentence= 'SELECT k_numerof,k_tipof FROM familiar WHERE k_numeroa = '+data.k_numeroa;
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

    function inscribirFamiliar(data){
   
        var sentence= 'INSERT INTO detalle_inscripcion VALUES ('+data.k_detalleinsc+','+
        data.k_inscripcion+',\''+data.k_tipof+'\','+data.k_numerof+')';
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
    module.exports.validarInscripcion=validarInscripcion;
    module.exports.inscribirFamiliar=inscribirFamiliar;
    module.exports.consultarIDFamiliar=consultarIDFamiliar;    