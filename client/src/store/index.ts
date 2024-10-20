import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { authApi } from "../api/auth";
import { feedbackApi } from "../api/feedback";
import { usersApi } from "../api/users";
import { moviesApi } from "../api/movies";
import { reviewsApi } from "../api/reviews";
import { IAuthState } from "../types/store.types";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[feedbackApi.reducerPath]: feedbackApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[moviesApi.reducerPath]: moviesApi.reducer,
		[reviewsApi.reducerPath]: reviewsApi.reducer,
		authSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(feedbackApi.middleware)
			.concat(usersApi.middleware)
			.concat(moviesApi.middleware)
			.concat(reviewsApi.middleware),
});

const saveToLocalStorage = (state: IAuthState) => {
	try {
		if (state.isLogged === false) {
			localStorage.clear();
			return;
		}

		let key: keyof IAuthState;
		for (key in state) {
			if (state && state[key] !== null && state[key] !== undefined)
				localStorage.setItem(key, state[key]!.toString());
		}
	} catch (e) {
		console.error(e);
	}
};

store.subscribe(() => {
	saveToLocalStorage(store.getState().authSlice);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
