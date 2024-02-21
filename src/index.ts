import HTTP from "http";
import express, { NextFunction, Request, Response } from 'express'
import { ExpressErrorType } from './ExpressError'
import { userRouter } from './routes/userRoutes'
import { authRouter } from './routes/authRoutes'
import { quizRouter } from './routes/quizRoutes'
import { authenticateJWT } from './middleware/auth'
import cors from 'cors'


// socketio import 
import SocketIOServer from "./server_socketio";

//initializing the Express App
const app: express.Application = express()

//enable server to check request origins
app.use(cors());

const server = HTTP.createServer(app);
// SocketIO server initialization 
new SocketIOServer(server).init();

app.use(express.json()) //if json sent
app.use(express.urlencoded({ extended: true })) //if form data sent

app.use(authenticateJWT)//middleware to check if a token sent with request is valid
app.use('/', express.static('./frontend/build'))
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/quizzes', quizRouter)

/** Generic error handler; anything unhandled goes here. */
app.use((error: ExpressErrorType, req: Request, res: Response, next: NextFunction) => {
	let status = error.status
	let message = error.message
	res.status(status).json({
		error: {message, status}
	})	
})

export default server