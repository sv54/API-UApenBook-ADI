<script>
import { RouterLink, RouterView } from 'vue-router'
import {ClienteAPI} from '../ClienteAPI'
import HelloWorld from './components/HelloWorld.vue'
import Handlebars from "handlebars"

export default {
  data() {
    return {
      count: 0
    }
  }
}

var app_plantilla = `
<h1>Lista de la compra</h1>
<input type="text" id="nuevoItem"><button id="botonInsertar">Insertar</button>
<ul id="lista">
   {{#each .}} 
    <li id="{{id}}" {{#comprado}}class="tachado"{{/comprado}}>
    {{nombre}}
    <button id="{{id}}_button">Eliminar</button>
    </li>
   {{/each}} 
</ul>
`

document.addEventListener('DOMContentLoaded', async function() {
    var cliente = new ClienteAPI()
    // var lista = await cliente.getItems()
    var lista = {id:1, nombre:"pan", comprado:true}
    var func_plantilla = Handlebars.compile(app_plantilla)
    this.document.getElementById('app').innerHTML = func_plantilla(lista)
    
    
    document.getElementById('lista').addEventListener('click', function(evento){
        var id_target = evento.target.id
        if (evento.target.nodeName=="BUTTON") {
            var id_borrar = parseInt(evento.target.id)
        }


    })
})


</script>

<template>

  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <button @click="count++">Count is: {{ count }}</button>
    
  </header>

  <RouterView /> -->
</template>




<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
