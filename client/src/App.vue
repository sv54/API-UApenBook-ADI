<script>

import { ClienteAPI } from '../ClienteAPI'

const api = new ClienteAPI;
var books = api.getItems()
console.log(books)

export default {
    name: "App",
    data(){
        return {
            name: "UApenBook",
        };
    },
};
</script>


<template>

    <div class="container">
        <p>{{ name }}</p>
    </div>


</template>

<style scoped>

</style>
