// Librerias
const express = require('express'); 
const app = express(); 
app.use(express.json()); 
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('DataBase.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});
// Usar db.close() para cerrar la conexion
// Info sobre sqlite y nodeJs
// https://www.sqlitetutorial.net/sqlite-nodejs/

//SQL Query
// var sql = ('CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)')
// db.run(sql)
// db.run('INSERT INTO books (name) VALUES(?)', ['Harry Potter'], function(err){
//     if (err) {
//         return console.log(err.message);
//       }
//       // get the last insert id
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
// })
// console.log(db.run('SELECT * FROM books'))
// db.close


//Home
app.get('/', function(req, res){
    res.redirect('/books') 
    //redireccionamos a la pagina principal /books
})


app.get('/books', function(req, res){
    console.log('Abrimos la pagina Home --> Obtener datos de sesion actual si existe y coleccion de libros')

    var libros = db.run('SELECT * FROM books')
    console.log(libros)
    res.send(libros)
})

app.get('/books/:id', function(req, res){
    const idLibro = req.params.id //recuperamos el id que se nos pasa como parametro

    console.log('Abrimos la pagina de un libro')
    res.end()
})


app.post('/books', function(req,res){
    var status=200
    var message="ok"
    //var datos = JSON.parse(req)
    console.log(req.body.nombre)
    var b = req.body

    db.run(`INSERT INTO books(name,year,language,description,cover,pdf,author) VALUES(?,?,?,?,?,?,?)`, 
    [b.name,b.year,b.language,b.description,b.cover,b.pdf,b.author], function(err) {
        if (err) {
            message = err.message;
            status = 400
            console.log("err:",err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);

        res.send({"status code":status,
    "message:":message})
      });
})

app.listen(3000, function(){
	console.log("Servidor arrancado!!!")
})