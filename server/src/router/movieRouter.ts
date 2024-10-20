import express from "express";
import multer from "multer";
import path from "path";
import movieController from "../controllers/movie-controller";

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
	},
});
const upload = multer({ storage: storage });

const movieRouter = express.Router();
movieRouter.post("/", upload.single("poster"), movieController.addMovie);
movieRouter.get("/", movieController.getAllMovies);
movieRouter.get("/:id", movieController.getMovie);
movieRouter.get("/:id/poster", movieController.getMoviePoster);
movieRouter.put("/:id", movieController.editMovie);
movieRouter.delete("/:id", movieController.deleteMovie);
movieRouter.get("/:id/comments", movieController.getComments);

export default movieRouter;
