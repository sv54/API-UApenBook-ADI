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
            coverFile: null,
            book: []
        };
    },
    created(){
        this.getLibro();
        this.error == false
    },
    methods: {
        async modificarLibro(){
            var idAuthor = await this.comprobarAutor(this.author);

            var data= {
                id: this.$route.params.id,
                name: this.name, 
                year: this.year, 
                language: this.language,
                description: this.description,
                cover: this.cover,
                pdf: this.pdf,
                author: idAuthor,
                userId: this.$store.state.userId            
            }
            

            //const api = new ClienteAPI();
            //var resp = await api.newBook(data);
            await this.$store.dispatch('updateBook',data);
            console.log(this.$store.state.status)
            if(this.$store.state.status==400){
                this.error=true;
                this.errorMessage=this.$store.state.message;
            }
            if(this.$store.state.status==200){
                this.$router.push("/book/"+data.id)
            }
            // if((resp.mensaje != null || resp.mensaje != undefined) && resp.mensaje != 'OK'){
            //     this.error = true
            // }
        },
        async getLibro(){
            const api = new ClienteAPI;

            var libro = await api.getBook(this.$route.params.id)
            this.book = libro.libro[0]

            this.name = this.book.name;
            this.year = this.book.year;
            this.language = this.book.language;
            this.description = this.book.description;
            this.user_id = this.book.userId;
            var auxName = await api.getAuthor(this.book.author);
            auxName = auxName.author[0].name
            this.author = auxName;
            console.log(this.book.name)
        },

        async comprobarAutor(nombre){
            //const api = new ClienteAPI();
            var listaAutoresAux = [];
            //var listaAutoresAux = await api.getAuthors();
            await this.$store.dispatch('getAuthors');

            if(this.$store.state.status==400){
                this.error=true;
                this.errorMessage=this.$store.state.message;
            }
            if(this.$store.state.status==200){
                listaAutoresAux = this.$store.state.authors;
            }
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
                //id = (await api.newAuthor(data)).id;
                await this.$store.dispatch('newAuthor',data);

                id = this.$store.state.author;
            }
            
            return id;
        },
        onFileSelected(event){
            console.log(event)
            this.coverFile=event.target.files[0]
        } 

    },
};

</script>
<template>
    <div class="container">
        <div class="login">
            <h1 class="title">Modify Book</h1>
            <form action class="form" @submit.prevent="modificarLibro">
                <label class="form-label" for="#name">Name:</label>
                <input v-model="name" class="form-input" type="text" id="name" required >

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