"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ExpressError = void 0;
// Defining ExpressError class 
class ExpressError extends Error {
    constructor(msg, status) {
        super();
        this.message = msg;
        this.status = status;
        console.error(this.stack);
    }
}
exports.ExpressError = ExpressError;
// Defining "NotFoundError" class  
class NotFoundError extends ExpressError {
    constructor(message = "Page Not Found") {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
