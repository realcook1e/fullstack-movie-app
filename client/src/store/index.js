import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { authApi } from "../api/auth";
import { feedbackApi } from "../api/feedback";
import { usersApi } from "../api/users";
import { moviesApi } from "../api/movies";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[feedbackApi.reducerPath]: feedbackApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[moviesApi.reducerPath]: moviesApi.reducer,
		authSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(feedbackApi.middleware)
			.concat(usersApi.middleware)
			.concat(moviesApi.middleware),
});

const saveToLocalStorage = state => {
	try {
		if (state.isLogged === false) {
			localStorage.clear();
			return;
		}
		for (let key in state) {
			localStorage.setItem(key, state[key]);
		}
	} catch (e) {
		console.error(e);
	}
};

store.subscribe(() => {
	saveToLocalStorage(store.getState().authSlice);
	console.log(store.getState().authSlice);
});
