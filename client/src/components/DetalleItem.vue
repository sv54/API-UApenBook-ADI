<script>
    import { ClienteAPI } from "../../ClienteAPI";
    export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            book: [],
            authorName: ''
        };
    },
    methods:{
        async getItemFromAPI(){
            const api = new ClienteAPI;
            var libro = await api.getBook(this.$route.params.id)
            this.book = libro.libro[0]
            console.log(libro.libro[0])
            var auxName = await api.getAuthor(this.book.author);
            auxName = auxName.author[0].name
            this.authorName = auxName;
        }
    },
    created(){
        this.getItemFromAPI()
    },  
};
</script>

<template>
    <div class = "container">
        <div class="row ">
            <div class="col-4">
                <img src="../../public/uploads/book-default-cover.jpg" alt="No image found">
            </div>
            <div class="col-4">
                <div class="title">
                    <h6>{{ book.name }}</h6>
                </div>
                <div class="description">
                    {{ book.description }}
                </div>
                <div class="description">
                    {{ authorName }}
                </div>
            </div>  
        </div>
        <div class="row downloadLinks">
            <div class="col"></div>
            <div class="col-1 text-center">
                <a type="button" class="btn btn-danger" href=""> PDF </a>
            </div>
            <div class="col-1 text-center">
                <a type="button" class="btn btn-success" href=""> EPUB </a>
            </div>
            <div class="col-1 text-center">
                <a type="button" class="btn btn-primary" href=""> FB2 </a>
            </div>
            <div class="col"></div>
        </div>
        
        
    </div>
</template>

<style>

img{
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-top: 7%;
    margin-left: 7%;
}

.title, .description{
    margin-top: 5%;
}

.downloadLinks{
    margin-top: 3%;
}

</style>