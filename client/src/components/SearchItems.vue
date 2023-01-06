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
            var page = 1;
            var str = ''
            if(this.$route.params.page != undefined && this.$route.params.page > 0){
                page = this.$route.params.page
            }
            if(this.$route.params.str != undefined && this.$route.params.str != '' && this.$route.params.str != ' '){
                str = this.$route.params.str
            }
            if(this.search != undefined && this.search != ''  && this.search != ' '){
                str = this.search
            }
            await this.$store.dispatch('searchBooks', {search: str, page: page})
            this.books = this.$store.state.books
            this.numPaginas = Math.floor(this.$store.state.totalBooks / 8) + 1
            if(this.$store.state.message != 'OK'){
                this.error = true
                this.books = []
            }
            else{
                this.error = false
            }
        },
    },
    created(){
        if(this.$route.params.str != null && this.$route.params.page != undefined && this.$route.params.str != ''
        && this.$route.params.page != null && this.$route.params.page != undefined && this.$route.params.page != ''){
            this.search = this.$route.params.str
            this.SearchItems()
        }
    },
    
    
};
</script>

<template>
    <div class = "container-fluid">
        <div class = "searchBar row">
            <form action class="form " @submit.prevent="SearchItems">
                <input v-model="search" class="form-input form-control inputClass" type="search" id="name" required >
                <button class="form-submit btn btn-success inputClass" type="submit" value="">Buscar</button>
            </form>    
        </div>
        <p v-if="error" class="error">No se han encontrado libros</p>

        <div v-if="books.length > 0" class="grid-container" >
            <div v-for="libro in books">
                <div class="grid-item">
                    <router-link :to="{name: 'details', params: {id: libro.id}}" >
                        <img src="../../public/uploads/book-default-cover.jpg" alt="No Image Available">
                        <h6>{{ libro.name }}</h6>

                    </router-link>
                </div>
            </div>
        </div>
        <nav>
            <div v-if="!error && books.length > 0" class="pagination row">
                <span  v-for="index in numPaginas" :key="index" @submit.prevent="SearchItems">
                    <!-- <li class="page-item"><router-link :to="{name: 'search', params: {str:this.search ,page: index}}">{{ index }}</router-link></li> -->
                    <li class="page-item"><a :href="'/search/'+ search + '/' + index">{{ index }}</a></li>

                </span>
            </div>
        </nav>
    </div>
</template>

<style>
.searchBar{
    width: 30%;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

}
form{
    display: flex;
}
.inputClass{
    margin:auto;
    display: inline;
    float: none;
}


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