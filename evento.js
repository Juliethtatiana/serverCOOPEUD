
const { Pool } = require('pg');
var conConfig={
    user: 'postgres',
    host: 'localhost',
    database: 'GestorEventos',
    port: 5432,
  };
  const pool = new Pool(conConfig)
  pool.connect();
 

  

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
function consultarIDEvento(){
    var sentence= 'SELECT k_evento,n_nomevento FROM evento ';
    
        return new Promise((resolve, reject) => {
            pool.query(sentence)
            
        .then(response => {  
           
            
           resolve(response.rows);
           
        })
        .catch(err => {
            
        })
          });
    
}
 function consultarEvento(){
    client.connect();
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