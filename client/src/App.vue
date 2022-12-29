<script>

import { ClienteAPI } from '../ClienteAPI'
import { RouterLink, RouterView } from 'vue-router'

import ProfileView from './components/ProfileView.vue'
import FooterPart from './components/FooterPart.vue'

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
    components: {FooterPart}
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
            <FooterPart />
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
