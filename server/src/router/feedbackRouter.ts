import express from "express";
import feedbackController from "../controllers/feedback-controller";

const feedbackRouter = express.Router();
feedbackRouter.post("/", feedbackController.sendMessage);
feedbackRouter.get("/", feedbackController.getAllMessages);

export default feedbackRouter;
