import express from "express";
import { body } from "express-validator";
import authController from "../controllers/auth-controller";

const authRouter = express.Router();
authRouter.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 4, max: 32 }),
	body("username").trim().isLength({ min: 2, max: 32 }),
	authController.register
);
authRouter.post("/login", authController.login);

export default authRouter;
