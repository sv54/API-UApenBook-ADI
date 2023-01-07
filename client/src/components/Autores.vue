<script>
    export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            authors: [],
            index: 0,
        };
    },
    methods:{
        async getAutores(){
            await this.$store.dispatch('getAuthors');
            this.index = 0
            if(this.$store.state.status==400){
                this.error=true;
                this.errorMessage=this.$store.state.message;
            }
            if(this.$store.state.status==200){
                this.authors = this.$store.state.authors.slice(0,10);
                console.log(this.authors)
                console.log(typeof this.$store.state.authors)
            }
        },
        async loadAuthors(){
            this.index = this.index + 10
            this.authors = this.authors.concat(this.$store.state.authors.slice(this.index, this.index + 10));
            console.log(this.authors)

        }
    },
    created(){
        
    },
    
    
};
</script>

<template>
    <div class = "container">
        <button @click="getAutores">Get Autores</button>

        <div id="autores">
            <div class = "row" v-for="item in authors" :key="item">
                {{ item.name }}
            </div>
        </div>
        <button @click="loadAuthors">Get Mas Autores</button>



    </div>
</template>

<style scoped>

</style>