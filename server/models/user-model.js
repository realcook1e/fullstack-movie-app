const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	username: { type: String, unique: true, required: true },
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	role: { type: String, ref: "Role", required: true },
	favorite_movies: [{ type: ObjectId, ref: "Movie" }],
});

module.exports = model("User", UserSchema);
