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
const cors = require('cors');
const { ERROR } = require('sqlite3');

app.use(cors())

var todosLibros;



var fileStoregeEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        let type = file.mimetype.split("/")[1]
        cb(null, file.fieldname + '-' + Date.now() + "." + type)
    }
});

// const upload = multer({ storage: fileStoregeEngine })
const upload = multer({dest: "uploads/"})


//Abrimos conexion a la base de datos
let db = new sqlite3.Database('DataBase.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    //console.log('Connected to the SQlite database.');
});

function updateTodosLibros() {
    let sql = 'SELECT * From books';

    db.all(sql, [], (err, rows) => {

        if (err) {
            throw new Error(err.message)
        }
        else {
            todosLibros = rows
        }
    });
}


//Home
app.get('/', function (req, res) {
    res.redirect('/books')
    //redireccionamos a la pagina principal /books
})

app.post('/upload', upload.single("image"),uploadFile);

function uploadFile(req, res){
    console.log(req.body)
    console.log(req.image)
    res.status = 200
    res.send({message: "uploaded"})
}

app.post('/single', (req, res) => {
    console.log(req)
    upload(req,res, (err) => {
        if(err) {
            res.status(400).send("Something went wrong!");
        }
        res.send(req.file);
    })


});

// app.post('/multiple', upload.array('image', 3), (req, res) => {
//     res.send("Multiple Files uploadede")
// });

app.get('/updateTodosLibros', function (req, res) {

    let sql = 'SELECT * From books';

    db.all(sql, [], (err, rows) => {

        if (err) {
            res.statusCode = 500
            res.send({ "status": 500, "error": err.message })
        }
        else {
            todosLibros = rows
            res.statusCode = 200
            console.log(rows)
            res.send({ "libro": todosLibros })
        }
    });
});


//Obtenemos todos los libros de la BD
//Ejemplo paginacion: localhost:3000/books?page=1&pageSize=4
app.get('/books', function (req, res) {

    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const results = {}

    var nextPage = page + 1
    var prevPage = page - 1
    var nextURL = '/books?page=' + nextPage + '&pageSize=' + pageSize
    var prevURL = '/books?page=' + prevPage + '&pageSize=' + pageSize

    if (prevPage <= 0) {
        prevURL = ''
    }

    results.status = ''
    results.pages = {
        nextURL: nextURL,
        prevURL: prevURL
    }

    // let sql = `SELECT * From books`;

    var librosADevolver = todosLibros.slice(startIndex, endIndex);
    res.status = 200
    if (todosLibros.length <= pageSize * (page - 1) + librosADevolver.length) {
        results.pages.nextURL = ''
    }
    console.log(todosLibros)
    console.log(librosADevolver)

    res.send({ 'libros': librosADevolver, 'total': todosLibros.length, 'pageSize': pageSize, 'pages': results.pages, 'status': res.status })


    //No podemos recuperar todos los libros cada vez que realizamos una peticion!

    // db.all(sql, [], (err, rows) => {
    //     if (err) {
    //         res.statusCode = 500
    //         res.send({"status": 500, "error": err.message })
    //     }
    //     else{
    //         res.statusCode = 200

    //         var libros = rows.slice(startIndex,endIndex);
    //         results['Libros en total']=rows.length;
    //         results['Libros en esta pagina']=libros.length;
    //         results['Libros']=libros;

    //         if(results['Libros en total']<=pageSize*(page-1)+results['Libros en esta pagina']){
    //             results.pages.nextURL=''
    //         }

    //         results.status=200
    //         console.log(results)
    //         res.send(results)
    //     }

    // });



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
        else {
            res.statusCode = 200
            console.log(row)
            res.send({ "status": 200, "libro": row })
        }
    });


})

//Obtenemos libros con la barra de busqueda
app.get('/search/:name/:page', function (req, res) {
    const strSearch = req.params.name
    const page = req.params.page
    var booksSearch = []

    for(let i = 0; i<todosLibros.length; i++){
        booksName = todosLibros[i].name.toLowerCase()
        if(booksName.includes(strSearch.toLowerCase())){
            booksSearch.push(todosLibros[i])
        }
    }
    let message = ''
    if(booksSearch.length == 0){
        message = "No se ha encontrado ningun libro"
        res.status = 204

    }
    else{
        res.status = 200
        message = 'OK'
    }

    const startIndex = (page - 1) * 8;
    const endIndex = page * 8;

    let returnBooks = booksSearch.slice(startIndex, endIndex);
    res.send({status: res.status, books: returnBooks, message: message, total: booksSearch.length})
})



//publicamos un libro
app.post('/books', mw.checkJWT, function (req, res) {
    var status = 201
    var message = "Libro ha sido creado"
    var b = req.body

    // var token = mw.getTokenFromAuthHeader(req)
    // var payload = jwt.decode(token,config.SECRET)
    
    var payload = 0 //borrar una vez implementado el login

    db.run(`INSERT INTO books(name,year,language,description,cover,pdf,author,user_id) VALUES(?,?,?,?,?,?,?,?)`,
        [b.name, b.year, b.language, b.description, b.cover, b.pdf, b.author, payload.id], function (err) {
            if (err) {
                message = err.message;
                status = 400
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.status = status
            updateTodosLibros();
            res.send({ "status": status, "message:": message, "id": this.lastID })
        });


})

//Eliminar un libro
app.delete('/books/:id', mw.checkJWT, function (req, res) {
    const idLibro = req.params.id

    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token, config.SECRET)

    var sql = `SELECT * From books WHERE id = ` + idLibro;
    const emptyjson = {}

    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro no existe o ya ha sido eliminado" });
        }
        else {
            if (row[0].user_id == payload.id || row[0].admin) {
                sql = `DELETE FROM books WHERE id = ` + idLibro;
                db.all(sql, [], (err, row) => {
                    if (err) {
                        res.statusCode = 500
                        res.send({ "status": 500, "message": "Error al eliminar libro" });

                    } else {
                        updateTodosLibros();
                        res.statusCode = 200
                        res.send({ status: 200, "message": "Libro con id " + idLibro + " borrado." })
                    }

                });
            } else {
                res.statusCode = 403
                res.send({ status: 403, "message": "No tienes permiso para borrar este libro." })
            }
        }
    });
})

//Modificamos un libro existente
app.patch('/books/:id', mw.checkJWT, function (req, res) {
    const idLibro = req.params.id
    var b = req.body

    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token, config.SECRET)

    var sql = `SELECT * From books WHERE id = ` + idLibro;
    const emptyjson = {}
    db.all(sql, [], (err, row) => {
        if (JSON.stringify(row) == "[]") {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El libro con id " + idLibro + " no existe o ya ha sido eliminado" });
        }
        else {

            if (row[0].user_id == payload.id || payload.admin) {

                sql = 'UPDATE books SET name = "' + b.name + '", year =' + b.year + ', language ="' + b.language +
                    '", description ="' + b.description + '", cover ="' + b.cover + '",pdf ="' + b.pdf + '"';
                if (Number.isInteger(b.author)) {
                    sql = sql + ',author =' + b.author
                }
                else {
                    sql = sql + ',author = NULL'
                }
                sql = sql + ' WHERE id =' + idLibro



                db.all(sql, [], (err, row) => {
                    if (err) {
                        res.statusCode = 404
                        res.send({ "status": 404, "message": err });

                    } else {
                        updateTodosLibros();
                        res.statusCode = 200
                        res.send({ status: 200, "message": "Libro con id " + idLibro + " modificado." })
                    }

                });
            } else {
                res.statusCode = 403
                res.send({ status: 403, "message": "No tienes permiso para modificar este libro." })
            }
        }

    });
})

//Registro de usuario
app.post('/register', function (req, res) {
    var r = req.body
    var email = r.email
    var name = r.name
    var avatar = r.avatar
    var password = r.password
    var admin = r.admin

    db.run(`INSERT INTO users(name,email,avatar,password,admin) VALUES(?,?,?,?,?)`, [name, email, avatar, password, admin], function (err) {
        if (err) {
            res.status = 400
            res.send({ "status": 400, "message": "Error al registrarse. Usuario con este email ya existe!", "Detalles": err.message })
        } else {
            res.status = 200
            res.send({ "status": 200, "message": "Usuario registrado con exito." })
        }
    })
})

//Login de usuario
app.post('/login', function (req, res) {
    var email = req.body.email
    var password = req.body.password
    console.log(req.body)
    var sql = `SELECT password,id,admin FROM users WHERE email='` + [email] + `'`;
    db.all(sql, function (err, rows) {

        if (!err) {
            if (!rows[0]) {
                res.send({
                    message: "Email o contraseña incorrectos.",
                    status: 401
                })
            } else {
                if (rows[0].password == password) {
                    var payload = {
                        id: rows[0].id,
                        login: email,
                        password: password,
                        admin: rows[0].admin
                    }

                    var token = jwt.encode(payload, config.SECRET)
                    res.status = 200
                    res.send({
                        message: "OK",
                        jwt: token,
                        status: 200
                    })
                } else {
                    res.status = 401
                    res.send({
                        message: "Email o contraseña incorrectos.",
                        status: 401
                    })
                }
            }

        } else {
            console.log(err.message)
            res.statusCode = 500
            res.send({
                message: err.message,
                code: 500
            })
        }
    })
})

//Panel de administracion.
//Comprobar que el usuario logeado es un administrador

//Obtener todos los usuarios de la BD
app.get('/users', mw.checkJWT, function (req, res) {
    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token, config.SECRET)

    if (payload.admin) {
        let sql = `SELECT * From users`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                res.statusCode = 500
                res.send({ "status": 500, "error": err });
            }
            else {
                res.statusCode = 200
                res.send({ "status": 200, "users": rows })
            }

        });
    } else {
        res.statusCode = 403
        res.send({ "status": 403, "message": "Forbidden" })
    }
});

//Obtenemos un usuario segun su id
app.get('/users/:id', mw.checkJWT, function (req, res) {
    const idUser = req.params.id

    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token, config.SECRET)

    if (payload.admin || payload.id == idUser) {
        let sql = `SELECT * From users WHERE id = ` + idUser;
        db.all(sql, [], (err, row) => {
            if (JSON.stringify(row) == "[]") {
                res.statusCode = 404
                res.send({ "status": 404, "message": "El user no existe o ya ha sido eliminado" });
            }
            else {
                res.statusCode = 200
                res.send({ "status": 200, "user": row })
            }
        });
    } else {
        res.statusCode = 403
        res.send({ "status": 403, "message": "Forbidden" })
    }


})

app.delete('/users/:id', mw.checkJWT, function (req, res) {
    const idUser = req.params.id

    var token = mw.getTokenFromAuthHeader(req)
    var payload = jwt.decode(token, config.SECRET)

    if (payload.admin || payload.id == idUser) {
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
                        res.send({ status: 200, "message": "Usuario con id " + idUser + " borrado." })
                    }

                });
            }
        });
    } else {
        res.statusCode = 403
        res.send({ "status": 403, "message": "Forbidden" })
    }

})


app.listen(3000, function () {
    console.log("Servidor arrancado")
    updateTodosLibros()
})


//Obtener todos los AUTORES de la BD
app.get('/authors', mw.checkJWT, function (req, res) {
    // var token = mw.getTokenFromAuthHeader(req)
    // var payload = jwt.decode(token,config.SECRET)
    var payload = 0
    let sql = `SELECT * From author`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.statusCode = 500
            res.send({ "status": 500, "error": err });
        }
        else{
            res.statusCode = 200
            res.send({ "status": 200, "authors": rows })
        }

    });

});

app.post('/authors', mw.checkJWT, function (req, res) {
    var status = 201
    var message = "Autor ha sido creado"
    var b = req.body

    // var token = mw.getTokenFromAuthHeader(req)
    // var payload = jwt.decode(token,config.SECRET)
    
    var payload = 0 //borrar una vez implementado el login

    db.run(`INSERT INTO author(name) VALUES(?)`,
        [b.name], function (err) {
            if (err) {
                message = err.message;
                status = 400
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            res.statusCode = status
            res.send({ "status code": status, "message:": message, "id": this.lastID })
    });

    
})

app.get('/authors/:id', function (req, res) {
    const idLibro = req.params.id
    

    let sql = `SELECT * From author WHERE id = ` + idLibro;
    db.all(sql, [], (err, row) => {
        //console.log(row)

        if (JSON.stringify(row) == "[]" || row == undefined) {
            res.statusCode = 404
            res.send({ "status": 404, "message": "El autor con id " + idLibro + " no existe o ya ha sido eliminado" });
        }
        else{
            res.statusCode = 200
            console.log(row)
            res.send({ "status": 200, "author": row })
        }
    });
    

})