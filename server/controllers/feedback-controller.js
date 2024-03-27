const FeedbackModel = require("../models/feedback-model");

class FeedbackController {
	async sendMessage(req, res, next) {
		try {
			const { name, email, phone, subject, message } = req.body;
			const messageData = await FeedbackModel.create({
				name,
				email,
				phone,
				subject,
				message,
			});
			return res.status(200).json(messageData);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка при создании запроса" });
		}
	}

	async getAllMessages(req, res, next) {
		try {
			const messages = await FeedbackModel.find();
			return res.status(200).json(messages);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Ошибка при получении списка запросов" });
		}
	}
}

module.exports = new FeedbackController();
