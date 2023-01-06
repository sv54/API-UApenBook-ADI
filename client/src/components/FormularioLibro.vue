<script>
import { ClienteAPI } from "../../ClienteAPI";
export default {
    name: "App",
    data() {
        return {
            name: '',
            year: 0,
            language: '',
            description: '',
            cover: '',
            pdf: '',
            author: '',
            user_id: 0,
            error: false,
            coverFile: null
        };
    },
    created(){
        this.error == false
    },
    methods: {
        async crearLibro(){
            var idAuthor = await this.comprobarAutor(this.author);

            var data= {
                name: this.name, 
                year: this.year, 
                language: this.language,
                description: this.description,
                cover: this.cover,
                pdf: this.pdf,
                author: idAuthor,
                user_id: this.user_id            
            }
            console.log(data);
            

            const api = new ClienteAPI();
            var resp = await api.newBook(data);
            if((resp.mensaje != null || resp.mensaje != undefined) && resp.mensaje != 'OK'){
                this.error = true
            }
            console.log(resp)
        },

        async comprobarAutor(nombre){
            const api = new ClienteAPI();
            var listaAutoresAux = await api.getAuthors();
            var listaAutores = []

            var aux = nombre.toLowerCase();
            const words = aux.split(" ");
            var id = 0;

            var arreglado = words.map((word) => { 
                return word[0].toUpperCase() + word.substring(1); 
            }).join(" ");
            console.log(arreglado)

            for (let i = 0; i<listaAutoresAux.length;i++){
                listaAutores.push(listaAutoresAux[i].name)
                if(listaAutoresAux[i].name == arreglado){
                    id = listaAutoresAux[i].id
                }
            }
            console.log(listaAutores);

            if(!listaAutores.includes(arreglado)){
                var data = {
                    name: arreglado
                }
                id = (await api.newAuthor(data)).id;
            }
            
            return id;
        },
        onFileSelected(event){
            console.log(event)
            this.coverFile=event.target.files[0]
        },
        async 

    },
};

</script>
<template>
    <div class="container">
        <div class="login">
            <h1 class="title">Upload Book</h1>
            <form action class="form" @submit.prevent="crearLibro">
                <label class="form-label" for="#name">Name:</label>
                <input v-model="name" class="form-input" type="text" id="name" required placeholder="Name">

                <label class="form-label" for="#year">Year:</label>
                <input v-model="year" class="form-input" type="number" id="year" required placeholder="Ej: 1998">

                <label class="form-label" for="#language">Language:</label>
                <input v-model="language" class="form-input" type="text" id="language" required placeholder="Langauge">

                <label class="form-label" for="#description">Description:</label>
                <textarea v-model="description" rows="5" cols="60" name="description" id="description" required placeholder="Description"></textarea>
                
                <label class="form-label" for="#cover">Cover:</label>
                <input class="form-input" type="file" id="cover" @change="onFileSelected">

                <label class="form-label" for="#pdf">Archivo:</label>
                <input class="form-input" type="file" id="pdf">

                <label class="form-label" for="#author">Author:</label>
                <input v-model="author" class="form-input" type="text" id="author" required placeholder="">

                <p v-if="error" class="error">Has hecho algo mal.</p>
                <input class="form-submit" type="submit" value="Crear">
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