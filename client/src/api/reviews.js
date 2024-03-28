import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
	reducerPath: "reviewsApi",
	tagTypes: ["Reviews"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/reviews" }),
	endpoints: builder => ({
		addComment: builder.mutation({
			query: body => ({
				url: `/`,
				method: "POST",
				body,
			}),
			invalidatesTags: ["Reviews"],
		}),
	}),
});

export const { useAddCommentMutation } = reviewsApi;
