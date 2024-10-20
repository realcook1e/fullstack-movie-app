"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_model_1 = __importDefault(require("../models/role-model"));
class RoleController {
    addRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value } = req.body;
                const findRole = yield role_model_1.default.findOne({ value });
                if (findRole) {
                    throw new Error("Данная роль уже создана");
                }
                const role = yield role_model_1.default.create({ value });
                res.status(200).json(role);
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    getAllRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield role_model_1.default.find();
                res.status(200).json(roles);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: "Ошибка получения ролей" });
            }
        });
    }
}
exports.default = new RoleController();
