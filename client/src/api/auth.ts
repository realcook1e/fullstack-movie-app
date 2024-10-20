import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	IAuthRequest,
	IAuthResponse,
	IRegisterRequest,
	IResponseWithMessage,
} from "../types/api.types";

export const authApi = createApi({
	reducerPath: "authApi",
	tagTypes: ["Auth"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth" }),
	endpoints: builder => ({
		login: builder.mutation<IAuthResponse, IAuthRequest>({
			query: body => ({
				url: "/login",
				method: "POST",
				body,
			}),
		}),
		register: builder.mutation<IResponseWithMessage, IRegisterRequest>({
			query: body => ({
				url: "/register",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
