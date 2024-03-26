const ReviewModel = require("../models/review-model");
const UserModel = require("../models/user-model");
const MovieModel = require("../models/movie-model");

class ReviewService {
	async add(data) {
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

	async editReview(id, newText) {
		try {
			await ReviewModel.findOneAndUpdate({ _id: id }, { text: newText });
		} catch (e) {
			throw new Error(`Ошибка при изменении комментария`);
		}
	}
}

module.exports = new ReviewService();
