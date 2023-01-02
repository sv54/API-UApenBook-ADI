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
                    {{ libro.name }}
            
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
  font-size: 30px;
  text-align: center;
}

</style>