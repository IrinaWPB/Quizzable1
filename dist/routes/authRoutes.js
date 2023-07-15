"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const ExpressError_1 = require("../ExpressError");
const token_1 = require("../helpers/token");
const user_1 = require("../models/user");
exports.authRouter = (0, express_1.Router)();
/**Register user */
exports.authRouter.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new ExpressError_1.ExpressError('All fields required', 400);
        }
        const user = yield user_1.User.create(username, email, password);
        const token = (0, token_1.createToken)(user);
        return res.json({ token });
    }
    catch (e) {
        if (e.code === '23505') {
            return next(new ExpressError_1.ExpressError('This username is taken', 400));
        }
        return next(e);
    }
}));
exports.authRouter.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        //make sure both fields are filled
        if (!username || !password)
            throw new ExpressError_1.ExpressError('Username and Password are requred', 400);
        const user = yield user_1.User.authenticate(username, password);
        const token = (0, token_1.createToken)(user);
        return res.json({ token });
    }
    catch (e) {
        return next(e);
    }
}));
