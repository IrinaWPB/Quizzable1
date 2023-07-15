import { NextFunction, Router, Request, Response } from 'express'
import { ExpressError } from '../ExpressError'
import { createToken } from '../helpers/token'
import { UserData } from '../types/UserType'
import { User } from '../models/user'

export const authRouter = Router()

/**Register user */
authRouter.post('/register', async ( req: Request, res: Response, next: NextFunction) => {
  try {
	const { username, email, password } = req.body as UserData
	if (!username || !email || !password) {
	  throw new ExpressError('All fields required', 400)
	}
	const user: UserData = await User.create(username, email, password)
	const token = createToken(user);
	return res.json({ token })
  } catch (e: any) {
	if (e.code === '23505') {
	  return next(new ExpressError('This username is taken', 400))
	}
	  return next (e)
	}
}) 

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password } = req.body as UserData
		
		//make sure both fields are filled
		if (!username || !password) throw new ExpressError('Username and Password are requred', 400)
		const user: UserData = await User.authenticate(username, password)
		const token = createToken(user)
		return res.json({token})
	} catch (e) {
		return next(e)
	}
})