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
exports.Quiz = void 0;
const db_1 = require("../db");
const ExpressError_1 = require("../ExpressError");
class Quiz {
    constructor(id, category, score, user_id) {
        this.id = id;
        this.category = category;
        this.score = score;
        this.user_id = user_id;
    }
    //___________Gets all taken quizzes, to be used for future development
    static getAllQuizzes() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM quizzes`);
            const quizzes = results.rows;
            return quizzes;
        });
    }
    //___________Gets quiz by id, to be used in future development
    static getQuizById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM quizzes
	   WHERE id = $1`, [id]);
            const quiz = results.rows[0];
            if (!quiz)
                throw new ExpressError_1.NotFoundError();
            return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id);
        });
    }
    //___________Gets quizzes by category, for future features
    static getByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM quizzes WHERE category = $1`, [category]);
            const quizzes = results.rows;
            if (!quizzes)
                throw new ExpressError_1.NotFoundError();
            return quizzes;
        });
    }
    //__________Adds new quiz results
    static addTakenQuiz(category, score, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`INSERT INTO quizzes (category, score, user_id) 
	   VALUES ($1, $2, $3)
	   RETURNING id, category, score, user_id`, [category, score, user_id]);
            const quiz = results.rows[0];
            return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id);
        });
    }
    //__________Gets quizzes by user_id 
    static getQuizzesByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM quizzes 
	   WHERE user_id = $1`, [user_id]);
            const quizzes = results.rows;
            return quizzes;
        });
    }
    //__________Update quiz score 
    static updateScore(id, score) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`UPDATE quizzes 
	   SET score = $1 
	   WHERE id = $2
	   RETURNING id, category, score, user_id`, [score, id]);
            const quiz = results.rows[0];
            return quiz;
        });
    }
}
exports.Quiz = Quiz;
