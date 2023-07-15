"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const index_1 = __importDefault(require("./index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.PORT || 3001;
index_1.default.listen(exports.port, function () {
    console.log(`Running on http://localhost:${exports.port}`);
});
