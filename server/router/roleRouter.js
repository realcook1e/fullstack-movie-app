const Router = require("express").Router;
const roleController = require("../controllers/role-controller");

const roleRouter = new Router();
roleRouter.post("/", roleController.addRole);
roleRouter.get("/", roleController.getAllRoles);

module.exports = roleRouter;
