"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./routes/userRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const auth_1 = require("./middleware/auth");
const cors_1 = __importDefault(require("cors"));
const quizRoutes_1 = require("./routes/quizRoutes");
// socketio stuff //
const server_socketio_1 = __importDefault(require("./server_socketio"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
// SocketIO server initialization //
new server_socketio_1.default(server).init();
app.use(express_1.default.json()); //if json sent
app.use(express_1.default.urlencoded({ extended: true })); //if form data sent
app.use(auth_1.authenticateJWT);
app.use('/users', userRoutes_1.userRouter);
app.use('/auth', authRoutes_1.authRouter);
app.use('/quizes', quizRoutes_1.quizRouter);
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/build")));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'frontend/build', 'index.html'));
});
/** Generic error handler; anything unhandled goes here. */
app.use((error, req, res, next) => {
    let status = error.status;
    let message = error.message;
    res.status(status).json({
        error: { message, status }
    });
});
exports.default = server;
