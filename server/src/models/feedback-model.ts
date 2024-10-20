import { Schema, model } from "mongoose";

const FeedbackSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: String,
	subject: { type: String, required: true },
	message: { type: String, required: true },
});

export default model("Feedback", FeedbackSchema);
