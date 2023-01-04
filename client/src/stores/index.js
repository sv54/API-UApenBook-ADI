import { createStore } from 'vuex'

// Ejemplo de uso de store
/* <p>{{ $store.state.firstName }} {{ $store.state.lastName }}</p> */
export default createStore({
    state: {
        JWT: '0',
        message: '',
        status: '',
        books: []
    },
    mutations: {

    },
    actions: {

    },
    getters: {

    }
})
