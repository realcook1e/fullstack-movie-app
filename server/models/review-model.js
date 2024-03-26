const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
	userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
	movieID: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
	date: { type: Date, required: true },
	text: { type: String, required: true },
});

module.exports = model("Review", ReviewSchema);
