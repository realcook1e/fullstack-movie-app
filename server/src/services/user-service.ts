import UserModel from "../models/user-model";
import RoleModel from "../models/role-model";
import UserDto from "../dtos/user-dto";

import bcrypt from "bcrypt";
import { IUser } from "../types/schemas.types";

class UserService {
	async register(username: string, email: string, password: string) {
		const findEmail = await UserModel.findOne({ email });
		const findUsername = await UserModel.findOne({ username });

		if (findEmail) {
			throw new Error("Пользователь с данным email уже существует");
		}
		if (findUsername) {
			throw new Error("Пользователь с данным логином уже существует");
		}

		const salt = bcrypt.genSaltSync(5);
		const hashPassword = await bcrypt.hash(password, salt);
		const userRole = await RoleModel.findOne({ value: "user" });

		const user = await UserModel.create({
			username,
			email,
			password: hashPassword,
			role: userRole?.value || "user",
		});

		const userDto = new UserDto(user);

		return {
			user: userDto,
		};
	}

	async login(username: string, password: string) {
		const user: IUser | null = await UserModel.findOne({ username });
		if (!user) {
			throw new Error("Пользователя с таким логином не существует");
		}

		const isPassEquals = await bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw new Error("Неверный пароль");
		}

		const userDto = new UserDto(user);
		return {
			user: userDto,
		};
	}
}

export default new UserService();
