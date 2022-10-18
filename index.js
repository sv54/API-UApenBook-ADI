// Librerias
const { response } = require('express');
const express = require('express'); 
const app = express(); 
app.use(express.json()); 
const sqlite3 = require('sqlite3').verbose();
var jwt = require('jwt-simple')
var moment = require('moment')
const config = require('./config.js');
// Usar db.close() para cerrar la conexion
// Info sobre sqlite y nodeJs
// https://www.sqlitetutorial.net/sqlite-nodejs/

//SQL Query
// var sql = ('CREATE TABLE IF NOT EXISTS books(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)')
// db.run(sql)
// db.run('INSERT INTO books (name, language, description) VALUES(?, ?, ?)', ['Harry Potter', 'Spanish', 'Pues eso'], function(err){
//     if (err) {
//         return console.log(err.message);
//       }
//       // get the last insert id
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
// })
// db.close((err) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log('Close the database connection.');
//   });
// console.log(db.run('SELECT * FROM books'))
// db.close


//Home
app.get('/', function(req, res){
    res.redirect('/books') 
    //redireccionamos a la pagina principal /books
})


app.get('/books', function(req, res){

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });

    let sql = `SELECT * From books`;
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row);
        });
        res.send({"status" : 200, "libros": rows})
    });
    //res.sendStatus(200); //Enviar tambien libros
});

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

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });

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

      db.close()
})

app.post('/login', function(req,res){

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
    });

    var email = req.body.email
    var password = req.body.password

    var sql = `SELECT password FROM users WHERE email='`+[email]+`'`;
    db.all(sql, function(err,rows){

    if(!err){
        if(!rows[0]){
            res.send({
                mensaje:"Email o contraseña incorrectos.",
                status:403
            })
        }else{
            if(rows[0].password == password){
                var payload = {
                    login:email,
                    exp: moment().add(1,'days').valueOf()
                }
    
                var token = jwt.encode(payload,config.SECRET)
                res.send({
                    mensaje:"OK",
                    jwt: token
                })      
            }else{
                res.send({
                    mensaje:"Email o contraseña incorrectos.",
                    status:403
                })
            }
        }

    }else{
        console.log(err.message)
        res.send({
            mensaje:err.message,
            code:403
        })
    }
    })
})

app.listen(3000, function(){
	console.log("Servidor arrancado!!!")
})