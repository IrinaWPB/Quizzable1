"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = void 0;
const expressError_1 = require("../expressError");
function checkPassword(req, res, next) {
    try {
        if (req.query.password !== 'password') {
            throw new expressError_1.ExpressError("Wrong Password", 403);
        }
        else
            return next();
    }
    catch (e) {
        return next(e);
    }
}
exports.checkPassword = checkPassword;
