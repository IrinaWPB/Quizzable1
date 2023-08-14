import { NextFunction, Router, Request, Response } from 'express'
import { Quiz } from '../models/Quiz'
import { QuizType } from '../types/QuizType'
import { ensureLoggedIn } from '../middleware/auth'

export const quizRouter = Router()

// Get all quizzes
quizRouter.get('/', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
	try {
	  const quizzes = await Quiz.getAllQuizzes()
	  return res.json(quizzes)
	} catch (e) {
	  return next(e)
	}
})

// Get quiz by id 
quizRouter.get('/quiz/:id', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try{
	const quiz = await Quiz.getQuizById(+req.params.id)
    return res.json(quiz)
  } catch (e) {
	return next(e)
  }
})

// Get quiz by category for future features
quizRouter.get('/cat/:category', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const quiz = await Quiz.getByCategory(req.params.category)
	return res.json(quiz)
  } catch (e) {
	return next(e)
  }
})

// Adds a new taken quiz to db 
quizRouter.post('/', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try{
	const { category, score, user_id  } = req.body as QuizType
	const quiz = await Quiz.addTakenQuiz(category, score, user_id)
	return res.status(201).json({ quiz })
  } catch (e) {
	return next (e)
  }
})

// Route to get all complete quizzes by user 
quizRouter.get('/user/:id', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try{
    const quizzes = await Quiz.getQuizzesByUserId(+req.params.id)
	  return res.json(quizzes)
  } catch (e) {
    return next(e)
  }
})

// Route to update score 
quizRouter.patch('/:id', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  const { score } = req.body
  try{
    const quiz = await Quiz.updateScore(+req.params.id, score)
	  return res.json(quiz)
  } catch (e) {
    return next(e)
  }
})