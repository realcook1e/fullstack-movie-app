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
const user_model_1 = __importDefault(require("../models/user-model"));
const role_model_1 = __importDefault(require("../models/role-model"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const findEmail = yield user_model_1.default.findOne({ email });
            const findUsername = yield user_model_1.default.findOne({ username });
            if (findEmail) {
                throw new Error("Пользователь с данным email уже существует");
            }
            if (findUsername) {
                throw new Error("Пользователь с данным логином уже существует");
            }
            const salt = bcrypt_1.default.genSaltSync(5);
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            const userRole = yield role_model_1.default.findOne({ value: "user" });
            const user = yield user_model_1.default.create({
                username,
                email,
                password: hashPassword,
                role: (userRole === null || userRole === void 0 ? void 0 : userRole.value) || "user",
            });
            const userDto = new user_dto_1.default(user);
            return {
                user: userDto,
            };
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ username });
            if (!user) {
                throw new Error("Пользователя с таким логином не существует");
            }
            const isPassEquals = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassEquals) {
                throw new Error("Неверный пароль");
            }
            const userDto = new user_dto_1.default(user);
            return {
                user: userDto,
            };
        });
    }
}
exports.default = new UserService();
