import { Types } from "mongoose";

export interface IUser {
	_id: Types.ObjectId;
	username: string;
	email: string;
	password: string;
	role: string;
	favorite_movies: Types.ObjectId[];
}

export interface IMovie {
	_id: Types.ObjectId;
	title: string;
	description: string;
	country: string;
	genre: string;
	casting: string;
	director: string;
	year: number;
	poster: string;
	duration?: number;
	rating?: Types.Decimal128;
}

export interface IReview {
	_id: Types.ObjectId;
	userID: Types.ObjectId;
	movieID: Types.ObjectId;
	text: string;
	date: string;
}

export interface IFeedback {
	_id: Types.ObjectId;
	name: string;
	email: string;
	subject: string;
	message: string;
	phone?: string;
}
