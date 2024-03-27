const MovieModel = require("../models/movie-model");
const movieService = require("../services/movie-service");
const { validationResult } = require("express-validator");

class MovieController {
	async addMovie(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw new Error(`Ошибка при заполнении данных о фильме`);
			}

			const {
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
			} = req.body;
			const movieData = await movieService.add({
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

			return res.status(200).json(movieData);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}

	async getAllMovies(req, res, next) {
		try {
			const movies = await MovieModel.find();
			return res.status(200).json(movies);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка получения фильмов" });
		}
	}

	async getMovie(req, res, next) {
		try {
			const { id } = req.params;
			const movieData = await movieService.getMovie(id);
			return res.status(200).json(movieData);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}

	async editMovie(req, res, next) {
		try {
			const { id } = req.params;
			const movieData = await movieService.editMovie(id, req.body);
			return res.status(200).json(movieData);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}

	async deleteMovie(req, res, next) {
		try {
			const { id } = req.params;
			const deletedMovie = await MovieModel.findOneAndDelete({ _id: id });
			return res.status(200).json({ message: `Фильм удален` });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка при удалении фильма" });
		}
	}
}

module.exports = new MovieController();
