const Router = require("express").Router;
const { body } = require("express-validator");
const movieController = require("../controllers/movie-controller");

const movieRouter = new Router();
movieRouter.post(
	"/",
	body("title").trim().isLength({ min: 1, max: 80 }),
	body("description").trim().isLength({ min: 4 }),
	body("country").trim().isLength({ min: 2, max: 60 }),
	body("genre").trim().isLength({ min: 2, max: 80 }),
	body("year").isInt({ min: 1900, max: 2024 }),
	movieController.addMovie
);
movieRouter.get("/", movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovie);
movieRouter.put("/:id", movieController.editMovie);
movieRouter.delete("/:id", movieController.deleteMovie);

module.exports = movieRouter;
