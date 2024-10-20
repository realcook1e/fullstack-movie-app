import { Request, Response } from "express";
import FeedbackModel from "../models/feedback-model";
import { IFeedback } from "../types/schemas.types";

class FeedbackController {
	async sendMessage(req: Request, res: Response) {
		try {
			const { name, email, phone, subject, message } = <
				Omit<IFeedback, "_id">
			>req.body;
			const messageData = await FeedbackModel.create({
				name,
				email,
				phone,
				subject,
				message,
			});
			res.status(200).json(messageData);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка при создании запроса" });
		}
	}

	async getAllMessages(req: Request, res: Response) {
		try {
			const messages = await FeedbackModel.find();
			res.status(200).json(messages);
		} catch (e) {
			console.log(e);
			res
				.status(500)
				.json({ message: "Ошибка при получении списка запросов" });
		}
	}
}

export default new FeedbackController();
