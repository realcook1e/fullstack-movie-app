const UserModel = require("../models/user-model");
const RoleModel = require("../models/role-model");
const UserDto = require("../dtos/user-dto");

const bcrypt = require("bcrypt");

class UserService {
	async register(username, email, password) {
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
			role: userRole.value,
		});

		const userDto = new UserDto(user);

		return {
			user: userDto,
		};
	}

	async login(username, password) {
		const user = await UserModel.findOne({ username });
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

module.exports = new UserService();
