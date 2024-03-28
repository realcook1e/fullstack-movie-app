const Router = require("express").Router;
const userController = require("../controllers/user-controller");

const userRouter = new Router();
userRouter.get("/", userController.getAll);
userRouter.put("/:username/role", userController.changeRole);
userRouter.get("/:username", userController.getOne);
userRouter.get("/id/:id", userController.getOneById);
userRouter.get("/:username/favorites", userController.getFavoriteMovies);
userRouter.post("/:username/favorites", userController.addMovieToFavorites);
userRouter.put("/:username/favorites", userController.removeMovieFromFavorites);

module.exports = userRouter;
