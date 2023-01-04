-- SQLite File para manejar la base de datos
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS books;


CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    email TEXT NOT NULL UNIQUE, 
    avatar TEXT, 
    password TEXT NOT NULL, 
    admin BOOL NOT NULL DEFAULT false);

CREATE TABLE IF NOT EXISTS author(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    year INTEGER, 
    language TEXT NOT NULL, 
    description TEXT NOT NULL, 
    cover TEXT , 
    pdf TEXT,
    author INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (author) REFERENCES author(id));

INSERT INTO users (name,email,avatar,password,admin) VALUES('Juarry', 'user1@ua', 'potter.png','12345',false);
INSERT INTO users (name,email,avatar,password,admin) VALUES('Admin', 'admin@ua', 'dumbledore.png','12345',true);
INSERT INTO users (name,email,avatar,password,admin) VALUES('Marcos', 'marcos@ua', 'python.png','12345',false);

INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 1: La academia', 'Español', 'La academia',1);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 2: El legado', 'Español', 'El legado',1);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 3: La piedra', 'Español', 'La piedra',1);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 4: La camara', 'Español', 'La camara', 3);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 5: El prisionero', 'Español', 'Ya tu sabs', 3);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 6: Las reliquias 1', 'Español', 'Las reliquias 1', 3);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 7: Las reliquias 2', 'Español', 'Las reliquias 2', 3);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 8: Las reliquias 3', 'Español', 'Las reliquias 3', 3);
INSERT INTO books (name, language, description,user_id) VALUES('Harry Potter 9: Las reliquias 4', 'Español', 'Las reliquias 4', 3);
INSERT INTO books (name, language, description) VALUES('Harry Potter 10: Bestias', 'Español', 'Bestias');
INSERT INTO books (name, language, description) VALUES('Harry Potter 11: Bestias 2', 'Español', 'Bestias 2');
