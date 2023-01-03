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

}