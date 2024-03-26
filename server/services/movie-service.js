const MovieModel = require("../models/movie-model");

class MovieService {
	async add(movie) {
		const movieData = await MovieModel.create({
			title: movie.title,
			description: movie.description,
			genre: movie.genre,
			year: movie.year,
			country: movie.country,
			poster: movie.poster,
		});

		return movieData;
	}

	async getMovie(id) {
		const movieData = await MovieModel.findOne({ _id: id });
		if (!movieData) {
			throw new Error(`Фильма с id ${id} не найдено`);
		}
		return movieData;
	}

	async editMovie(id, newData) {
		try {
			const movieData = await MovieModel.findOneAndUpdate({ _id: id }, newData);
			return movieData;
		} catch (e) {
			throw new Error(`Ошибка при изменении данных о фильме`);
		}
	}
}

module.exports = new MovieService();
