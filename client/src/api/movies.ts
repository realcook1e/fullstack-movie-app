import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	IAddMovieRequest,
	IMovieResponse,
	IResponseWithMessage,
	IReviewResponse,
} from "../types/api.types";

export const moviesApi = createApi({
	reducerPath: "moviesApi",
	tagTypes: ["Movies", "Reviews"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/movies",
	}),
	endpoints: builder => ({
		addMovie: builder.mutation<IMovieResponse, IAddMovieRequest>({
			query: body => ({
				url: `/`,
				method: "POST",
				body,
			}),
		}),
		getAllMovies: builder.query<IMovieResponse[], void>({
			query: () => ({
				url: `/`,
				method: "GET",
			}),
		}),
		getMovieInfo: builder.query<IMovieResponse, string>({
			query: id => ({
				url: `/${id}`,
				method: "GET",
			}),
		}),
		getMoviePoster: builder.query<string, string>({
			query: id => ({
				url: `/${id}/poster`,
				method: "GET",
			}),
		}),
		removeMovie: builder.mutation<IResponseWithMessage, string>({
			query: id => ({
				url: `/${id}`,
				method: "DELETE",
			}),
		}),
		getComments: builder.query<IReviewResponse[], string>({
			query: id => ({
				url: `/${id}/comments`,
				method: "GET",
			}),
			providesTags: ["Reviews"],
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
