import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
	reducerPath: "moviesApi",
	tagTypes: ["Movies", "Reviews"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/movies" }),
	endpoints: builder => ({
		addMovie: builder.mutation({
			query: body => ({
				url: `/`,
				method: "POST",
				body,
			}),
		}),
		getAllMovies: builder.query({
			query: () => ({
				url: `/`,
				method: "GET",
			}),
		}),
		getMovieInfo: builder.query({
			query: id => ({
				url: `/${id}`,
				method: "GET",
			}),
		}),
		getMoviePoster: builder.query({
			query: id => ({
				url: `/${id}/poster`,
				method: "GET",
			}),
		}),
		removeMovie: builder.mutation({
			query: id => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
		getComments: builder.query({
			query: id => ({
				url: `/${id}/comments`,
				method: "GET",
			}),
			providesTags: (result, error, arg) =>
				result
					? [...result.map(({ id }) => ({ type: "Reviews", id })), "Reviews"]
					: ["Reviews"],
		}),
	}),
});

export const {
	useAddMovieMutation,
	useGetAllMoviesQuery,
	useGetMovieInfoQuery,
	useGetMoviePosterQuery,
	useRemoveMovieMutation,
	useGetCommentsQuery,
} = moviesApi;
