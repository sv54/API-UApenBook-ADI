<script>
export default {
    name: "App",
    data() {
        return {
            
        };
    },
    created(){
    },
    methods: {
        async logout(){
            await this.$store.dispatch('logout', {})
            this.$router.push("/books")

        },

    },
};
</script>

<template>
    <nav>
        <div class="col-6">
            <div class="row">
                <div class="headerLinks col">
                    <h5>UApenBook</h5>
                </div>
                <div class="headerLinks col">
                    <RouterLink to="/profile">
                        <h5>Perfil</h5>
                    </RouterLink>
                </div>
                <div class="headerLinks col">
                    <RouterLink to="/books">
                        <h5>Home</h5>
                    </RouterLink>
                </div>
                <div class="headerLinks col">
                    <RouterLink to="/login">
                        <h5>Login</h5>
                    </RouterLink>
                </div>
                <div class="headerLinks col">
                    <RouterLink to="/register">
                        <h5>Register</h5>
                    </RouterLink>
                </div>
                <div class="headerLinks col ">
                        
                    <a class="green" @click="logout"><h5>Logout</h5></a>
                </div>
            </div>
        </div>
        <div class="col barraBusqueda">

        </div>

    </nav>
</template>

<style>
.headerLinks {
    padding: 1%;
    text-align: center;
}

</style>