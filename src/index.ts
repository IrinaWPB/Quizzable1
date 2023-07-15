import HTTP from "http";
import express, { NextFunction, Request, Response } from 'express'
import { ExpressError, ExpressErrorType } from './ExpressError'
import { userRouter } from './routes/userRoutes'
import { authRouter } from './routes/authRoutes'
import { authenticateJWT } from './middleware/auth'
import cors from 'cors'
import { quizRouter } from './routes/quizRoutes'
// socketio stuff //
import SocketIOServer from "./server_socketio";
import path from 'path'


const app: express.Application = express()
app.use(cors());

const server = HTTP.createServer(app);
// SocketIO server initialization //
new SocketIOServer(server).init();

app.use(express.json()) //if json sent
app.use(express.urlencoded({ extended: true })) //if form data sent

app.use(authenticateJWT)
app.use(express.static(path.join(__dirname, "../public")))

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/quizes', quizRouter)

/** Handle 404 errors -- this matches everything */
app.use('*', (req: Request, res: Response, next: NextFunction) => {
   next(new ExpressError("Page Not Found", 404));
});

/** Generic error handler; anything unhandled goes here. */
app.use((error: ExpressErrorType, req: Request, res: Response, next: NextFunction) => {
	let status = error.status
	let message = error.message
	res.status(status).json({
		error: {message, status}
	})	
})

export default server