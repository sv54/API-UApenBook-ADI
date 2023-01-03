<script>
    import { ClienteAPI } from "../../ClienteAPI";
    export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            email: '',
            password: ''
        };
    },
    methods:{
        async loginFromApi() {
            console.log(this.email);
            console.log(this.password);
            const api = new ClienteAPI();
            var resp = await api.login(this.email, this.password)
            console.log(resp)
        },
        login() {
            console.log(this.email);
            console.log(this.password);
        }
    },
};

</script>
<template>
    <div class="container">
        <div class="login">
            <h1 class="title">Login in the page</h1>
            <form action class="form" @submit.prevent="loginFromApi">
                <label class="form-label" for="#email">Email:</label>
                <input v-model="email" class="form-input" type="email" id="email" required placeholder="Email">
                <label class="form-label" for="#password">Password:</label>
                <input v-model="password" class="form-input" type="password" id="password" placeholder="Password">
                <input class="form-submit" type="submit" value="Login">
            </form>
        </div>

        
        <!-- <form method="POST" action="" @submit.prevent="login">
            <div class="row ">
                <div class="col"></div>
                <div class="col-4 text-center">
                    <label for="#email">Email</label><br>
                    <input type="text" id="userName" name="userName" required>
                </div>
                <div class="col"></div>

            </div>
            <div class="row">
                <div class="col"></div>
                <div class="col-4 text-center">
                    <label for="#password">Contraseña</label><br>
                    <input type="password" id="password" name="password" required> 
                </div>
                <div class="col"></div>

            </div>
            <input class="form-submit" type="submit" value="Login"> 
            <div class="row">
                <div class="col"></div>

                <div class="col-4 text-center">
                    <button type="submit" class="btn btn-success " @click="loginFromApi(userName, password )">Login</button>
                </div>
                <div class="col"></div>

            </div>
        </form> -->
    </div>
</template>

<!-- <style scoped>
button{
    margin: 4%;
    vertical-align: middle;
}
input{
    width: 60%;
    vertical-align: middle;

}
</style> -->
<style>


.login {
    padding: 2rem;
  }
  .title {
    text-align: center;
  }
  .form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(16, 51, 78, 0.9);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  }
  .form-label {
    margin-top: 2rem;
    color: white;
    margin-bottom: 0.5rem;
  }
  .form-input {
    padding: 10px 15px;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
  }
  .form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
  }
  </style>