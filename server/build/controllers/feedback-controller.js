"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedback_model_1 = __importDefault(require("../models/feedback-model"));
class FeedbackController {
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, subject, message } = req.body;
                const messageData = yield feedback_model_1.default.create({
                    name,
                    email,
                    phone,
                    subject,
                    message,
                });
                res.status(200).json(messageData);
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: "Ошибка при создании запроса" });
            }
        });
    }
    getAllMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield feedback_model_1.default.find();
                res.status(200).json(messages);
            }
            catch (e) {
                console.log(e);
                res
                    .status(500)
                    .json({ message: "Ошибка при получении списка запросов" });
            }
        });
    }
}
exports.default = new FeedbackController();
