<script>
import { ClienteAPI } from "../ClienteAPI";
import { RouterLink, RouterView } from "vue-router";

import FooterPart from "./components/FooterPart.vue";
import HeaderPart from "./components/HeaderPart.vue";

// const api = new ClienteAPI();
// var books = await api.getItems();
// console.log(books);

export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            // books: books,
        };
    },
    components: { FooterPart, HeaderPart },
};
</script>

<template>
    <HeaderPart />

    <body>
        <div>
            <RouterView />
        </div>
    </body>
    <footer>
        <FooterPart />
    </footer>
</template>

<style scoped>



</style>
