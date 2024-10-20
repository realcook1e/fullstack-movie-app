"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = __importDefault(require("../controllers/review-controller"));
const reviewRouter = express_1.default.Router();
reviewRouter.post("/", review_controller_1.default.addReview);
reviewRouter.put("/:id", review_controller_1.default.editReview);
reviewRouter.delete("/:id", review_controller_1.default.deleteReview);
exports.default = reviewRouter;
