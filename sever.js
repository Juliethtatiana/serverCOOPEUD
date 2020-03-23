const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const select = require('./postgres');
const evento = require('./evento');
const { Client } = require('pg');

const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'GestorEventos',
    port: 5432,
  }
  const client = new Client(connectionData)



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
 client.connect();
app.post('/user', (req,res)=>{
  var data={
    email: req.body.username,
    pass: req.body.pass,
  }
  select.validarUsuario(data, client).then(response => { 
    
    if(response){
      res.send('OK');
    }
   
     
 })
 .catch(err => {
     
 });
  
  res.send();
  
})

app.post('/inscribirFamiliar', (req,res)=>{
  console.log(req.body.evento);
})

app.post('/consultarEvento', (req,res)=>{
  var res;
  evento.consultarIDEvento(client).then(response => { 
    res.send(response); 
  })  

})
app.post('/insc_evento_asociado', (req,res)=>{
  var data={
    employeCode: req.body.employeCode,
    eventID: req.body.eventID,
    payMeth: req.body.payMeth
  }
  select.inscribirAsociado(data).then(response => { 
    console.log(response);
    if(response){
      res.send('OK');
    }
  })   
})