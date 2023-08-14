import { db } from "../db";
import { NotFoundError } from "../ExpressError";
import { QuizType } from "../types/QuizType";

export class Quiz {
  constructor(
	public id: number, 
	public category: string, 
	public score: number,
	public user_id: number
  ) {} 

//___________Gets all taken quizzes, to be used for future development
  static async getAllQuizzes(): Promise<QuizType[]> {
	const results = await db.query(`SELECT * FROM quizzes`)
	const quizzes = results.rows as QuizType[]
	return quizzes
  }

//___________Gets quiz by id, to be used in future development
  static async getQuizById(id: number): Promise<QuizType> {
	const results = await db.query(
	  `SELECT * FROM quizzes
	   WHERE id = $1`, [id])
	const quiz = results.rows[0] as QuizType
	if (!quiz) throw new NotFoundError()
	return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id)
  }

//___________Gets quizzes by category, for future features
  static async getByCategory(category: string): Promise<QuizType[]> {
    const results = await db.query(
	  `SELECT * FROM quizzes WHERE category = $1`, [category]
    );
    const quizzes = results.rows as QuizType[]
    if (!quizzes) throw new NotFoundError();
	  return quizzes
  }

//__________Adds new quiz results
  static async addTakenQuiz(category: string, score: number, user_id: number): Promise<QuizType> {
	const results = await db.query(
	  `INSERT INTO quizzes (category, score, user_id) 
	   VALUES ($1, $2, $3)
	   RETURNING id, category, score, user_id`, [category, score, user_id])
	const quiz = results.rows[0] as QuizType
	return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id)
  }

//__________Gets quizzes by user_id 
  static async getQuizzesByUserId(user_id: number): Promise<QuizType[]> {
	const results = await db.query(
	  `SELECT * FROM quizzes 
	   WHERE user_id = $1`, [user_id])
	const quizzes = results.rows
	return quizzes
  }
//__________Update quiz score 
  static async updateScore(id: number, score: number): Promise<QuizType[]> {
	const results = await db.query(
	  `UPDATE quizzes 
	   SET score = $1 
	   WHERE id = $2
	   RETURNING id, category, score, user_id`, [score, id])
	const quiz = results.rows[0]
	return quiz
  }
}