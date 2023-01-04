import { createStore } from "vuex";
const BASE_URL = "http://localhost:3000/";

// Ejemplo de uso de store
/* <p>{{ $store.state.firstName }} {{ $store.state.lastName }}</p> */
export default createStore({
	state: {
		JWT: "",
		message: "",
		status: "",
		books: [],
		book: [],
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

		async getItem(context, payload) {
			var result = state.books.find((obj) => {
				return obj.id === payload.id;
			});

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
	},

	getters: {},
});