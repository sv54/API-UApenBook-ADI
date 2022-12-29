<script>

import { ClienteAPI } from '../ClienteAPI'
import { RouterLink, RouterView } from 'vue-router'

import ProfileView from './components/ProfileView.vue'

const api = new ClienteAPI;
var books = await api.getItems()
console.log(books)

export default {
    name: "App",
    data(){
        return {
            name: "UApenBook",
            books: books
        };
    },
};
</script>


<template>
    <header>
        <div class="wrapper">
            <p>{{ name }}</p>
            <p>{{ books }}</p>
            <RouterLink to="/profile">Perfil</RouterLink>
            <br>
            <RouterLink to="/">Home</RouterLink>

        </div>
        <RouterView />
    
    </header>



</template>

<style scoped>

</style>
