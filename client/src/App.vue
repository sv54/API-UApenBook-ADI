<script>
import { ClienteAPI } from "../ClienteAPI";
import { RouterLink, RouterView } from "vue-router";

import ProfileView from "./components/ProfileView.vue";
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
        <div class="row">
            <div class="col-10" >1</div>
            <div class="col" >1</div>
            <div class="col" >1</div>
        </div>
    </body>
    <footer>
        <FooterPart />
    </footer>
</template>

<style scoped>

.headerLinks {
    margin: auto;
    padding: 2%;
    display: inline;
}

.logo {
    margin: auto;
    display: inline;
}

</style>
