<script>
import { ClienteAPI } from "../../ClienteAPI";
export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            error: false,
            errorMessage: '',
            previewImage: null,
            image : null,
            imageUrl: null
        };
    },
    created(){
        this.error = false
        this.errorMessage = ''

    },
    methods: {

        //Falta decicidr como controlar el avatar y si el usuario es admin
        async RegisterFromApi() {
            
            if(this.password != this.repeatPassword){
                this.error = true;
                this.errorMessage = 'Las contraseñas no coinciden';
            }
            else{
                await this.$store.dispatch('register', {
                    name: this.username,
                    email: this.email,
                    password: this.password,
                    admin: false
                })


                if(this.$store.state.status == 400){
                    this.error = true;
                    this.errorMessage = this.$store.state.message

                }
                //Redireccionar a otra pagina
                if(this.$store.state.status == 200){
                    this.$router.push("/login")
                }
            }
        },
        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.previewImage = e.target.result;
                console.log(this.previewImage);
            };
        },
        onChange(e) {
            const file = e.target.files[0]
            this.image = file
            this.imageUrl = URL.createObjectURL(file)
        },
        deleteImg(){
            this.image = null
            this.imageUrl = null
        }

    },
};

</script>
<template>
    <div class="container">
        <div class="login">
            <h1 class="title">Registro de Usuarios</h1>
            <form action class="form" @submit.prevent="RegisterFromApi">
                <label class="form-label" for="#username">* Nombre de Usuario:</label>
                <input v-model="username" class="form-input" type="text" id="username" required placeholder="Nombre de Usuario">
                <label class="form-label" for="#email">* Email:</label>
                <input v-model="email" class="form-input" type="email" id="email" required placeholder="Email">
                <label class="form-label" for="#password">* Contraseña:</label>
                <input v-model="password" class="form-input" type="password" id="password" placeholder="Password">
                <label class="form-label" for="#repeatPassword">* Repita contraseña:</label>
                <input v-model="repeatPassword" class="form-input" type="password" id="repeatPassword" placeholder="Password">
                <!-- <label class="form-label fileUpload" for="#avatar">Avatar</label>
                <input class="form-control" type="file" accept="image/*" name="avatar" @change="onChange" /> -->
                <!-- <div id="preview">
                    <img v-if="imageUrl" :src="imageUrl" />
                </div> -->
                <p v-if="error" class="error">{{ errorMessage }}</p>
                <input class="form-submit" type="submit" value="Registrarse">
            </form>
        </div>
    </div>
</template>

<style scoped>
.fileUpload{
    margin-top: 3%
}
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