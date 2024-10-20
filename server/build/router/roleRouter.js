"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_controller_1 = __importDefault(require("../controllers/role-controller"));
const roleRouter = express_1.default.Router();
roleRouter.post("/", role_controller_1.default.addRole);
roleRouter.get("/", role_controller_1.default.getAllRoles);
exports.default = roleRouter;
