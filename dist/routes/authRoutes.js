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
const User_1 = require("../models/User");
exports.authRouter = (0, express_1.Router)();
/** Register user route
 *
 * Checks if all fields are filled and there is no
 * duplicate username, takes that data to
 * create a new user and returns a JWT token which is used
 * to keep user as "current" accross the app.
 *
*/
exports.authRouter.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        //make sure all fields are filled
        if (!username || !email || !password) {
            throw new ExpressError_1.ExpressError('All fields required', 400);
        }
        const user = yield User_1.User.create(username, email, password);
        const token = (0, token_1.createToken)(user);
        return res.json({ token });
    }
    catch (e) {
        //specific SQL code for duplicate data
        if (e.code === '23505') {
            return next(new ExpressError_1.ExpressError('This username is taken', 400));
        }
        return next(e);
    }
}));
/** Login user route
 *
 * First checks if both username and password are provided,
 * then checks if the data provided is valid using authenticate method
 *
 * Returns a JWT token if passed authentication
 * to keep user as "current" accross the app.
 *
*/
exports.authRouter.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        //make sure both fields are filled
        if (!username || !password)
            throw new ExpressError_1.ExpressError('Username and Password are requred', 400);
        const user = yield User_1.User.authenticate(username, password);
        const token = (0, token_1.createToken)(user);
        return res.json({ token });
    }
    catch (e) {
        return next(e);
    }
}));
