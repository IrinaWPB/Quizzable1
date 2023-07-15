"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
//for develpment; to be deleted later
function logger(req, res, next) {
    console.log(`RECEIVED ${req.method} request to ${req.path}. ${req.path} is next to visit after middleware is run`);
    return next();
}
exports.logger = logger;
