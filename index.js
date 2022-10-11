// Librerias
const express = require('express'); 
const app = express(); 
app.use(express.json()); 


app.get('/', function(req, res){
    res.redirect('/books') //redireccionamos a la pagina principal /books
})

app.get('/books', function(req, res){
    console.log('Abrimos la pagina Home --> Obtener datos de sesion actual si existe y coleccion de libros')
    res.end()
})

app.get('/books/:id', function(req, res){
    const idLibro = req.params.id
    
    console.log('Abrimos la pagina de un libro')
    res.end()
})


app.post('/')

app.listen(3000, function(){
	console.log("Servidor arrancado!!!")
})