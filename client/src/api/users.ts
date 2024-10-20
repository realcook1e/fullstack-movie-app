import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	IChangeRoleRequest,
	IFavoriteMovieRequest,
	IResponseWithMessage,
	IUser,
} from "../types/api.types";

export const usersApi = createApi({
	reducerPath: "usersApi",
	tagTypes: ["User"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/users",
	}),
	endpoints: builder => ({
		getUserInfo: builder.query<IUser, string>({
			query: username => ({
				url: `/${username}`,
				method: "GET",
			}),
		}),
		getUserInfoById: builder.query<IUser, string>({
			query: id => ({
				url: `id/${id}`,
				method: "GET",
			}),
		}),
		getAllUsers: builder.query<IUser[], void>({
			query: () => ({
				url: `/`,
				method: "GET",
			}),
		}),
		changeRole: builder.mutation<IResponseWithMessage, IChangeRoleRequest>(
			{
				query: ({ username, ...body }) => ({
					url: `/${username}/role`,
					method: "PUT",
					body,
				}),
			}
		),
		addMovieToFavorites: builder.mutation<
			IResponseWithMessage,
			IFavoriteMovieRequest
		>({
			query: ({ username, ...body }) => ({
				url: `/${username}/favorites`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		removeMovieFromFavorites: builder.mutation<
			IResponseWithMessage,
			IFavoriteMovieRequest
		>({
			query: ({ username, ...body }) => ({
				url: `/${username}/favorites`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		getFavoriteMovies: builder.query<string[], string>({
			query: username => ({
				url: `/${username}/favorites`,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
	}),
});

export const {
	useGetUserInfoQuery,
	useGetUserInfoByIdQuery,
	useGetAllUsersQuery,
	useChangeRoleMutation,
	useAddMovieToFavoritesMutation,
	useRemoveMovieFromFavoritesMutation,
	useGetFavoriteMoviesQuery,
} = usersApi;
