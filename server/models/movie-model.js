const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	country: { type: String, required: true },
	genre: { type: String, required: true },
	year: { type: Number },
	poster: { type: String, required: true },
});

module.exports = model("Movie", MovieSchema);
