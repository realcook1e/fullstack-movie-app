import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
	userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
	movieID: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
	date: { type: String, required: true },
	text: { type: String, required: true },
});

export default model("Review", ReviewSchema);
