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
const movie_model_1 = __importDefault(require("../models/movie-model"));
class MovieService {
    add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieData = yield movie_model_1.default.create({
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                year: movie.year,
                country: movie.country,
                casting: movie.casting,
                director: movie.director,
                duration: movie.duration,
                rating: movie.rating,
                poster: movie.poster.path.replace("\\", "/"),
            });
            return movieData;
        });
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const movieData = yield movie_model_1.default.findOne({ _id: id });
            if (!movieData) {
                throw new Error(`Фильма с id ${id} не найдено`);
            }
            return movieData;
        });
    }
    editMovie(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movieData = yield movie_model_1.default.findOneAndUpdate({ _id: id }, newData);
                return movieData;
            }
            catch (e) {
                throw new Error(`Ошибка при изменении данных о фильме`);
            }
        });
    }
}
exports.default = new MovieService();
