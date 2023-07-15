import { NextFunction, Router, Request, Response } from 'express'
import { Quiz } from '../models/Quiz'
import { QuizType } from '../types/QuizType'

export const quizRouter = Router()

/**Get all users */
quizRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
	  const quizes = await Quiz.getAllQuizes()
	  return res.json(quizes)
	} catch (e) {
	  return next(e)
	}
})

/**Get user by id */
quizRouter.get('/quiz/:id', async (req: Request, res: Response, next: NextFunction) => {
  try{
	const quiz = await Quiz.getQuizById(+req.params.id)
    return res.json(quiz)
  } catch (e) {
	return next(e)
  }
})

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
quizRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
	const { category, score, user_id  } = req.body as QuizType
	const quiz = await Quiz.addTakenQuiz(category, score, user_id)
	return res.status(201).json({ quiz })
  } catch (e) {
	return next (e)
  }
})

/** Route to get all complete quizes by user */
quizRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const quizes = await Quiz.getQuizesByUserId(+req.params.id)
	  return res.json(quizes)
  } catch (e) {
    return next(e)
  }
})

/** Route to update score */
quizRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { score } = req.body
  try{
    const quiz = await Quiz.updateScore(+req.params.id, score)
	  return res.json(quiz)
  } catch (e) {
    return next(e)
  }
})