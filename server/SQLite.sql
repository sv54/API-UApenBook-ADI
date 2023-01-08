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

INSERT INTO users (name,email,avatar,password,admin) VALUES('Juarry Poder', 'user1@ua', 'potter.png','12345',false);
INSERT INTO users (name,email,avatar,password,admin) VALUES('Admin', 'admin@ua', 'dumbledore.png','12345',true);
INSERT INTO users (name,email,avatar,password,admin) VALUES('Jota Ka Roulin', 'marcos@ua', 'python.png','12345',false);

INSERT INTO author (name) VALUES('Juarry Poder');
INSERT INTO author (name) VALUES('Jota Ka Roulin');
INSERT INTO author (name) VALUES('UA Books');
INSERT INTO author (name) VALUES('Bertus Aafjes');
INSERT INTO author (name) VALUES('Patricia Aakhus ');
INSERT INTO author (name) VALUES('Hans Aanrud' );
INSERT INTO author (name) VALUES('Verna Aardema');
INSERT INTO author (name) VALUES('David Aaron');
INSERT INTO author (name) VALUES('Jane Aaron' );
INSERT INTO author (name) VALUES('Jonathan Aaron' );
INSERT INTO author (name) VALUES('Rachel Aaron' );
INSERT INTO author (name) VALUES('Richard Aaron' );
INSERT INTO author (name) VALUES('Soazig Aaron' );
INSERT INTO author (name) VALUES('Alexander Aaronsohn');
INSERT INTO author (name) VALUES('Aarudhra' );
INSERT INTO author (name) VALUES('Ivar Aasen' );
INSERT INTO author (name) VALUES('Aarudhra' );
INSERT INTO author (name) VALUES('Gjorgji Abadziev' );
INSERT INTO author (name) VALUES('Yunus Nadi Abalo');
INSERT INTO author (name) VALUES('Rafael Ábalos' );
INSERT INTO author (name) VALUES('Chris Abani' );
INSERT INTO author (name) VALUES('Alexander Abasheli' );
INSERT INTO author (name) VALUES('Grigol Abashidze' );
INSERT INTO author (name) VALUES('Irakli Abashidze');
INSERT INTO author (name) VALUES('Sait Faik Abasiyani');
INSERT INTO author (name) VALUES('Ines Abassi');
INSERT INTO author (name) VALUES('Carmine Abate');
INSERT INTO author (name) VALUES('Fekry Abaze');


INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 1: La academia',2000, 'Español', 'La academia',1,1);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 2: El legado',2001, 'Español', 'El legado',1,1);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 3: La piedra',2002, 'Español', 'La piedra',1,1);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 4: La camara',2003, 'Español', 'La camara',1, 3);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 5: El prisionero',2004, 'Español', 'Ya tu sabs',1, 3);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 6: Las reliquias 1',2005, 'Español', 'Las reliquias 1',2, 3);
INSERT INTO books (name, year, language, description,author, user_id)VALUES('Harry Potter 7: Las reliquias 2',2006, 'Español', 'Las reliquias 2',2, 3);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 8: Las reliquias 3',2007, 'Español', 'Las reliquias 3',2, 3);
INSERT INTO books (name, year, language, description,author, user_id)VALUES('Harry Potter 9: Las reliquias 4',2008, 'Español', 'Las reliquias 4',2, 3);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 10: Bestias',2009, 'Español', 'Bestias',1,1);
INSERT INTO books (name, year, language, description,author, user_id) VALUES('Harry Potter 11: Bestias 2',2010, 'Español', 'Bestias 2',1,1);


