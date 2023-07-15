import HTTP from "http";
import express, { NextFunction, Request, Response } from 'express'
import { ExpressErrorType } from './ExpressError'
import { userRouter } from './routes/userRoutes'
import { authRouter } from './routes/authRoutes'
import { authenticateJWT } from './middleware/auth'
import cors from 'cors'
import { quizRouter } from './routes/quizRoutes'
import path from 'path'
// socketio import //
import SocketIOServer from "./server_socketio";

const app: express.Application = express()
app.use(cors());

const server = HTTP.createServer(app);
// SocketIO server initialization //
new SocketIOServer(server).init();

app.use(express.json()) //if json sent
app.use(express.urlencoded({ extended: true })) //if form data sent

app.use(authenticateJWT)

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/quizes', quizRouter)

app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
})
/** Generic error handler; anything unhandled goes here. */
app.use((error: ExpressErrorType, req: Request, res: Response, next: NextFunction) => {
	let status = error.status
	let message = error.message
	res.status(status).json({
		error: {message, status}
	})	
})

export default server