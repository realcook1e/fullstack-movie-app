import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authApi",
	tagTypes: ["Auth"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth" }),
	endpoints: builder => ({
		login: builder.mutation({
			query: body => ({
				url: "/login",
				method: "POST",
				body,
			}),
		}),
		register: builder.mutation({
			query: body => ({
				url: "/register",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
