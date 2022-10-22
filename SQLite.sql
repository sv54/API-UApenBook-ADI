-- SQLite File para manejar la base de datos
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS books;


CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    email TEXT NOT NULL UNIQUE, 
    avatar TEXT, password 
    TEXT NOT NULL, 
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
    FOREIGN KEY (author) REFERENCES author(id));

CREATE TABLE IF NOT EXISTS images(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL);


INSERT INTO users (name,email,avatar,password,admin) VALUES('Juarry', 'user1@ua', 'potter.png','12345',false);
INSERT INTO books (name, language, description) VALUES('Harry Potter 1: La academia', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 2: El legado', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 3: La piedra', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 4: La camara', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 5: El prisionero', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 6: Las reliquias 1', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 7: Las reliquias 2', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 8: Las reliquias 3', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 9: Las reliquias 4', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 10: Bestias', 'Español', 'Ya tu sabs');
INSERT INTO books (name, language, description) VALUES('Harry Potter 11: Bestias 2', 'Español', 'Ya tu sabs');
