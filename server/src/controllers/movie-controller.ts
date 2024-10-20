import { Request, Response } from "express";
import MovieModel from "../models/movie-model";
import ReviewModel from "../models/review-model";
import movieService from "../services/movie-service";
import { IMovie } from "../types/schemas.types";

class MovieController {
	async addMovie(req: Request, res: Response) {
		try {
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
			} = <Omit<IMovie, "_id" | "poster">>req.body;
			let poster = req.file;
			console.log(poster);

			if (!poster) {
				throw new Error("Постер отсутствует");
			}

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

			res.status(200).json(movieData);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async getAllMovies(req: Request, res: Response) {
		try {
			const movies = await MovieModel.find();
			res.status(200).json(movies);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка получения фильмов" });
		}
	}

	async getMovie(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const movieData = await movieService.getMovie(id);
			res.status(200).json(movieData);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async getMoviePoster(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const movieData = await MovieModel.findOne({ _id: id });
			if (movieData) {
				res
					.status(200)
					.json(
						`${req.protocol}://${req.get("host")}/${movieData.poster}`
					);
			}
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async editMovie(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const movieData = await movieService.editMovie(id, req.body);
			res.status(200).json(movieData);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async deleteMovie(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const deletedMovie = await MovieModel.findOneAndDelete({ _id: id });
			res.status(200).json({ message: `Фильм удален` });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка при удалении фильма" });
		}
	}

	async getComments(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const comments = await ReviewModel.find({ movieID: id });
			res.status(200).json(comments);
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}
}

export default new MovieController();
