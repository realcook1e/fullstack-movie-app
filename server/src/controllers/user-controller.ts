import UserModel from "../models/user-model";
import RoleModel from "../models/role-model";
import UserDto from "../dtos/user-dto";
import { Request, Response } from "express";
import { Types } from "mongoose";

class UserController {
	async changeRole(req: Request, res: Response) {
		try {
			const { value } = <{ value: string }>req.body;
			const { username } = req.params;

			const findUser = await UserModel.findOne({ username });
			if (!findUser) {
				throw new Error("Пользователь не найден");
			}

			const findRole = await RoleModel.findOne({ value });
			if (!findRole) {
				throw new Error("Указанная роль не существует");
			}

			findUser.role = value;
			findUser.save();
			res.status(200).json({
				message: `Роль пользователя ${username} изменена на ${value}`,
			});
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async getAll(req: Request, res: Response) {
		try {
			const users = await UserModel.find();
			res.status(200).json(users.map(user => new UserDto(user)));
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка получения пользователей" });
		}
	}

	async getOne(req: Request, res: Response) {
		try {
			const { username } = req.params;
			const user = await UserModel.findOne({ username });
			if (!user) {
				throw new Error("Пользователь не найден");
			}
			const userDto = new UserDto(user);
			res.status(200).json(userDto);
		} catch (e) {
			console.log(e);
			res
				.status(500)
				.json({ message: "Ошибка получения данных о пользователе" });
		}
	}

	async getOneById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await UserModel.findOne({ _id: id });
			if (!user) {
				throw new Error("Пользователь не найден");
			}
			const userDto = new UserDto(user);
			res.status(200).json(userDto);
		} catch (e) {
			console.log(e);
			res
				.status(500)
				.json({ message: "Ошибка получения данных о пользователе" });
		}
	}

	async addMovieToFavorites(req: Request, res: Response) {
		try {
			const { username } = req.params;
			const { movieID } = <{ movieID: Types.ObjectId }>req.body;
			const user = await UserModel.findOne({ username });
			if (!user) {
				throw new Error("Пользователь не найден");
			}
			user.favorite_movies.push(movieID);
			user.save();
			res.status(200).json({ message: "Фильм добавлен в избранное" });
		} catch (e) {
			console.log(e);
			res
				.status(500)
				.json({ message: "Ошибка при добавлении фильма в избранное" });
		}
	}

	async removeMovieFromFavorites(req: Request, res: Response) {
		try {
			const { username } = req.params;
			const { movieID } = <{ movieID: Types.ObjectId }>req.body;
			const user = await UserModel.updateOne(
				{ username },
				{ $pull: { favorite_movies: movieID } }
			);
			res.status(200).json({ message: "Фильм удален из избранного" });
		} catch (e) {
			console.log(e);
			res
				.status(500)
				.json({ message: "Ошибка при удалении фильма из избранного" });
		}
	}

	async getFavoriteMovies(req: Request, res: Response) {
		try {
			const { username } = req.params;
			const user = await UserModel.findOne({ username });
			if (!user) {
				throw new Error("Пользователь не найден");
			}
			res.status(200).json(user.favorite_movies);
		} catch (e) {
			console.log(e);
			res
				.status(500)
				.json({ message: "Ошибка получения любимых фильмов" });
		}
	}
}

export default new UserController();
