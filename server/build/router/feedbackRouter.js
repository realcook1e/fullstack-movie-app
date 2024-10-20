"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = __importDefault(require("../controllers/feedback-controller"));
const feedbackRouter = express_1.default.Router();
feedbackRouter.post("/", feedback_controller_1.default.sendMessage);
feedbackRouter.get("/", feedback_controller_1.default.getAllMessages);
exports.default = feedbackRouter;
