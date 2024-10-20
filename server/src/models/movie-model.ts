import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	country: { type: String, required: true },
	genre: { type: String, required: true },
	casting: { type: String, required: true },
	director: { type: String, required: true },
	duration: { type: Number },
	rating: { type: Schema.Types.Decimal128 },
	year: { type: Number, required: true },
	poster: { type: String, required: true },
});

export default model("Movie", MovieSchema);
