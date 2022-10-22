Nikita Polyanskiy
Serhii Vidernikov


Requisitos adicionales:

1) Para implementar la base de datos se usa SQLite. Los datos se guardan en DataBase.db.

2) En la carpeta tests se encuentra el archivo Postman que hay que importar. Contiene las llamadas y los tests asociados a cada llamada. 

3) -- [Documentación]

4) Se ha implementado un método muy sencillo que guarda los archivos a la carpeta uploads. El archivo de Postman carga crea una copia de index.js, pero se pueden subir otros tipos de archivo. La ruta para hacer la petición es /single.

5) Se ha implementado paginado por offset. Se usa en la llamada /books donde hay que añadir parámetros como número de página y el tamaño de página. Ejemplo: localhost:3000/books?page=1&pageSize=4