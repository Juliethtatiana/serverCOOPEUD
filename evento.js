
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
function consultarIDEventoActivo(){
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
function crearK_evento(){
  var sentence= 'SELECT k_evento FROM evento ORDER BY k_evento DESC LIMIT 1 ';
  
  return new Promise((resolve, reject) => {
      pool.query(sentence)
      
  .then(response => {      
     resolve(response.rows);
     
  })
  .catch(err => {
      console.log('error: '+ err);
  })
    });
}
function crearCaracteristicas(data){
  var sentence= 'INSERT INTO caracteristica (k_evento,i_pago,v_copago,'+
  'q_cuotasmax,p_subsidio) VALUES ('+data.k_evento+',\''+data.i_pago+'\','+
  data.v_copago+','+data.q_cuotasmax+','+data.p_subsidio+')';
  console.log(sentence);
  return new Promise((resolve, reject) => {
      pool.query(sentence)
  .then(response => {           
     resolve('ok');
  })
  .catch(err => {
      console.log('error: '+err);
  })
    });
}
function consultarProveedor(){
  var sentence= 'SELECT * FROM proveedor ';
    
  return new Promise((resolve, reject) => {
      pool.query(sentence)
  .then(response => {           
     resolve(response.rows);
  })
  .catch(err => {
      console.log('error: '+err);
  })
    });

}
function consultarTipo(){
  var sentence= 'SELECT k_tipo,n_nomtipo FROM tipo ';
    
  return new Promise((resolve, reject) => {
      pool.query(sentence)     
  .then(response => {   
     resolve(response.rows);    
  })
  .catch(err => {
      
  })
    });

}
function crearEvento(data){
  var sentence= 'INSERT INTO evento (k_evento,n_nomevento,o_descripcion,o_lugar,'+
  'f_inicio,f_fin,f_cierre,f_maxinsc,v_total,o_obs,i_estado,i_sobrecupo,f_maxcancel,'+
  'q_maxparticipantes,i_inscripcion,k_tipo,k_proveedor) VALUES('+data.k_evento+
  ',\''+data.n_nomevento+'\',\''+data.o_descripcion+'\',\''+data.o_lugar+'\''+
  ',\''+data.f_inicio+'\',\''+data.f_fin+'\',NULL,\''+data.f_maxinsc+'\''+
  ','+data.v_total+',\''+data.o_obs+'\',\'Activo\',\'No\',\''+data.f_maxcancel+'\','+data.q_maxparticipantes+
  ',\'Si\','+data.k_tipo+','+data.k_proveedor+')';
  console.log(sentence);
      return new Promise((resolve, reject) => {
          pool.query(sentence)
          
      .then(response => {  
        
         resolve(response.rows);
         
      })
      .catch(err => {
          console.log('error: '+ err);
      })
        });
  
}
module.exports.crearCaracteristicas=crearCaracteristicas;
module.exports.crearEvento=crearEvento;
module.exports.consultarProveedor=consultarProveedor;
module.exports.consultarTipo=consultarTipo;
module.exports.crearK_evento=crearK_evento;
    module.exports.consultarIDEventoActivo=consultarIDEventoActivo;