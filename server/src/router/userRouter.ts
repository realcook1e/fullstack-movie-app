import express from "express";
import userController from "../controllers/user-controller";

const userRouter = express.Router();
userRouter.get("/", userController.getAll);
userRouter.put("/:username/role", userController.changeRole);
userRouter.get("/:username", userController.getOne);
userRouter.get("/id/:id", userController.getOneById);
userRouter.get("/:username/favorites", userController.getFavoriteMovies);
userRouter.post(
	"/:username/favorites",
	userController.addMovieToFavorites
);
userRouter.put(
	"/:username/favorites",
	userController.removeMovieFromFavorites
);

export default userRouter;
