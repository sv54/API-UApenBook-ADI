-- SQLite File para manejar la base de datos
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL, 
    email TEXT NOT NULL, 
    avatar TEXT, password 
    TEXT NOT NULL, 
    admin BOOL NOT NULL DEFAULT false);
DROP TABLE IF EXISTS books;
CREATE TABLE IF NOT EXISTS author(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS books(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    year INTEGER, 
    language TEXT NOT NULL, 
    description TEXT NOT NULL, 
    cover TEXT , 
    pdf TEXT,
    author INTEGER,
    FOREIGN KEY (author) REFERENCES author(id));
