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
exports.userRouter = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
exports.userRouter = (0, express_1.Router)();
// Get a user by username
exports.userRouter.get('/user/:username', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.getByUsename(req.params.username);
        return res.json(user);
    }
    catch (e) {
        return next(e);
    }
}));
// Gets all users (future development)
exports.userRouter.get('/', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.getAll();
        return res.json(users);
    }
    catch (e) {
        return next(e);
    }
}));
// Get user by id (future features)
exports.userRouter.get('/:id', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.getById(+req.params.id);
        return res.json(user);
    }
    catch (e) {
        return next(e);
    }
}));
// Delete user (future features) 
exports.userRouter.delete('/:id', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const user = yield User_1.User.remove(id);
        return res.json({ messege: 'USER IS DELETED' });
    }
    catch (e) {
        return next(e);
    }
}));
