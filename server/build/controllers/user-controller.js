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
class UserController {
    changeRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value } = req.body;
                const { username } = req.params;
                const findUser = yield user_model_1.default.findOne({ username });
                if (!findUser) {
                    throw new Error("Пользователь не найден");
                }
                const findRole = yield role_model_1.default.findOne({ value });
                if (!findRole) {
                    throw new Error("Указанная роль не существует");
                }
                findUser.role = value;
                findUser.save();
                res.status(200).json({
                    message: `Роль пользователя ${username} изменена на ${value}`,
                });
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find();
                res.status(200).json(users.map(user => new user_dto_1.default(user)));
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: "Ошибка получения пользователей" });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const user = yield user_model_1.default.findOne({ username });
                if (!user) {
                    throw new Error("Пользователь не найден");
                }
                const userDto = new user_dto_1.default(user);
                res.status(200).json(userDto);
            }
            catch (e) {
                console.log(e);
                res
                    .status(500)
                    .json({ message: "Ошибка получения данных о пользователе" });
            }
        });
    }
    getOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield user_model_1.default.findOne({ _id: id });
                if (!user) {
                    throw new Error("Пользователь не найден");
                }
                const userDto = new user_dto_1.default(user);
                res.status(200).json(userDto);
            }
            catch (e) {
                console.log(e);
                res
                    .status(500)
                    .json({ message: "Ошибка получения данных о пользователе" });
            }
        });
    }
    addMovieToFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const { movieID } = req.body;
                const user = yield user_model_1.default.findOne({ username });
                if (!user) {
                    throw new Error("Пользователь не найден");
                }
                user.favorite_movies.push(movieID);
                user.save();
                res.status(200).json({ message: "Фильм добавлен в избранное" });
            }
            catch (e) {
                console.log(e);
                res
                    .status(500)
                    .json({ message: "Ошибка при добавлении фильма в избранное" });
            }
        });
    }
    removeMovieFromFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const { movieID } = req.body;
                const user = yield user_model_1.default.updateOne({ username }, { $pull: { favorite_movies: movieID } });
                res.status(200).json({ message: "Фильм удален из избранного" });
            }
            catch (e) {
                console.log(e);
                res
                    .status(500)
                    .json({ message: "Ошибка при удалении фильма из избранного" });
            }
        });
    }
    getFavoriteMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username } = req.params;
                const user = yield user_model_1.default.findOne({ username });
                if (!user) {
                    throw new Error("Пользователь не найден");
                }
                res.status(200).json(user.favorite_movies);
            }
            catch (e) {
                console.log(e);
                res
                    .status(500)
                    .json({ message: "Ошибка получения любимых фильмов" });
            }
        });
    }
}
exports.default = new UserController();
