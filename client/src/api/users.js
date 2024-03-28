import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
	reducerPath: "usersApi",
	tagTypes: ["User"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/users" }),
	endpoints: builder => ({
		getUserInfo: builder.query({
			query: username => ({
				url: `/${username}`,
				method: "GET",
			}),
		}),
		getUserInfoById: builder.query({
			query: id => ({
				url: `id/${id}`,
				method: "GET",
			}),
		}),
		getAllUsers: builder.query({
			query: () => ({
				url: `/`,
				method: "GET",
			}),
		}),
		changeRole: builder.mutation({
			query: ({ username, ...body }) => ({
				url: `/${username}/role`,
				method: "PUT",
				body,
			}),
		}),
		addMovieToFavorites: builder.mutation({
			query: ({ username, ...body }) => ({
				url: `/${username}/favorites`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		removeMovieFromFavorites: builder.mutation({
			query: ({ username, ...body }) => ({
				url: `/${username}/favorites`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ["User"],
		}),
		getFavoriteMovies: builder.query({
			query: username => ({
				url: `/${username}/favorites`,
				method: "GET",
			}),
			providesTags: (result, error, arg) =>
				result ? [...result.map(({ id }) => ({ type: "User", id })), "User"] : ["User"],
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
