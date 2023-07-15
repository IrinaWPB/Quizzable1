"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLoggedIn = exports.authenticateJWT = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ExpressError_1 = require("../ExpressError");
/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */
function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jsonwebtoken_1.default.verify(token, config_1.SECRET_KEY);
        }
        return next();
    }
    catch (err) {
        return next();
    }
}
exports.authenticateJWT = authenticateJWT;
/** If user in res.locals let access resticted route
 */
function ensureLoggedIn(req, res, next) {
    if (!res.locals.user) {
        const err = new ExpressError_1.ExpressError('Unauthorized', 401);
        return next(err);
    }
    else {
        return next();
    }
}
exports.ensureLoggedIn = ensureLoggedIn;
