<script>
    import { ClienteAPI } from "../../ClienteAPI";
    


    //console.log(this.$route.params.page)
    //var _books = await api.getItems();


    
    //var paginas = 20
    export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            books: [],
            numPaginas: 0,
            search: '',
            error: false

        };
    },
    methods:{
        async SearchItems() {
            await this.$store.dispatch('searchBooks', {search: this.search})
            this.books = this.$store.state.books
            this.numPaginas = Math.floor(this.books.length / 8) + 1
            console.log(this.books)
        },
    },
    created(){
    },
    
    
};
</script>

<template>
    <div class = "container">
        <div class = "searchBar">
            <form action class="form" @submit.prevent="SearchItems">
                <input v-model="search" class="form-input" type="text" id="name" required>
                <input class="form-submit" type="submit" value="Buscar">
            </form>
        </div>
        <div v-if="books.length > 0" class="grid-container" >
            <div v-for="libro in books">
                <div class="grid-item">
                    <router-link :to="{name: 'details', params: {id: libro.id}}" >
                        <img src="../../public/uploads/book-default-cover.jpg" alt="No Image Available">
                        <h6>{{ libro.name }}</h6>
                        <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>

                    </router-link>
                </div>
            </div>
        </div>
        <nav>
            <div class="pagination row">
                <span  v-for="index in numPaginas" :key="index">
                    <li class="page-item"><a :href="'/books/' + index">{{ index }}</a></li>
                </span>
            </div>
        </nav>
    </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: auto;
}
.grid-item {

  padding-top: 10%;
  text-align: center;
}

img{
    max-width: 100%;
    max-height: 100%;
    margin-left: auto;
    margin-right: auto;
    object-fit: contain;
}

li{
    display: inline-block;
    
}

.pagination{
    text-align: center;
    display: block;
    padding: 2%;
}
</style>