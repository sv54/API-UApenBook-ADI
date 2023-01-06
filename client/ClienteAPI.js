export class ClienteAPI {
    BASE_URL='http://localhost:3000/'

    async getItems(page=1, pageSize = 8) {
        //Ejemplo paginacion: localhost:3000/books?page=1&pageSize=4
        var resp = await fetch(this.BASE_URL + "books?page="+page+"&pageSize="+pageSize)
        .then((response) => response.json());

        if (resp.status == 200) {
            return resp

        }
        else {
            console.log(resp)
            throw new Error(resp)
        }
        

    }

    async getBook(id){
        var resp = await fetch (this.BASE_URL + "books/" + id)
        .then((response) => response.json());

        if(resp.status == 200){
            return resp
        }
        else {
            console.log(resp)
            throw new Error(resp)
        }
    }

    async newBook(data){
        var resp = await fetch(this.BASE_URL+"books",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json());

        console.log(resp)
        return resp
    }

    async login(username, password){
        var resp = await fetch (this.BASE_URL + "login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: username, password: password})
        })
        .then((response) => response.json());

        if(resp.status == 200){
            return resp
        }
        else{
            return resp
        }
        
    }

    async register(username, email, password, avatar='', admin = false){
        var resp = await fetch (this.BASE_URL + "register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: username, email: email, password: password, avatar: avatar, admin:admin })
        }).then((response) => response.json());

        if(resp.status == 200){
            return resp
        }
        else{
            return resp
        }
    }

    async setItemState(id, estado ) {
        var resp = await fetch(this.BASE_URL+"/"+id, {
            method:'PATCH',
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({comprado:estado})
        })
        if (resp.ok) {
            return true
        }
        else {
            throw new Error(resp)
        }
    }

    async getAuthors() {
        var resp = await fetch(this.BASE_URL + "authors")
        .then((response) => response.json());

        if (resp.status == 200) {
            return resp.authors

        }
        else {
            console.log(resp)
            throw new Error(resp)
        }
    }

    async newAuthor(data){
        var resp = await fetch(this.BASE_URL+"authors",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json());

        console.log(resp)
        return resp
    }

    async getAuthor(id){
        var resp = await fetch (this.BASE_URL + "authors/" + id)
        .then((response) => response.json());

        if(resp.status == 200){
            return resp
        }
        else {
            console.log(resp)
            throw new Error(resp)
        } 
    }
}
