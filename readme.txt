Requisitos adicionales implementados:
1) Se ha usado router para gestionar la navegacion. Este se encuentra en /client/stc/router.
2) Se ha implementado tanto la busqueda como paginacion de los items. En /books o "Home" en la parte de header se puede acceder a listado con paginacion. La busqueda se puede realizar en /search o "Busqueda". Se busca por nombre del libro. Si ningun nombre no contiene el string introducido no se encontrara nada.
3) En la parte de cliente se usa la estructura de proyecto generada con create-vue. Ademas los componentes son de tipo single-file component, en este caso, ficheros con extencion .vue
4) Uso de Bootstrap
5) Uso de Vuex para gestion de estado de la aplicacion. Se guarda la informacion del usuario (Token), libros mostrados en la pagina. Los metodos de la comunicacion con el servidor tambien estan declarados. Se puede ver en /client/src/stores/index.js
6) Listado de otro recurso, autores de libros