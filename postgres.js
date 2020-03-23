const { Client } = require('pg');

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'GestorEventos',
    port: 5432,
  }
  const client = new Client(connectionData)



  client.connect();
 function validarUsuario(data){
    var sentence= 'SELECT * FROM usuarios WHERE email= \''+data.email+'\' AND password= \''+data.pass+'\'';
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

     function select(username){
    var sentence= 'SELECT * FROM usuarios ';
    client.query(sentence)
    .then(response => {
        console.log(response.rows)
        client.end()
    })
    .catch(err => {
        client.end()
    })
     
    }
    module.exports.select=select;
    module.exports.validarUsuario=validarUsuario;