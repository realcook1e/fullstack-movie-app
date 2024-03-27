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
	}),
});

export const {
	useAddMovieMutation,
	useGetAllMoviesQuery,
	useGetMovieInfoQuery,
	useGetMoviePosterQuery,
	useRemoveMovieMutation,
} = moviesApi;
