"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
/** return signed JWT from user data. */
function createToken(user) {
    let payload = {
        username: user.username
    };
    return jsonwebtoken_1.default.sign(payload, config_1.SECRET_KEY);
}
exports.createToken = createToken;
