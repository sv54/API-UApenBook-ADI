<script>
export default {
    name: "Header",
    data() {
        return {
            logged: false,
        };
    },
    created() {
        if(this.$store.state.JWT != ''){
            this.logged = true
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('logout', {})
            this.$router.push("/books")
        },
    },
};
</script>

<template>
    <nav @onmousemove="login">
        <!-- <p>{{ this.$store.state.JWT}}</p> -->
        <div class="row">
            <div class="headerLinks col-1">
                <h5>UApenBook</h5>
            </div>
            <div class="headerLinks col-1">
                <RouterLink to="/profile">
                    <h5>Perfil</h5>
                </RouterLink>
            </div>
            <div class="headerLinks col-1">
                <RouterLink to="/books">
                    <h5>Home</h5>
                </RouterLink>
            </div>
            <div class="headerLinks col-1">
                <RouterLink to="/search/">
                    <h5>Buscar</h5>
                </RouterLink>
            </div>
            <div v-if="this.$store.state.JWT == ''" class="headerLinks col-1 offset-md-5">
                <RouterLink to="/login">
                    <h5>Login</h5>
                </RouterLink>
            </div>
            <div v-if="this.$store.state.JWT == ''" class="headerLinks col-1">
                <RouterLink to="/register">
                    <h5>Register</h5>
                </RouterLink>
            </div>
            <div v-if="this.$store.state.JWT != ''" class="headerLinks col-1 offset-md-7 ">
                <a class="green" @click="logout">
                    <h5>Logout</h5>
                </a>
            </div>
        </div>


    </nav>
</template>

<style>
.headerLinks {
    padding: 1%;
    text-align: center;
}
</style>