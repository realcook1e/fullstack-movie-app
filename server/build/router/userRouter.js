"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const userRouter = express_1.default.Router();
userRouter.get("/", user_controller_1.default.getAll);
userRouter.put("/:username/role", user_controller_1.default.changeRole);
userRouter.get("/:username", user_controller_1.default.getOne);
userRouter.get("/id/:id", user_controller_1.default.getOneById);
userRouter.get("/:username/favorites", user_controller_1.default.getFavoriteMovies);
userRouter.post("/:username/favorites", user_controller_1.default.addMovieToFavorites);
userRouter.put("/:username/favorites", user_controller_1.default.removeMovieFromFavorites);
exports.default = userRouter;
