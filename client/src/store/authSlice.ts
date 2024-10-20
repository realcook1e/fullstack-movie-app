import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/auth";
import { IAuthState } from "../types/store.types";
import { IAuthResponse } from "../types/api.types";

const initialState: IAuthState = {
	id: localStorage.getItem("id") || null,
	username: localStorage.getItem("username") || null,
	email: localStorage.getItem("email") || null,
	role: localStorage.getItem("role") || null,
	isLogged: localStorage.getItem("isLogged") === "true" ? true : false,
};
const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		logout(state) {
			localStorage.clear();
			state.id = null;
			state.username = null;
			state.email = null;
			state.role = null;
			state.isLogged = false;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }: PayloadAction<IAuthResponse>) => {
				console.log(payload);
				state.id = payload.user.id;
				state.username = payload.user.username;
				state.email = payload.user.email;
				state.role = payload.user.role;
				state.isLogged = true;
			}
		);
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
