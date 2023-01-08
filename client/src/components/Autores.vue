<script>
    export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            authors: [],
            admin: 0,
            index: 0,
        };
    },
    methods:{
        async getAutores(){
            await this.$store.dispatch('getAuthors');
            this.admin = this.$store.state.userAdmin
            this.index = 0
            if(this.$store.state.status==400){
                this.error=true;
                this.errorMessage=this.$store.state.message;
            }
            if(this.$store.state.status==200){
                this.authors = this.$store.state.authors.slice(0,10);
            }
        },
        async loadAuthors(){
            this.index = this.index + 10
            this.authors = this.authors.concat(this.$store.state.authors.slice(this.index, this.index + 10));

        },
        async deleteAuthor(id){
            await this.$store.dispatch('deleteAuthor',{id: id});
            await this.getAutores()

        },
        async modificarAutor(id){
            this.$router.push('autores/'+id)
        }

    },
    created(){
        this.getAutores();
    },
    
    
};
</script>

<template>
    <div class = "container">
        <!-- <button @click="getAutores">Get Autores</button> -->

        <div id="autores">
            <div class = "row" v-for="item in authors" :key="item">
                <div class="col-6">{{ item.name }}</div>
                <div class="col"></div>
                <div class="col-3" v-if="admin == 1">
                    <button class="btn btn-danger" @click="deleteAuthor(item.id)" style="margin-right: 5px">Borrar</button> 
                    <button class="btn btn-primary" @click="modificarAutor(item.id)">Modificar</button>

                </div>
            </div>
        </div>
        <button @click="loadAuthors">Get Mas Autores</button>



    </div>
</template>

<style scoped>
    .row{padding-top: 2px;}
</style>