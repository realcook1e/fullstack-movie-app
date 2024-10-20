import MovieModel from "../models/movie-model";
import { IMovieRequest } from "../types/controllers.types";
import { IMovie } from "../types/schemas.types";

class MovieService {
	async add(movie: IMovieRequest) {
		const movieData = await MovieModel.create({
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
	}

	async getMovie(id: string) {
		const movieData = await MovieModel.findOne({ _id: id });
		if (!movieData) {
			throw new Error(`Фильма с id ${id} не найдено`);
		}
		return movieData;
	}

	async editMovie(id: string, newData: Omit<IMovie, "_id">) {
		try {
			const movieData = await MovieModel.findOneAndUpdate(
				{ _id: id },
				newData
			);
			return movieData;
		} catch (e) {
			throw new Error(`Ошибка при изменении данных о фильме`);
		}
	}
}

export default new MovieService();
