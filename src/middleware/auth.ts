import { NextFunction, Request, Response } from "express";
import { SECRET_KEY } from '../config'
import jwt from 'jsonwebtoken'
import { ExpressError } from "../ExpressError";

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** If user in res.locals let access resticted route
 */
export function ensureLoggedIn(req: Request, res: Response, next: NextFunction) {
  if(!res.locals.user) {
    const err = new ExpressError('Unauthorized', 401)
    return next (err)
  } else {
    return next()
  }
}
