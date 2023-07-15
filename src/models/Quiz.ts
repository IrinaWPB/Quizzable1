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

	/**Get all taken quizes method*/
  static async getAllQuizes(): Promise<QuizType[]> {
	const results = await db.query(`SELECT * FROM quizes`)
	const quizes = results.rows as QuizType[]
	return quizes
  }

	/**Get quiz by id */
  static async getQuizById(id: number): Promise<QuizType> {
	const results = await db.query(
	  `SELECT * FROM quizes
	   WHERE id = $1`, [id])
	const quiz = results.rows[0] as QuizType
	if (!quiz) throw new NotFoundError()
	return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id)
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
  static async addTakenQuiz(category: string, score: number, user_id: number): Promise<QuizType> {
	const results = await db.query(
	  `INSERT INTO quizes (category, score, user_id) 
	   VALUES ($1, $2, $3)
	   RETURNING id, category, score, user_id`, [category, score, user_id])
	const quiz = results.rows[0] as QuizType
	return new Quiz(quiz.id, quiz.category, quiz.score, quiz.user_id)
  }

	/**Get quizes by user_id */
  static async getQuizesByUserId(user_id: number): Promise<QuizType[]> {
	const results = await db.query(
	  `SELECT * FROM quizes 
	   WHERE user_id = $1`, [user_id])
	const quizes = results.rows
	return quizes
  }
	/**Update quizes score */
  static async updateScore(id: number, score: number): Promise<QuizType[]> {
	const results = await db.query(
	  `UPDATE quizes 
	   SET score = $1 
	   WHERE id = $2
	   RETURNING id, category, score, user_id`, [score, id])
	const quiz = results.rows[0]
	return quiz
  }
}