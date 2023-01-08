<script>
    import { ClienteAPI } from "../../ClienteAPI";
    export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            books: [],
        };
    },
    methods:{
        async getBooks(){
            await this.$store.dispatch('getUserBooks', {id: this.$store.state.userId})
            this.books = this.$store.state.books.books
            console.log(this.books)
        },
        async deleteBook(id,index){
            console.log("Borrando libro con id "+id)
            await this.$store.dispatch('deleteBook', {id: id})
            this.books.splice(index,1)
        }
    },
    created(){
        console.log(this.$store.state.userId)
        this.getBooks();
    },  
};
</script>

<template>
    <div class="greetings">
        <h1 class="green">Mi Perfil</h1>
    </div>

    <div>
        <h2>Mis Libros</h2>
        <table>
            <thead>
            <tr>
                <th class="col-5">Libro</th>
                <th class="col-5">Autor</th>
                <th class="col-2">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(libro,i) in this.books">
                <th class="col-4" ><h6>{{ libro.name }}</h6></th>
                <th class="col-3"><h6>{{ libro.author }}</h6></th>
                <th class="col">
                    <router-link :to="{name: 'UpdateBook', params: {id: libro.id}}" >
                            <button class="btn btn-primary" style="margin-right: 5px">Modificar</button>
                    </router-link>
                    <button @click="deleteBook(libro.id,i)" class="btn btn-danger">Borrar</button>
                </th>

            </tr>
        </tbody>
        </table>
    </div>
</template>

<style scoped>
</style>