// Librerias
const express = require('express'); 
const app = express(); 
app.use(express.json()); 


app.get('/', function(req, resp){
    console.log('Abrimos la pagina Home --> Obtener datos de sesion actual si existe y coleccion de libros')
    resp.end()
})

app.listen(3000, function(){
	console.log("Servidor arrancado!!!")
})