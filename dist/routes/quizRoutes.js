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
const auth_1 = require("../middleware/auth");
exports.quizRouter = (0, express_1.Router)();
// Get all quizzes
exports.quizRouter.get('/', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield Quiz_1.Quiz.getAllQuizzes();
        return res.json(quizzes);
    }
    catch (e) {
        return next(e);
    }
}));
// Get quiz by id 
exports.quizRouter.get('/quiz/:id', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield Quiz_1.Quiz.getQuizById(+req.params.id);
        return res.json(quiz);
    }
    catch (e) {
        return next(e);
    }
}));
// Get quiz by category for future features
exports.quizRouter.get('/cat/:category', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield Quiz_1.Quiz.getByCategory(req.params.category);
        return res.json(quiz);
    }
    catch (e) {
        return next(e);
    }
}));
// Adds a new taken quiz to db 
exports.quizRouter.post('/', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, score, user_id } = req.body;
        const quiz = yield Quiz_1.Quiz.addTakenQuiz(category, score, user_id);
        return res.status(201).json({ quiz });
    }
    catch (e) {
        return next(e);
    }
}));
// Route to get all complete quizzes by user 
exports.quizRouter.get('/user/:id', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield Quiz_1.Quiz.getQuizzesByUserId(+req.params.id);
        return res.json(quizzes);
    }
    catch (e) {
        return next(e);
    }
}));
// Route to update score 
exports.quizRouter.patch('/:id', auth_1.ensureLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { score } = req.body;
    try {
        const quiz = yield Quiz_1.Quiz.updateScore(+req.params.id, score);
        return res.json(quiz);
    }
    catch (e) {
        return next(e);
    }
}));
