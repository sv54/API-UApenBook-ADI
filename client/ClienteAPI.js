export class ClienteAPI {
    BASE_URL='http://localhost:3000/items'

    async getItems() {
        var resp = await fetch(this.BASE_URL)
        if (resp.ok) {
            return resp.json()
        }
        else {
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