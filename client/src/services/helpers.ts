import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IMovieResponse, IServerError } from "../types/api.types";

export function isFetchBaseQueryError(
	error: unknown
): error is FetchBaseQueryError {
	return typeof error === "object" && error != null && "data" in error;
}

export function isServerError(
	errorData: unknown
): errorData is IServerError {
	return (
		typeof errorData === "object" &&
		errorData != null &&
		"message" in errorData
	);
}

export function isMovieResponse(data: unknown): data is IMovieResponse {
	return typeof data === "object" && data !== null && "title" in data;
}
