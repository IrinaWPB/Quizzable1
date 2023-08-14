"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = require("../db");
const ExpressError_1 = require("../ExpressError");
const bcrypt = __importStar(require("bcrypt"));
class User {
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    //_______Get by username, returns new User instance
    static getByUsename(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM users
	   WHERE username = $1`, [username]);
            const u = results.rows[0];
            if (!u)
                throw new ExpressError_1.NotFoundError();
            return new User(u.id, u.username, u.email, u.password);
        });
    }
    //_______Get all users method (future features)
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM users`);
            const users = results.rows;
            return users;
        });
    }
    //_______Get user by id (future development)
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM users
	   WHERE id = $1`, [id]);
            const u = results.rows[0];
            if (!u)
                throw new ExpressError_1.NotFoundError();
            return new User(u.id, u.username, u.email, u.password);
        });
    }
    //_______Adds a new user to DB, returns that user instance
    static create(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //password gets hashed first
            const hashedPassword = yield bcrypt.hash(password, process.env.BCRYPT_ROUNDS || 10);
            const results = yield db_1.db.query(`INSERT INTO users (username, email, password) 
		VALUES ($1, $2, $3)
	    RETURNING username, email`, [username, email, hashedPassword]);
            const u = results.rows[0];
            return new User(u.id, u.username, u.email, u.password);
        });
    }
    //______Authenticates user info using bcript.compare()
    static authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield db_1.db.query(`SELECT * FROM users
		WHERE username = $1`, [username]);
            const user = results.rows[0];
            if (user) {
                if (yield bcrypt.compare(password, user.password)) {
                    return user;
                }
            }
            throw new ExpressError_1.ExpressError('Invalid credentials', 403);
        });
    }
    //_____Deletes user (future development)
    static remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.db.query(`DELETE FROM users WHERE id = $1`, [id]);
        });
    }
}
exports.User = User;
