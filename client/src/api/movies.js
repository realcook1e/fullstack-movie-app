import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
	reducerPath: "moviesApi",
	tagTypes: ["Movies"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/movies" }),
	endpoints: builder => ({
		addMovie: builder.mutation({
			query: body => ({
				url: `/`,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useAddMovieMutation } = moviesApi;
