import { Multer } from "multer";
import { IMovie } from "./schemas.types";

export interface IRegisterBody {
	username: string;
	email: string;
	password: string;
}

export interface ILoginBody extends Omit<IRegisterBody, "email"> {}

export interface IMovieRequest extends Omit<IMovie, "_id" | "poster"> {
	poster: Express.Multer.File;
}
