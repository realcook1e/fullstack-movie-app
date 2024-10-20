"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    userID: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    movieID: { type: mongoose_1.Schema.Types.ObjectId, ref: "Movie", required: true },
    date: { type: String, required: true },
    text: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Review", ReviewSchema);
