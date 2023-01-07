<script>
export default {
    name: "App",
    data() {
        return {
            name: "UApenBook",
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
        async uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.previewImage = e.target.result;
                console.log(this.previewImage);
            };

            
        },
        async onChange(e) {
            var file = e.target.files;
            const formData = new FormData();
            formData.append('image',file)
            console.log(formData)
            
            const resp = await fetch("http://localhost:3000/upload", {
                method: 'POST',
                body: {'image': [file]},
            })
            .then((res) => console.log(res))
            .catch((err) => ("Error occured", err));
            console.log(resp)


            // const file = e.target.files[0]
            // this.image = file
            // this.imageUrl = URL.createObjectURL(file)
            // await this.$store.dispatch('uploadImg', {
            //     image: this.image,
            //     imgeUrl:this.imageUrl
            // })
        },
        deleteImg(){
            this.image = null
            this.imageUrl = null
        },

        submitForm(e) {
            e.preventDefault();
            const name = document.getElementById("name");
            const files = document.getElementById("files");
            const formData = new FormData();
            formData.append("name", name.value);
            for(let i =0; i < files.files.length; i++) {
                    formData.append("files", files.files[i]);
            }
            fetch("http://localhost:3000/single", {
                method: 'POST',
                body: formData,
                headers: {
                "Content-Type": "multipart/form-data"
                }
            })
                .then((res) => console.log(res))
                .catch((err) => ("Error occured", err));
        }

    },
};

</script>
<template>
    <div class="container">
        <div class="login">
            <h1 class="title">Registro de Usuarios</h1>
            <form action class="form" @submit.prevent="RegisterFromApi">
                <label class="form-label fileUpload" for="#avatar">Avatar</label>
                <input class="form-control" type="file" accept="image/*" name="avatar" @change="onChange" />
                <div id="preview">
                    <img v-if="imageUrl" :src="imageUrl" />
                </div>
                <input class="form-submit" type="submit" value="upload">
            </form>
        </div>
    </div>
    <!-- <body>
        <div class="container">
            <h1>File Upload</h1>
            <form id='form'>
                <div class="input-group">
                    <label for='name'>Your name</label>
                    <input name='name' id='name' placeholder="Enter your name" />
                </div>
                <div class="input-group">
                    <label for='files'>Select files</label>
                    <input id='files' type="file">
                </div>
                <button class="submit-btn" type='submit'>Upload</button>
            </form>
        </div>
    </body> -->
</template>

<style scoped>
</style>