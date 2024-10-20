import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { IUser } from "../types/schemas.types";

const UserSchema = new Schema<IUser>({
	username: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	role: { type: String, ref: "Role", required: true },
	favorite_movies: [{ type: ObjectId, ref: "Movie" }],
});

export default model("User", UserSchema);
