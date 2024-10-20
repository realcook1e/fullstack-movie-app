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
const review_model_1 = __importDefault(require("../models/review-model"));
const review_service_1 = __importDefault(require("../services/review-service"));
class ReviewController {
    addReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userID, movieID, date, text } = (req.body);
                yield review_service_1.default.add({ userID, movieID, date, text });
                res.status(200).json({ message: "Комментарий добавлен" });
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    editReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { text } = req.body;
                if (!text) {
                    throw new Error("Ошибка при изменении комментария");
                }
                yield review_service_1.default.editReview(id, text);
                res.status(200).json({ message: "Комментарий изменен" });
            }
            catch (e) {
                console.log(e);
                if (e instanceof Error) {
                    res.status(500).json({ message: e.message });
                }
            }
        });
    }
    deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield review_model_1.default.findOneAndDelete({ _id: id });
                res.status(200).json({ message: `Комментарий удален` });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: "Ошибка при удалении комментария" });
            }
        });
    }
}
exports.default = new ReviewController();
