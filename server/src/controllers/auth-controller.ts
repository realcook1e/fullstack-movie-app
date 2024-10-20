import { Request, Response } from "express";
import userService from "../services/user-service";
import { validationResult } from "express-validator";
import { ILoginBody, IRegisterBody } from "../types/controllers.types";

class AuthController {
	async register(req: Request, res: Response) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw new Error(`Ошибка при валидации`);
			}

			const { email, username, password } = <IRegisterBody>req.body;
			const userData = await userService.register(
				username,
				email,
				password
			);
			res.status(200).json({ message: "Успешная регистрация" });
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { username, password } = <ILoginBody>req.body;
			const userData = await userService.login(username, password);
			res.status(200).json(userData);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}
}

export default new AuthController();
