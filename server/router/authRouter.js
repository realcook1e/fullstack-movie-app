const Router = require("express").Router;
const { body } = require("express-validator");
const authController = require("../controllers/auth-controller");

const authRouter = new Router();
authRouter.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 4, max: 32 }),
	body("username").trim().isLength({ min: 2, max: 32 }),
	authController.register
);
authRouter.post("/login", authController.login);

module.exports = authRouter;
