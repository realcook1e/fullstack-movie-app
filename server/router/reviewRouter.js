const Router = require("express").Router;
const reviewController = require("../controllers/review-controller");

const reviewRouter = new Router();
reviewRouter.post("/", reviewController.addReview);
reviewRouter.put("/:id", reviewController.editReview);
reviewRouter.delete("/:id", reviewController.deleteReview);

module.exports = reviewRouter;
