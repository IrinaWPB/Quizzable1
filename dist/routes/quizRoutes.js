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
exports.quizRouter = void 0;
const express_1 = require("express");
const Quiz_1 = require("../models/Quiz");
exports.quizRouter = (0, express_1.Router)();
/**Get all users */
exports.quizRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizes = yield Quiz_1.Quiz.getAllQuizes();
        return res.json(quizes);
    }
    catch (e) {
        return next(e);
    }
}));
/**Get user by id */
exports.quizRouter.get('/quiz/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield Quiz_1.Quiz.getQuizById(+req.params.id);
        return res.json(quiz);
    }
    catch (e) {
        return next(e);
    }
}));
/**Get user by category */
// for future features
// quizRouter.get('/cat/:category', async (req: Request, res: Response, next: NextFunction) => {
//   try{
//     const quiz = await Quiz.getByCategory(req.params.category)
// 	return res.json(quiz)
//   } catch (e) {
// 	return next(e)
//   }
// })
/**Adds taken quiz to db */
exports.quizRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, score, user_id } = req.body;
        const quiz = yield Quiz_1.Quiz.addTakenQuiz(category, score, user_id);
        return res.status(201).json({ quiz });
    }
    catch (e) {
        return next(e);
    }
}));
/** Route to get all complete quizes by user */
exports.quizRouter.get('/user/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizes = yield Quiz_1.Quiz.getQuizesByUserId(+req.params.id);
        return res.json(quizes);
    }
    catch (e) {
        return next(e);
    }
}));
/** Route to update score */
exports.quizRouter.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { score } = req.body;
    try {
        const quiz = yield Quiz_1.Quiz.updateScore(+req.params.id, score);
        return res.json(quiz);
    }
    catch (e) {
        return next(e);
    }
}));
