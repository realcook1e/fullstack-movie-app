const userService = require("../services/user-service");
const { validationResult } = require("express-validator");

class AuthController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw new Error(`Ошибка при валидации`);
			}

			const { email, username, password } = req.body;
			const userData = await userService.register(username, email, password);
			return res.status(200).json(userData);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}

	async login(req, res, next) {
		try {
			const { username, password } = req.body;
			const userData = await userService.login(username, password);
			return res.status(200).json(userData);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}
}

module.exports = new AuthController();
