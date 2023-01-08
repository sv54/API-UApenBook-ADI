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
        <h1 class="green">Hi, here is your profile data!</h1>
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
                <th class="col-5" >{{ libro.name }}</th>
                <th class="col-5">{{ libro.author }}</th>
                <th>
                <router-link :to="{name: 'UpdateBook', params: {id: libro.id}}" >
                        <button>Modificar</button>
                </router-link>
                <button @click="deleteBook(libro.id,i)">Borrar</button>
                </th>

            </tr>
        </tbody>
        </table>
    </div>
</template>

<style>

</style>