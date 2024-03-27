const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	country: { type: String, required: true },
	genre: { type: String, required: true },
	casting: { type: String, required: true },
	director: { type: String, required: true },
	duration: { type: Number },
	rating: { type: Number },
	year: { type: Number, required: true },
	poster: { type: String, required: true },
});

module.exports = model("Movie", MovieSchema);
