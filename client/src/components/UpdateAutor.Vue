<script>
import { ClienteAPI } from "../../ClienteAPI";
export default {
    name: "App",
    error:'',
    data() {
        return {
            name: '',
            id: '',
            error: false
        };
    },
    created(){
        this.getAutor();
        this.error == false
    },
    methods: {
        async modificarAutor(){
            var data= {
                id: this.$route.params.id,
                name: this.name
            }
            
            await this.$store.dispatch('updateAuthor',data);
            console.log(this.$store.state.status)
            if(this.$store.state.status==400){
                this.error=true;
                this.errorMessage=this.$store.state.message;
            }
            if(this.$store.state.status==200){
                this.$router.push("/autores")
            }
            // if((resp.mensaje != null || resp.mensaje != undefined) && resp.mensaje != 'OK'){
            //     this.error = true
            // }
        },
        async getAutor(){
            const api = new ClienteAPI;

            var id =  this.$route.params.id
            console.log("id:"+id)
            var auxName = await api.getAuthor(this.$route.params.id);
            auxName = auxName.author[0].name
            this.name = auxName;

            console.log(this.name)
        },
    },
};

</script>
<template>
    <div class="container">
        <div class="login">
            <h1 class="title">Modify Author</h1>
            <form action class="form" @submit.prevent="modificarAutor">
                <label class="form-label" for="#name">Name:</label>
                <input v-model="name" class="form-input" type="text" id="name" required >

                <p v-if="error" class="error">Has hecho algo mal.</p>
                <input class="form-submit" type="submit" value="Modificar">
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
<style scoped>
.login {
    padding: 2rem;
}

.title {
    text-align: center;
}

.form {
    margin: 5rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(8, 68, 114, 0.9);
    border-radius: 5px;
    padding: 2%;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.error {
  margin: 2% 0 0;
  color: #ff0000;
}

.form-label {
    margin-top: 2%;
    color: white;
    margin-bottom: 0.5rem;
}

.form-input {
    padding: 3% 4%;
    background: none;
    background-image: none;
    border: 1px solid white;
    color: white;
}

.form-submit {
    background: #1ab188;
    border: none;
    color: white;
    margin-top: 3%;
    padding: 3% 0;
    cursor: pointer;
    transition: background 0.2s;
}
</style>