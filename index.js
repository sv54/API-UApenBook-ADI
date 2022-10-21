// Librerias
const { response } = require('express');
const express = require('express'); 
var router = express.Router();
const app = express(); 
app.use(express.json()); 
const sqlite3 = require('sqlite3').verbose();
var jwt = require('jwt-simple')
var moment = require('moment')
<<<<<<< HEAD
const config = require('./config.js');
var multer = require('multer');


var fileStoregeEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage: fileStoregeEngine});
=======
var config = require('./config.js');
var mw = require('./middleware.js');

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
>>>>>>> c8001dc7720a47c15876bf8ead42db4a80a32e46


//Home
app.get('/', function (req, res) {
    res.redirect('/books')
    //redireccionamos a la pagina principal /books
})




app.post('/single', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send("Single File upload success")
});

// app.post('/multiple', upload.array('image', 3), (req, res) => {
//     res.send("Multiple Files uploadede")
// });


//Obtenemos todos los libros de la BD
//Falta por hacer:
//paginacion --> Obtener x libros por cada pagina
app.get('/books', function (req, res) {

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });

    let sql = `SELECT * From books`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.statusCode = 500
            res.send({"status": 500, "error": err.message })
        }
        else{
            res.statusCode = 200
            res.send({ "status": 200, "libros": rows })
        }
        // rows.forEach((row) => {
        //     console.log(row);
        // });
        
    });
    db.close()
});

//Obtenemos un libro en concreto, pasandole id
app.get('/books/:id', function (req, res) {
    const idLibro = req.params.id
    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });

    let sql = `SELECT * From books WHERE id = ` + idLibro;
    db.all(sql, [], (err, row) => {
        console.log(row)

        if (JSON.stringify(row) == "[]" || row == undefined) {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro con id " + idLibro + " no existe o ya ha sido eliminado" });
        }
        else{
            res.statusCode = 200
            res.send({ "status": 200, "libro": row })
        }
    });
    db.close()

})


//publicamos un libro
//Falta por hacer
//Comprobacion de si el usuario esta logeado y tiene permisos
app.post('/books', mw.checkJWT, function (req, res) {
    var status = 201
    var message = "Libro ha sido creado"
    var b = req.body

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });

    //Aqui comprobar si el usuario esta autorizado a hacer la petcion primero (esta logeado)
    //res.send({"status": 401, "message" : "User must be logged in"});

    db.run(`INSERT INTO books(name,year,language,description,cover,pdf,author) VALUES(?,?,?,?,?,?,?)`,
        [b.name, b.year, b.language, b.description, b.cover, b.pdf, b.author], function (err) {
            if (err) {
                message = err.message;
                status = 400
            }
            // get the last insert id
            //console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.statusCode = status
            res.send({ "status code": status, "message:": message, "id": this.lastID })
        });

    db.close()
})

//Eliminar un libro
//Falta por hacer
//Comprobacion de si el usuario esta logeado y tiene permisos
app.delete('/books/:id', mw.checkJWT, function(req, res){
    const idLibro = req.params.id
    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });

    //Comprobar si el usuario esta autorizado a hacer delete primero!
    //Debe ser usuario que ha subido el libro o administrador
    //res.send({"status": 403, "message" : "Forbidden"});
    //

    //Comprobamos que el libro existe
    var sql = `SELECT * From books WHERE id = ` + idLibro;
    const emptyjson = {}

    

    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro no existe o ya ha sido eliminado" });
        }
        else {
            sql = `DELETE FROM books WHERE id = ` + idLibro;
            db.all(sql, [], (err, row) => {
                if (err) {
                    res.statusCode = 500
                    res.send({ "status": 500, "message": "Error al eliminar libro" });

                } else {
                    res.statusCode = 200
                    res.send({ status: 200, "Mensaje": "Libro con id " + idLibro + " borrado." })
                }

            });
        }
    });



    db.close()

})

//Modificamos un libro existente
//Falta por hacer
//Comprobacion de si el usuario esta logeado y tiene permisos
app.patch('/books/:id', mw.checkJWT, function (req, res) {
    const idLibro = req.params.id
    var b = req.body

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });

    //Comprobar si el usuario esta autorizado a hacer la peticion primero!
    //res.send({"status": 403, "message" : "Forbidden"});
    //

    //Comprobamos que el libro existe
    var sql = `SELECT * From books WHERE id = ` + idLibro;
    const emptyjson = {}
    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro no existe o ya ha sido eliminado" });
        }
        else {
            sql = 'UPDATE books SET name = "' + b.name + '", year =' + b.year + ', language ="' + b.language +
                '", description ="' + b.description + '", cover ="' + b.cover + '",pdf ="' + b.pdf + '"';
            if (Number.isInteger(b.author)){
                sql = sql + ',author =' + b.author
            }
            else{
                sql = sql + ',author = NULL'
            }
            sql = sql  + ' WHERE id =' + idLibro

            

            db.all(sql, [], (err, row) => {
                if (err) {
                    res.statusCode = 404
                    res.send({ "status": 404, "message": err });

                } else {
                    res.statusCode = 404
                    res.send({ status: 200, "Mensaje": "Libro con id " + idLibro + " modificado." })
                }

            });
        }
    });


    db.close()

})


//Login de usuario
app.post('/login', function(req,res){

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
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
                    password:password
                }
    
                var token = jwt.encode(payload,config.SECRET)
                res.statusCode = 200
                res.send({
                    mensaje:"OK",
                    jwt: token
                })      
            }else{
                res.statusCode = 403
                res.send({
                    mensaje:"Email o contraseña incorrectos.",
                    status:403
                })
            }
        }

    }else{
        console.log(err.message)
        res.statusCode = 403
        res.send({
            mensaje:err.message,
            code:403
        })
    }
    })
})

//Panel de administracion.
//Comprobar que el usuario logeado es un administrador

//Obtener todos los usuarios de la BD
app.get('/users', mw.checkJWT, function (req, res) {

    //Comprobar si el usuario logeado es admin!
    //res.send({"status": 403, "message" : "Forbidden"});

    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });

    

    let sql = `SELECT * From users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.statusCode = 500
            res.send({ "status": 500, "error": err });
        }
        else{
            res.statusCode = 200
            res.send({ "status": 200, "users": rows })
        }

    });
    db.close()
});

//Obtenemos un usuario segun su id
app.get('/users/:id', mw.checkJWT, function (req, res) {

    //Comprobar si el usuario logeado es admin!
    //res.send({"status": 403, "message" : "Forbidden"});

    const idLibro = req.params.id
    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });

    let sql = `SELECT * From users WHERE id = ` + idLibro;
    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El user no existe o ya ha sido eliminado" });
        }
        else{
            res.statusCode = 200
            res.send({ "status": 200, "user": row })
        }
    });
    db.close()

})

app.delete('/users/:id', mw.checkJWT, function(req, res){

    //Comprobar si el usuario esta autorizado a hacer delete primero!
    //Debe ser usuario que ha subido el libro o administrador
    //res.send({"status": 403, "message" : "Forbidden"});
    //

    const idUser = req.params.id
    let db = new sqlite3.Database('DataBase.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Connected to the SQlite database.');
    });


    //Comprobamos que el libro existe
    var sql = `SELECT * FROM users WHERE id = ` + idUser;
    

    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El usuario no existe o ya ha sido eliminado" });
        }
        else {
            sql = `DELETE FROM users WHERE id = ` + idUser;
            db.all(sql, [], (err, row) => {
                if (err) {
                    res.statusCode = 500
                    res.send({ "status": 500, "message": "Error interno al eliminar usuario" });

                } else {
                    res.statusCode = 200
                    res.send({ status: 200, "Mensaje": "Usuario con id " + idUser + " borrado." })
                }

            });
        }
    });



    db.close()

})


app.listen(3000, function () {
    console.log("Servidor arrancado")
})