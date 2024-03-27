import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { authApi } from "../api/auth";
import { feedbackApi } from "../api/feedback";

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[feedbackApi.reducerPath]: feedbackApi.reducer,
		authSlice,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(authApi.middleware).concat(feedbackApi.middleware),
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
