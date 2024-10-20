"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, ref: "Role", required: true },
    favorite_movies: [{ type: mongodb_1.ObjectId, ref: "Movie" }],
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
