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
        };
    },
    methods:{
        async getItemsFromAPI() {
            await this.$store.dispatch('getBooks', {page: this.$route.params.page, pageSize: 8})
            this.books = this.$store.state.books
            this.numPaginas = Math.floor(this.books.total / this.books.pageSize)
            console.log(this.books)



            // const api = new ClienteAPI();
            // this.books = await api.getItems(this.$route.params.page);
            // this.numPaginas  = await Math.floor(this.books.total / this.books.pageSize) + 1
            // console.log(this.books)
            // console.log(typeof this.books)
        }
    },
    created(){
        this.getItemsFromAPI()
    },
    
    
};
</script>

<template>
    <div class = "container">
        <div class="grid-container" >
            <div v-for="libro in books.libros">
                <div class="grid-item">
                    <a :href="'/book/' + libro.id">
                    <img src="../../public/uploads/book-default-cover.jpg" alt="No Image Available">
                    <h6>{{ libro.name }}</h6></a>
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
  padding: 20px;
  padding-top: 10%;
  text-align: center;
}

img{
    max-width: 100%;
    max-height: 100%;
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