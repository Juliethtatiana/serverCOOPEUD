

  
 function validarUsuario(data,client){
    client.connect();
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

    function inscribirAsociado(data){
        var sentence= 'INSERT INTO asociado (k_inscripcion,f_inscripcion,v_valor,i_estado,k_evento,k_tipoa,i_asiste,k_numeroa) VALUES ()';
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
    
    
    module.exports.inscribirAsociado=inscribirAsociado;
    module.exports.select=select;
    module.exports.validarUsuario=validarUsuario;