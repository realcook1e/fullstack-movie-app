import express from "express";
import roleController from "../controllers/role-controller";

const roleRouter = express.Router();
roleRouter.post("/", roleController.addRole);
roleRouter.get("/", roleController.getAllRoles);

export default roleRouter;
