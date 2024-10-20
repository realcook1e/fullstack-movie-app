import express from "express";
import reviewController from "../controllers/review-controller";

const reviewRouter = express.Router();
reviewRouter.post("/", reviewController.addReview);
reviewRouter.put("/:id", reviewController.editReview);
reviewRouter.delete("/:id", reviewController.deleteReview);

export default reviewRouter;
