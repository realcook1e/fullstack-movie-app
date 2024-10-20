"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoleSchema = new mongoose_1.Schema({
    value: { type: String, unique: true, default: "user" },
});
exports.default = (0, mongoose_1.model)("Role", RoleSchema);
