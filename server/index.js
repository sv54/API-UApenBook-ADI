// Librerias
const { response } = require('express');
const express = require('express'); 
var router = express.Router();
const app = express(); 
app.use(express.json()); 
const sqlite3 = require('sqlite3').verbose();
var jwt = require('jwt-simple')
var moment = require('moment')
const config = require('./config.js');
var multer = require('multer');
var mw = require('./middleware.js');
const cors = require('cors')

app.use(cors())


var fileStoregeEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage: fileStoregeEngine});


//Abrimos conexion a la base de datos
let db = new sqlite3.Database('DataBase.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    //console.log('Connected to the SQlite database.');
});


//Home
app.get('/', function (req, res) {
    res.redirect('/books')
    //redireccionamos a la pagina principal /books
})



app.post('/single', upload.single('image'), (req, res) => {
    res.statusCode = 201
    res.send("Single File upload success")
});

// app.post('/multiple', upload.array('image', 3), (req, res) => {
//     res.send("Multiple Files uploadede")
// });


//Obtenemos todos los libros de la BD
//Ejemplo paginacion: localhost:3000/books?page=1&pageSize=4
app.get('/books', function (req, res) {

    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize):0;
    const page = req.query.page ? parseInt(req.query.page):0;
    const startIndex = (page-1)*pageSize;
    const endIndex = page*pageSize;

    const results={}

    var nextPage = page+1
    var prevPage = page-1
    var nextURL= '/books?page='+nextPage+'&pageSize='+pageSize
    var prevURL= '/books?page='+prevPage+'&pageSize='+pageSize

    if (prevPage<=0){
        prevURL=''
    }

    results.status=''
    results.pages = {
        nextURL: nextURL,
        prevURL: prevURL
    }

    let sql = `SELECT * From books`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.statusCode = 500
            res.send({"status": 500, "error": err.message })
        }
        else{
            res.statusCode = 200

            var libros = rows.slice(startIndex,endIndex);

            results['Libros en total']=rows.length;
            results['Libros en esta pagina']=libros.length;
            results['Libros']=libros;

            if(results['Libros en total']<=pageSize*(page-1)+results['Libros en esta pagina']){
                results.pages.nextURL=''
            }

            results.status=200
            console.log(results)
            res.send(results)
        }
        
    });

    
    
});

//Obtenemos un libro en concreto, pasandole id
app.get('/books/:id', function (req, res) {
    const idLibro = req.params.id
    

    let sql = `SELECT * From books WHERE id = ` + idLibro;
    db.all(sql, [], (err, row) => {
        //console.log(row)

        if (JSON.stringify(row) == "[]" || row == undefined) {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro con id " + idLibro + " no existe o ya ha sido eliminado" });
        }
        else{
            res.statusCode = 200
            res.send({ "status": 200, "libro": row })
        }
    });
    

})


//publicamos un libro
app.post('/books', mw.checkJWT, function (req, res) {
    var status = 201
    var message = "Libro ha sido creado"
    var b = req.body

    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token,config.SECRET)

    db.run(`INSERT INTO books(name,year,language,description,cover,pdf,author,user_id) VALUES(?,?,?,?,?,?,?,?)`,
        [b.name, b.year, b.language, b.description, b.cover, b.pdf, b.author, payload.id], function (err) {
            if (err) {
                message = err.message;
                status = 400
            }
            // get the last insert id
            //console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.statusCode = status
            res.send({ "status code": status, "message:": message, "id": this.lastID })
    });

    
})

//Eliminar un libro
app.delete('/books/:id', mw.checkJWT, function(req, res){
    const idLibro = req.params.id
    
    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token,config.SECRET)

    var sql = `SELECT * From books WHERE id = ` + idLibro;
    const emptyjson = {}

    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro no existe o ya ha sido eliminado" });
        }
        else {
            if(row[0].user_id == payload.id || row[0].admin){
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
            }else{
                res.statusCode = 403
                res.send({status:403, "Mensaje": "No tienes permiso para borrar este libro."})
            }
        }
    });
})

//Modificamos un libro existente
app.patch('/books/:id', mw.checkJWT, function (req, res) {
    const idLibro = req.params.id
    var b = req.body

    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token,config.SECRET)

    var sql = `SELECT * From books WHERE id = ` + idLibro;
    const emptyjson = {}
    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro con id " + idLibro + " no existe o ya ha sido eliminado" });
        }
        else {
            
            if(row[0].user_id == payload.id || payload.admin){

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
                        res.statusCode = 200
                        res.send({ status: 200, "Mensaje": "Libro con id " + idLibro + " modificado." })
                    }

                });
            }else{
                res.statusCode = 403
                res.send({status:403, "Mensaje": "No tienes permiso para modificar este libro."})
            }
        }

    });
})

//Registro de usuario
app.post('/register', function(req,res){
    var r = req.body
    var email = r.email
    var name = r.name
    var avatar = r.avatar
    var password = r.password
    var admin = r.admin

    db.run(`INSERT INTO users(name,email,avatar,password,admin) VALUES(?,?,?,?,?)`,[name,email,avatar,password,admin],function (err){
        if (err) {
            res.status=400
            res.send({"status":400,"Mensaje":"Error al registrarse.","Detalles":err.message})
        }else{
            res.status=200
            res.send({"status":200,"Mensaje":"Usuario registrado con exito."})
        }
    })
})

//Login de usuario
app.post('/login', function(req,res){
    var email = req.body.email
    var password = req.body.password

    var sql = `SELECT password,id,admin FROM users WHERE email='`+[email]+`'`;
    db.all(sql, function(err,rows){

    if(!err){
        if(!rows[0]){
            res.send({
                mensaje:"Email o contraseña incorrectos.",
                status:401
            })
        }else{
            if(rows[0].password == password){
                var payload = {
                    id: rows[0].id,
                    login:email,
                    password:password,
                    admin:rows[0].admin
                }
    
                var token = jwt.encode(payload,config.SECRET)
                res.statusCode = 200
                res.send({
                    mensaje:"OK",
                    jwt: token
                })      
            }else{
                res.statusCode = 401
                res.send({
                    mensaje:"Email o contraseña incorrectos.",
                    status:401
                })
            }
        }

    }else{
        console.log(err.message)
        res.statusCode = 500
        res.send({
            mensaje:err.message,
            code:500
        })
    }
    })
})

//Panel de administracion.
//Comprobar que el usuario logeado es un administrador

//Obtener todos los usuarios de la BD
app.get('/users', mw.checkJWT, function (req, res) {
    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token,config.SECRET)

    if(payload.admin){
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
    }else{
        res.statusCode=403
        res.send({"status":403, "Mensaje": "Forbidden"})
    }
});

//Obtenemos un usuario segun su id
app.get('/users/:id', mw.checkJWT, function (req, res) {
    const idUser = req.params.id
    
    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token,config.SECRET)
    
    if(payload.admin || payload.id == idUser){
        let sql = `SELECT * From users WHERE id = ` + idUser;
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
    }else{
        res.statusCode=403
        res.send({"status":403, "Mensaje": "Forbidden"})
    }


})

app.delete('/users/:id', mw.checkJWT, function(req, res){
    const idUser = req.params.id
    
    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token,config.SECRET)

    if(payload.admin || payload.id == idUser){
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
    }else{
        res.statusCode=403
        res.send({"status":403, "Mensaje": "Forbidden"})
    }

})


app.listen(3000, function () {
    console.log("Servidor arrancado")
})