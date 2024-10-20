import { Request, Response } from "express";
import RoleModel from "../models/role-model";

class RoleController {
	async addRole(req: Request, res: Response) {
		try {
			const { value } = <{ value: string }>req.body;
			const findRole = await RoleModel.findOne({ value });

			if (findRole) {
				throw new Error("Данная роль уже создана");
			}

			const role = await RoleModel.create({ value });
			res.status(200).json(role);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async getAllRoles(req: Request, res: Response) {
		try {
			const roles = await RoleModel.find();
			res.status(200).json(roles);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка получения ролей" });
		}
	}
}

export default new RoleController();
