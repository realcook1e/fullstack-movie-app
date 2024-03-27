import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
	reducerPath: "feedbackApi",
	tagTypes: ["Feedback"],
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/feedbacks" }),
	endpoints: builder => ({
		sendMessage: builder.mutation({
			query: body => ({
				url: "/",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useSendMessageMutation } = feedbackApi;
