import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	INewFeedbackRequest,
	INewFeedbackResponse,
} from "../types/api.types";

export const feedbackApi = createApi({
	reducerPath: "feedbackApi",
	tagTypes: ["Feedback"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000/api/feedbacks",
	}),
	endpoints: builder => ({
		sendMessage: builder.mutation<
			INewFeedbackResponse,
			INewFeedbackRequest
		>({
			query: body => ({
				url: "/",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useSendMessageMutation } = feedbackApi;
