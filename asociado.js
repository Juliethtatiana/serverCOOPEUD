
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

    function validarAsociado(k_numeroa){
    
      var sentence= 'SELECT * FROM asociado WHERE k_numeroa= '+data.k_numeroa;
      return new Promise((resolve, reject) => {
          client.query(sentence)
      .then(response => {  
         
  
         resolve(response.rows);
        
      })
      .catch(err => {
          
      })
        });
      } 
 function incribirAsociado(data){
       var sentence= 'INSERT INTO inscripcion (f_inscripcion, '+
       'v_valor, i_estado, k_evento,k_tipoa,i_asiste,k_numeroa) VALUES ('+
       '\''+data.f_inscripcion+'\',1700.00, \'Activo\','+data.k_evento+',\''+data.k_tipoa+'\',\'S\','+data.k_numeroa+') ';
       console.log(sentence);
    return new Promise((resolve, reject) => {
        client.query(sentence)
    .then(response => {  
       

      resolve(response);
      
    })
    .catch(err => {
        console.log('error: '+err);
    })
      });
    }
 function registrarAsociado(data){
      var sentence= 'INSERT INTO asociado (k_tipoa, k_numeroa, '+
      'n_nomuno, n_nomdos, n_apeuno,n_apedos,f_nacimiento,f_afiliacion,v_suelo'+
      ',o_telefono) VALUES ('+data.k_tipoa+','+data.n_nomuno+','+data.n_nomdos+','+
      data.n_apeuno+','+data.n_apedos+'TO_DATE('+data.f_nacimiento+',\'dd-mon-yyyy\')'+
      '\''+data.f_afiliacion+'\','+data.v_sueldo+','+
      data.o_telefono+') ';
   return new Promise((resolve, reject) => {
      console.log(sentence);
       client.query(sentence)
   .then(response => {  
      

      resolve(true);
     
   })
   .catch(err => {
       
   })
     });
   } 
       
 function consultarK_tipoa(data){
    var sentence= 'SELECT k_tipoa FROM asociado WHERE k_numeroa='+data.k_numeroa;
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


   

   module.exports.registrarAsociado=registrarAsociado;   
    module.exports.consultarK_tipoa=consultarK_tipoa;
    module.exports.incribirAsociado=incribirAsociado;
    module.exports.consultarCodigoAsociado=consultarCodigoAsociado;