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
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const token_1 = require("../helpers/token");
const ExpressError_1 = require("../ExpressError");
exports.userRouter = (0, express_1.Router)();
/**Get all users */
exports.userRouter.get('/', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.getAll();
        return res.json(users);
    }
    catch (e) {
        return next(e);
    }
}));
exports.userRouter.get('/user/:username', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.getByUsename(req.params.username);
        return res.json(user);
    }
    catch (e) {
        return next(e);
    }
}));
/**Get user by id */
exports.userRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.getById(+req.params.id);
        return res.json(user);
    }
    catch (e) {
        return next(e);
    }
}));
/**Create a new user and return it */
exports.userRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new ExpressError_1.ExpressError("Missing data", 400);
        }
        const user = yield user_1.User.create(username, email, password);
        const token = (0, token_1.createToken)(user);
        return res.status(201).json({ user, token });
    }
    catch (e) {
        return next(e);
    }
}));
/**Delete user to be used for future features */
// userRouter.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
//   try {
// 	const id = +req.params.id
// 	const user = await User.getById(id) as User
// 	await user.remove()
// 	return res.json({messege: 'USER IS DELETED'})
//   } catch (e) {
// 	return next (e)
// 	}
// })
