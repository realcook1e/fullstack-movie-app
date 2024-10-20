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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter_1 = __importDefault(require("./router/authRouter"));
const roleRouter_1 = __importDefault(require("./router/roleRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const movieRouter_1 = __importDefault(require("./router/movieRouter"));
const reviewRouter_1 = __importDefault(require("./router/reviewRouter"));
const feedbackRouter_1 = __importDefault(require("./router/feedbackRouter"));
const PORT = 5000;
const DB_URL = "mongodb+srv://moviem191:H38kfz9kIQi4YyCq@cluster0.vczszun.mongodb.net/moviesDB?retryWrites=true&w=majority";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static("./images"));
app.use("/api/auth", authRouter_1.default);
app.use("/api/users", userRouter_1.default);
app.use("/api/roles", roleRouter_1.default);
app.use("/api/movies", movieRouter_1.default);
app.use("/api/reviews", reviewRouter_1.default);
app.use("/api/feedbacks", feedbackRouter_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(DB_URL);
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
start();
