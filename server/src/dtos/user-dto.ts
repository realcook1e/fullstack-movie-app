import { Document } from "mongoose";
import { IUser } from "../types/schemas.types";

export default class UserDto {
	username;
	email;
	id;
	role;

	constructor(model: IUser) {
		this.username = model.username;
		this.email = model.email;
		this.id = model._id;
		this.role = model.role;
	}
}
