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
    /**Get all taken quizes method*/
    static getAllQuizes() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM quizes`);
            const quizes = results.rows;
            return quizes;
        });
    }
    /**Get quiz by id */
    static getQuizById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM quizes
	   WHERE id = $1`, [id]);
            const quiz = results.rows[0];
            if (!quiz)
                throw new ExpressError_1.NotFoundError();
            return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id);
        });
    }
    /**Get by category */
    //  for future features
    //   static async getByCategory(category: string): Promise<QuizType[]> {
    //     const results = await db.query(
    // 	  `SELECT * FROM quizes WHERE category = $1`, [category]
    //     );
    //     const quizes = results.rows as QuizType[]
    //     if (!quizes) throw new NotFoundError();
    // 	  return quizes
    //   }
    /**Create a new quiz */
    static addTakenQuiz(category, score, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`INSERT INTO quizes (category, score, user_id) 
	   VALUES ($1, $2, $3)
	   RETURNING id, category, score, user_id`, [category, score, user_id]);
            const quiz = results.rows[0];
            return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id);
        });
    }
    /**Get quizes by user_id */
    static getQuizesByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM quizes 
	   WHERE user_id = $1`, [user_id]);
            const quizes = results.rows;
            return quizes;
        });
    }
    /**Update quizes score */
    static updateScore(id, score) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`UPDATE quizes 
	   SET score = $1 
	   WHERE id = $2
	   RETURNING id, category, score, user_id`, [score, id]);
            const quiz = results.rows[0];
            return quiz;
        });
    }
}
exports.Quiz = Quiz;
