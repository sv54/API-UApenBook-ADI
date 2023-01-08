import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
const BASE_URL = "http://localhost:3000/";

// Ejemplo de uso de store
/* <p>{{ $store.state.firstName }} {{ $store.state.lastName }}</p> */
export default createStore({
	plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
	state: {
		JWT: "",
		message: "",
		status: "",
		books: [],
		book: [],
		totalBooks: 0,
		pageSize: 8,
		authors: [],
		author: 0,
		userId: 0,
		userAdmin: false
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
		UPDATE_authors(state, authors) {
			state.authors = authors;
		},
		UPDATE_author(state, author) {
			state.author = author;
		},
		UPDATE_userId(state,id){
			state.userId=id;
		},
		UPDATE_userAdmin(state,admin){
			state.userAdmin=admin;
		}
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
				context.commit("UPDATE_userId",resp.id)
				context.commit("UPDATE_userAdmin",resp.admin)

				console.log("admin: ",resp.admin)
			} else {
				context.commit("UPDATE_JWT", "");
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
			}
		},

		async register(context, payload) {
			// const uploadImg = await fetch(BASE_URL + "single", {
			// 	method: "POST",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// 	body: JSON.stringify({
			// 		avatar: payload.avatar,
			// 	}),
			// })



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
			// console.log(this.state.books.libros)
			// console.log(this.state.books)
			console.log("Getting one book")
			var result = undefined
			let libros = JSON.stringify(this.state.books)
			libros = JSON.parse(libros)
			if (libros == undefined) {
				for (let i = 0; i < libros.libros.length; i++) {
					if (libros.libros[i].id == payload.id) {
						result = libros.libros[i]
					}
				}
			}
			if (result == undefined) {
				var resp = await fetch(BASE_URL + "books/" + payload.id,
				{
					headers:{
						'Authorization': 'Bearer '+ this.state.JWT
					}
				}).then((response) =>
					response.json()
				);

				if (resp.status == 200) {
					console.log("recuperando libro con server", resp)
					context.commit("UPDATE_book", resp.libro[0]);
				} else {
					console.log(resp);
				}
			} else {
				console.log("recuperando libro sin server")
				context.commit("UPDATE_book", result);
			}
		},

		async getBooks(context, payload) {
			var resp = await fetch(BASE_URL + "books?page=" + payload.page + "&pageSize=" + payload.pageSize,{
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				}
			})
				.then((response) => response.json());

			console.log("Getting all books")
			if (resp.status == 200) {
				context.commit("UPDATE_books", resp)
				context.commit("UPDATE_totalBooks", resp.total);
				context.commit("UPDATE_status", resp.status);
				context.commit("UPDATE_pageSize", resp.pageSize);
			}
			else {
				console.log('Error obteniendo libros')
			}
		},

		async searchBooks(context, payload) {
			var resp = await fetch(BASE_URL + "search/" + payload.search + "/" + payload.page,{
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				}
			})
				.then((response) => response.json());

			console.log("Seaching books with " + payload.search)

			if (resp.status == 200) {
				context.commit("UPDATE_books", resp.books);
				context.commit("UPDATE_status", resp.status);
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_totalBooks", resp.total);

			}
			else {
				console.log('No books were found')
				context.commit("UPDATE_books", { books: [] })
				context.commit("UPDATE_message", 'no OK')

			}
		},

		async uploadImg(context, payload) {
			console.log(payload)

			var resp = await fetch(BASE_URL + "single", {
				method: "POST",
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				},
				body: JSON.stringify({
					image: payload.image,
					image1: payload.imageURL,

				})
			})
				.then((response) => response.json());
			console.log(resp)
		},

		async getAuthors(context, payload) {
			var resp = await fetch(BASE_URL + "authors",{
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				}
			})
				.then((response) => response.json());

			if (resp.status == 200) {
				context.commit("UPDATE_authors", resp.authors);
			}
			else {
				console.log(resp)
				throw new Error(resp)
			}
		},

		async newAuthor(context, payload) {
			var data = payload
			var resp = await fetch(BASE_URL + "authors", {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'Bearer '+ this.state.JWT
				},
				body: JSON.stringify(data)
			}).then((response) => response.json());

			console.log(resp)
			context.commit("UPDATE_message", resp.message);
			context.commit("UPDATE_status", resp.status);
			context.commit("UPDATE_author", resp.id)
		},

		async getAuthor(context, payload) {
			var id = payload.id
			var resp = await fetch(BASE_URL + "authors/" + id,{
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				}
			})
				.then((response) => response.json());

			if (resp.status == 200) {
				context.commit("UPDATE_author", resp)
			}
			else {
				console.log(resp)
				throw new Error(resp)
			}
		},

		async deleteAuthor(context, payload) {
			var id = payload.id
			var resp = await fetch(BASE_URL + "author/" + id, {
				method: "DELETE",
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				}
			})
			.then((response) => response.json());
			console.log(resp)
			if (resp.status == 200) {
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
			}
			else {
				console.log(resp)
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
				throw new Error(resp)
			}
		},

		async deleteBook(context, payload) {
			var id = payload.id
			var resp = await fetch(BASE_URL + "books/" + id, {
				method: "DELETE",
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				}
			})
			.then((response) => response.json());
			console.log(resp)
			if (resp.status == 200) {
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
			}
			else {
				console.log(resp)
				context.commit("UPDATE_message", resp.message);
				context.commit("UPDATE_status", resp.status);
				throw new Error(resp)
			}
		},

		async newBook(context, payload) {
			var data = payload
			var resp = await fetch(BASE_URL + "books", {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'Bearer '+ this.state.JWT

				},
				body: JSON.stringify(data)
			}).then((response) => response.json());

			console.log(resp)
			context.commit("UPDATE_message", resp.message);
			context.commit("UPDATE_status", resp.status);
			context.commit("UPDATE_book", resp.id)
		},
		async updateBook(context, payload) {
			var data = payload
			var resp = await fetch(BASE_URL + "books/" + data.id, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'Bearer '+ this.state.JWT
				},
				body: JSON.stringify(data)
			}).then((response) => response.json());

			console.log(resp)
			context.commit("UPDATE_message", resp.message);
			context.commit("UPDATE_status", resp.status);
			context.commit("UPDATE_book", resp.id)
		},
		async updateAuthor(context, payload) {
			var data = payload
			var resp = await fetch(BASE_URL + "authors/" + data.id, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json',
					'Authorization': 'Bearer '+ this.state.JWT
				},
				body: JSON.stringify(data)
			}).then((response) => response.json());

			console.log(resp)
			context.commit("UPDATE_message", resp.message);
			context.commit("UPDATE_status", resp.status);
			context.commit("UPDATE_author", resp.id)
		},
		async getUserBooks(context, payload) {
			var id = payload.id
			var resp = await fetch(BASE_URL + "users/" + id + "/books",{
				headers:{
					'Authorization': 'Bearer '+ this.state.JWT
				}
			})
				.then((response) => response.json());

			if (resp.status == 200) {
				context.commit("UPDATE_books", resp)
			}
			else {
				console.log(resp)
				throw new Error(resp)
			}
		},
	},

	getters: {},
});
