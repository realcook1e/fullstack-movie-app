import ReviewModel from "../models/review-model";
import UserModel from "../models/user-model";
import MovieModel from "../models/movie-model";
import { IReview } from "../types/schemas.types";

class ReviewService {
	async add(data: Omit<IReview, "_id">) {
		const { userID, movieID, text, date } = data;

		if (!text.trim().length) {
			throw new Error("Текст сообщения не может быть пустым");
		}
		const findUser = await UserModel.findOne({ _id: userID });
		if (!findUser) {
			throw new Error("Пользователь не найден");
		}
		const findMovie = await MovieModel.findOne({ _id: movieID });
		if (!findMovie) {
			throw new Error("Фильм не найден");
		}

		await ReviewModel.create({
			userID,
			movieID,
			text,
			date,
		});
	}

	async editReview(id: string, newText: string) {
		try {
			await ReviewModel.findOneAndUpdate({ _id: id }, { text: newText });
		} catch (e) {
			throw new Error(`Ошибка при изменении комментария`);
		}
	}
}

export default new ReviewService();
