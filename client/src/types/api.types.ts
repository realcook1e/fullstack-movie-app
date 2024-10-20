import { IAuthState } from "./store.types";

export interface IAuthRequest {
	username: string;
	password: string;
}

export interface IAuthResponse {
	user: NonNullable<Omit<IAuthState, "isLogged">>;
}

export interface IResponseWithMessage {
	message: string;
}

export interface IRegisterRequest {
	username: string;
	password: string;
	email: string;
}

export interface INewFeedbackRequest {
	name: string;
	email: string;
	message: string;
	subject: string;
	phone?: string;
}

export interface INewFeedbackResponse extends INewFeedbackRequest {
	_id: string;
}

export interface IAddMovieRequest {
	title: string;
	description: string;
	genre: string;
	country: string;
	year: number | string;
	casting: string;
	director: string;
	poster: File;
	duration?: number | string;
	rating?: number | string;
}

export interface IMovieResponse
	extends Omit<IAddMovieRequest, "poster" | "rating"> {
	_id: string;
	poster: string;
	rating: { $numberDecimal: string };
}

export interface INewReviewRequest {
	text: string;
	date: string;
	movieID: string;
	userID: string;
}

export interface IReviewResponse extends INewReviewRequest {
	_id: string;
}

export interface IUser {
	id: string;
	username: string;
	email: string;
	role: string;
}

export interface IChangeRoleRequest {
	username: string;
	value: "admin" | "user";
}

export interface IFavoriteMovieRequest {
	username: string;
	movieID: string;
}

export interface IServerError {
	message: string;
	[key: string]: any;
}
