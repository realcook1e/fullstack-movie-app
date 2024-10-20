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
const review_model_1 = __importDefault(require("../models/review-model"));
const user_model_1 = __importDefault(require("../models/user-model"));
const movie_model_1 = __importDefault(require("../models/movie-model"));
class ReviewService {
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userID, movieID, text, date } = data;
            if (!text.trim().length) {
                throw new Error("Текст сообщения не может быть пустым");
            }
            const findUser = yield user_model_1.default.findOne({ _id: userID });
            if (!findUser) {
                throw new Error("Пользователь не найден");
            }
            const findMovie = yield movie_model_1.default.findOne({ _id: movieID });
            if (!findMovie) {
                throw new Error("Фильм не найден");
            }
            yield review_model_1.default.create({
                userID,
                movieID,
                text,
                date,
            });
        });
    }
    editReview(id, newText) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield review_model_1.default.findOneAndUpdate({ _id: id }, { text: newText });
            }
            catch (e) {
                throw new Error(`Ошибка при изменении комментария`);
            }
        });
    }
}
exports.default = new ReviewService();
