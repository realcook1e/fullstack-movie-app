const ReviewModel = require("../models/review-model");
const reviewService = require("../services/review-service");

class ReviewController {
	async addReview(req, res, next) {
		try {
			const { userID, movieID, date, text } = req.body;

			await reviewService.add({ userID, movieID, date, text });
			return res.status(200).json({ message: "Комментарий добавлен" });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}

	async editReview(req, res, next) {
		try {
			const { id } = req.params;
			const { text } = req.body;
			if (!text) {
				throw new Error("Ошибка при изменении комментария");
			}
			await reviewService.editReview(id, text);
			return res.status(200).json({ message: "Комментарий изменен" });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: e.message });
		}
	}

	async deleteReview(req, res, next) {
		try {
			const { id } = req.params;
			await ReviewModel.findOneAndDelete({ _id: id });
			return res.status(200).json({ message: `Комментарий удален` });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка при удалении комментария" });
		}
	}
}

module.exports = new ReviewController();
