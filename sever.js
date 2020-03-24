const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const select = require('./postgres');
const evento = require('./evento');
const asociado = require('./asociado');


var port=8090;
var appName="Server COOPEUD";
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(appName + ' server app listening at http://%s:%s', host, port)
});


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use(bodyParser.urlencoded({extended:true}));

app.post('/user', (req,res)=>{
  var data={
    email: req.body.username,
    pass: req.body.pass,
  }
  select.validarUsuario(data).then(response => { 
    
    if(response){
      res.send('OK');
    }
   
     
 })
 .catch(err => {
     
 });
  
  res.send();
  
})
app.post('/registrar_evento', (req,res)=>{
  var data={
    n_nomevento: req.body.n_nomevento, 
    o_descripcion:req.body.o_descripcion,
    o_lugar:req.body.o_lugar,
    f_inicio:req.body.f_inicio,
    f_fin:req.body.f_fin,
    f_maxinsc: req.body.f_maxinsc,
    v_total: req.body.v_total,
   o_obs: req.body.o_obs,
   q_maxparticipantes:req.body.q_maxparticipantes,
   f_maxcancel:req.body.f_maxcancel,
   i_copago:req.body.i_copago,
   i_pago:req.body.i_pago,
   v_copago:req.body.v_copago,
   q_cuotasmax:req.body.q_cuotasmax,
   k_tipo:req.body.k_tipo,
   k_proveedor:req.body.k_proveedor,
   p_subsidio:req.body.p_subsidio
  }
  console.log(JSON.stringify(data));
  evento.crearK_evento().then(response => {    
    data.k_evento=response[0].k_evento+1;
    evento.crearEvento(data).then(response=>{
      console.log('revisa si hay copago '+ data.i_copago);
      if(data.i_copago){
        console.log('copagoooo');
        evento.crearCaracteristicas(data).then(response=>{
          if(response){
            res.send('evento con copago creado');
          }
        })
      }else{
        res.send('evento creado');
      }
    })
  })
})
app.post('/inscribirFamiliar', (req,res)=>{
  console.log(req.body.evento);
})
app.post('/consultarTipoEvento', (req,res)=>{
  evento.consultarTipo().then(response => { 
    res.send(response); 
  }) 
})
app.post('/consultarProveedor', (req,res)=>{
  evento.consultarProveedor().then(response => { 
    res.send(response); 
  }) 
})

app.post('/inscribirFamiliar', (req,res)=>{
  console.log(req.body.evento);
})
app.post('/asociado', (req,res)=>{
  var data={
    k_tipoa: req.body.k_tipoa, 
    k_numeroa: req.body.k_numeroa, 
    n_nomuno:req.body.n_nomuno,
    n_nomdos:req.body.n_nomdos,
    n_apeuno:req.body.n_apeuno,
    n_apedos:req.body.n_apedos,
    o_telefono: req.body.o_telefono,
    f_nacimiento:req.body.f_nacimiento,
   f_afiliacion: req.body.f_afiliacion,
     v_sueldo: req.body.v_sueldo
  }
  asociado.validarAsociado(data.k_numeroa).then(response => { 
    if(response>0){
      res.send('el asociado ya se encuentra registrado');
    }else{
      asociado.registrarAsociado(data).then(response => {
        res.send('usuario registrado exitosamente');
       })
    }
  }) 
})
app.post('/consultarIDEvento', (req,res)=>{
  evento.consultarIDEventoActivo().then(response => { 
    res.send(response); 
  })  
})
app.post('/consultarIDAsociado', (req,res)=>{
 asociado.consultarCodigoAsociado().then(response => { 
    res.send(response); 
  })  
})
app.post('/insc_evento_asociado', (req,res)=>{
 // console.log(req.body);
 today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth()+1; //As January is 0.
 var yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;
  var data={
    k_numeroa: req.body.k_numeroa,
    k_evento: req.body.k_evento,
    f_inscripcion:today
  }
  asociado.consultarK_tipoa(data).then(response =>{
    data.k_tipoa=response[0].k_tipoa;
    asociado.incribirAsociado(data).then(response => { 
      if(response){
        console.log('holii');
        res.send('Asociado inscrito exitosamente');
      }
    })
  })
    
})