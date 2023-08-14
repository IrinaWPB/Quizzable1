import { Request, Response, NextFunction, Router  } from 'express'
import { User } from '../models/User'
import { ensureLoggedIn } from '../middleware/auth'

export const userRouter = Router()

// Get a user by username
userRouter.get('/user/:username', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try{
	const user = await User.getByUsename(req.params.username)
	return res.json(user)
  } catch (e) {
	return next(e)
	}
  })

// Gets all users (future development)
userRouter.get('/', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
	const users = await User.getAll()
	return res.json(users)
  } catch (e) {
	return next(e)
  }
})

// Get user by id (future features)
userRouter.get('/:id', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try{
	const user = await User.getById(+req.params.id)
	return res.json(user)
  } catch (e) {
	return next(e)
  }
})

// Delete user (future features) 
userRouter.delete('/:id', ensureLoggedIn, async(req: Request, res: Response, next: NextFunction) => {
  try {
	const id = +req.params.id
	const user = await User.remove(id) 
	return res.json({messege: 'USER IS DELETED'})
  } catch (e) {
	return next (e)
	}
})
