const Router = require("express").Router;
const feedbackController = require("../controllers/feedback-controller");

const feedbackRouter = new Router();
feedbackRouter.post("/", feedbackController.sendMessage);
feedbackRouter.get("/", feedbackController.getAllMessages);

module.exports = feedbackRouter;
