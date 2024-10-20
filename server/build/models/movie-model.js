"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    genre: { type: String, required: true },
    casting: { type: String, required: true },
    director: { type: String, required: true },
    duration: { type: Number },
    rating: { type: mongoose_1.Schema.Types.Decimal128 },
    year: { type: Number, required: true },
    poster: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Movie", MovieSchema);
