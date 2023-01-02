<script>
    console.log("Hello World from MainView.vue!")
</script>

<template>
    <div class = "container">
        <div class="grid-container">
            <span v-for="libro in libros"></span>            
            <div class="grid-item">1</div>
 

        </div>
    </div>
</template>

<style>

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 10px;
}
.grid-item {
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>