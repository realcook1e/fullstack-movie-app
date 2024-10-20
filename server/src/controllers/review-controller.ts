import { Request, Response } from "express";
import ReviewModel from "../models/review-model";
import reviewService from "../services/review-service";
import { IReview } from "../types/schemas.types";

class ReviewController {
	async addReview(req: Request, res: Response) {
		try {
			const { userID, movieID, date, text } = <Omit<IReview, "_id">>(
				req.body
			);

			await reviewService.add({ userID, movieID, date, text });
			res.status(200).json({ message: "Комментарий добавлен" });
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async editReview(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { text } = req.body;
			if (!text) {
				throw new Error("Ошибка при изменении комментария");
			}
			await reviewService.editReview(id, text);
			res.status(200).json({ message: "Комментарий изменен" });
		} catch (e) {
			console.log(e);
			if (e instanceof Error) {
				res.status(500).json({ message: e.message });
			}
		}
	}

	async deleteReview(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await ReviewModel.findOneAndDelete({ _id: id });
			res.status(200).json({ message: `Комментарий удален` });
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка при удалении комментария" });
		}
	}
}

export default new ReviewController();
