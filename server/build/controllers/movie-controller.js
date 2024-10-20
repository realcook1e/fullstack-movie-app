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
const review_model_1 = __importDefault(require("../models/review-model"));
const movie_service_1 = __importDefault(require("../services/movie-service"));
class MovieController {
    addMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, genre, year, country, casting, director, duration, rating, } = req.body;
                let poster = req.file;
                console.log(poster);
                if (!poster) {
                    throw new Error("Постер отсутствует");
                }
                const movieData = yield movie_service_1.default.add({
                    title,
                    description,
                    genre,
                    year,
                    country,
                    casting,
                    director,
                    duration,
                    rating,
                    poster,
                });
                res.status(200).json(movieData);
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    getAllMovies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield movie_model_1.default.find();
                res.status(200).json(movies);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: "Ошибка получения фильмов" });
            }
        });
    }
    getMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const movieData = yield movie_service_1.default.getMovie(id);
                res.status(200).json(movieData);
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    getMoviePoster(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const movieData = yield movie_model_1.default.findOne({ _id: id });
                if (movieData) {
                    res
                        .status(200)
                        .json(`${req.protocol}://${req.get("host")}/${movieData.poster}`);
                }
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    editMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const movieData = yield movie_service_1.default.editMovie(id, req.body);
                res.status(200).json(movieData);
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    deleteMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletedMovie = yield movie_model_1.default.findOneAndDelete({ _id: id });
                res.status(200).json({ message: `Фильм удален` });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: "Ошибка при удалении фильма" });
            }
        });
    }
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comments = yield review_model_1.default.find({ movieID: id });
                res.status(200).json(comments);
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
exports.default = new MovieController();
