"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const movie_controller_1 = __importDefault(require("../controllers/movie-controller"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); //Appending extension
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const movieRouter = express_1.default.Router();
movieRouter.post("/", upload.single("poster"), movie_controller_1.default.addMovie);
movieRouter.get("/", movie_controller_1.default.getAllMovies);
movieRouter.get("/:id", movie_controller_1.default.getMovie);
movieRouter.get("/:id/poster", movie_controller_1.default.getMoviePoster);
movieRouter.put("/:id", movie_controller_1.default.editMovie);
movieRouter.delete("/:id", movie_controller_1.default.deleteMovie);
movieRouter.get("/:id/comments", movie_controller_1.default.getComments);
exports.default = movieRouter;
