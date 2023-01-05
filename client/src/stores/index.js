import { createStore } from "vuex";
const BASE_URL = "http://localhost:3000/";

// Ejemplo de uso de store
/* <p>{{ $store.state.firstName }} {{ $store.state.lastName }}</p> */
export default createStore({
	state: {
		JWT: "",
		message: "",
		status: "",
		books: {},
		book: [],
		totalBooks: 0,
		pageSize: 8,
	},
	mutations: {
		UPDATE_JWT(state, token) {
			state.JWT = token;
		},
		UPDATE_message(state, message) {
			state.message = message;
		},
		UPDATE_status(state, status) {
			state.status = status;
		},
		UPDATE_book(state, book) {
			state.book = book;
		},
		UPDATE_books(state, books) {
			state.books = books;
		},
		UPDATE_totalBooks(state, totalBooks) {
			state.totalBooks = totalBooks;
		},
		UPDATE_pageSize(state, pageSize) {
			state.pageSize = pageSize;
		},
	},

	actions: {
		async login(context, payload) {
			const resp = await fetch(BASE_URL + "login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
				}),
			}).then((response) => response.json());

			if (resp.status == 200) {
				context.commit("UPDATE_JWT", resp.jwt);
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
			} else {
				context.commit("UPDATE_JWT", "");
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
			}
		},

		async register(context, payload) {
			const resp = await fetch(BASE_URL + "register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: payload.name,
					email: payload.email,
					password: payload.password,
					avatar: payload.avatar,
					admin: payload.admin,
				}),
			}).then((response) => response.json());

			if (resp.status == 200) {
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
			} else {
				console.log(resp.Detalles);
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
			}
		},

		async logout(context, payload) {
			context.commit("UPDATE_JWT", "");
		},

		async getBook(context, payload) {
			console.log(this.state.books.libros)
			console.log(this.state.books)
			var result = undefined
			for(book in this.state.books){
				console.log(book)
				if(book.libros.id == payload.id){
					result = book
				}
			}
			// var result = this.state.books.find((obj) => {
			// 	return obj.id === payload.id;
			// });

			if (result == undefined) {
				var resp = await fetch(BASE_URL + "books/" + id).then((response) =>
					response.json()
				);

				if (resp.status == 200) {
					context.commit("UPDATE_book", resp);
				} else {
					console.log(resp);
				}
			} else {
				context.commit("UPDATE_book", result);
			}
		},

		async getBooks(context, payload) {
			var resp = await fetch(BASE_URL + "books?page="+payload.page+"&pageSize="+payload.pageSize)
        	.then((response) => response.json());


			if(resp.status == 200){
				context.commit("UPDATE_books", resp)
				context.commit("UPDATE_totalBooks", resp.total);
				context.commit("UPDATE_status", resp.status);
				context.commit("UPDATE_pageSize", resp.pageSize);
			}
			else{
				console.log('Status no es 200')
			}
		}
	},

	getters: {},
});
