const RoleModel = require("../models/role-model");

class RoleController {
	async addRole(req, res, next) {
		try {
			const { value } = req.body;
			const findRole = await RoleModel.findOne({ value });

			if (findRole) {
				throw new Error("Данная роль уже создана");
			}

			const role = await RoleModel.create({ value });
			return res.status(200).json(role);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}

	async getAllRoles(req, res, next) {
		try {
			const roles = await RoleModel.find();
			return res.status(200).json(roles);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка получения ролей" });
		}
	}
}

module.exports = new RoleController();
