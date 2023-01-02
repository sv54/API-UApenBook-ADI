<script>
    import { ClienteAPI } from "../../ClienteAPI";

    const api = new ClienteAPI();
    var books = await api.getItems();
    console.log(books);

    export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            books: books,
        };
    },
};
</script>

<template>
    <div class = "container">
        <div class="grid-container" >
            <div v-for="libro in books.Libros">
                <div class="grid-item">
                    <img src="../../public/uploads/book-default-cover.jpg" alt="No Image Available">
                    <h6>{{ libro.name }}</h6>
                </div>
            </div>

        </div>
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
</style>