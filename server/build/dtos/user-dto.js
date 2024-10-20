"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    constructor(model) {
        this.username = model.username;
        this.email = model.email;
        this.id = model._id;
        this.role = model.role;
    }
}
exports.default = UserDto;
