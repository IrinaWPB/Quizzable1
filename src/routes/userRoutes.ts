import { Request, Response, NextFunction, Router  } from 'express'
import { User } from '../models/user'
import { UserData } from '../types/UserType'
import { ensureLoggedIn } from '../middleware/auth'
import { createToken } from '../helpers/token'
import { ExpressError } from '../ExpressError'

export const userRouter = Router()

/**Get all users */
userRouter.get('/', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
	const users = await User.getAll()
	return res.json(users)
  } catch (e) {
	return next(e)
  }
})

userRouter.get('/user/:username', async (req: Request, res: Response, next: NextFunction) => {
  try{
	const user = await User.getByUsename(req.params.username)
	return res.json(user)
  } catch (e) {
	return next(e)
	}
  })

/**Get user by id */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try{
	const user = await User.getById(+req.params.id)
	return res.json(user)
  } catch (e) {
	return next(e)
  }
})

/**Create a new user and return it */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try{
	const { username, email, password } = req.body as UserData
	if (!username || !email || !password) {
	  throw new ExpressError("Missing data", 400)
	}
	const user = await User.create(username, email, password)
	const token = createToken(user);
	return res.status(201).json({ user, token })
	} catch (e) {
	  return next(e)
	}
})

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
