const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const select = require('./postgres');

var port=8090;
var appName="Server COOPEUD";
var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log(appName + ' server app listening at http://%s:%s', host, port)
});



app.use(bodyParser.urlencoded({extended:true}));

app.post('/user', (req,res)=>{
  var data={
    email: req.body.username,
    pass: req.body.pass,
  }
  select.validarUsuario(data).then(response => { 
    console.log(response);
    if(response){
      res.send();
    }
   
     
 })
 .catch(err => {
     
 });
  
 
  res.send();
  
})

app.post('/inscribirFamiliar', (req,res)=>{
  console.log(req.body.evento);
})