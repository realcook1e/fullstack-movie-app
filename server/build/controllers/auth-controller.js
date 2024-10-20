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
const user_service_1 = __importDefault(require("../services/user-service"));
const express_validator_1 = require("express-validator");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    throw new Error(`Ошибка при валидации`);
                }
                const { email, username, password } = req.body;
                const userData = yield user_service_1.default.register(username, email, password);
                res.status(200).json({ message: "Успешная регистрация" });
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const userData = yield user_service_1.default.login(username, password);
                res.status(200).json(userData);
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
}
exports.default = new AuthController();
