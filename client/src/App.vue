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
    <div>
        <header>
            <div class="wrapper">
                <div class = "logo">
                    <p>{{ name }}</p>
                </div>
                <div class="headerLinks">
                    <RouterLink to="/profile">Perfil</RouterLink>
                </div>
                <div class="headerLinks">
                    <RouterLink to="/">Home</RouterLink>
                </div>    
                

                
            </div>
        
        </header>
        <body>
            <div>
                <p>{{ books }}</p>
                <p>Body!</p>
                <RouterView />

            </div>
        </body>
        <footer>
            <div>
                <p>Footer!</p>
            </div>
        </footer>

    </div>
    


</template>

<style scoped>

.headerLinks{
    margin: auto;
    padding: 2%;
    display: inline;
}
.logo{
    margin: auto;
    display: inline;

}


</style>
