import { db } from "../db";
import { ExpressError, NotFoundError } from "../ExpressError";
import * as bcrypt from 'bcrypt'
import { UserData } from "../types/UserType";

export class User {
  constructor(
	public id: number, 
	public username: string, 
	public email: string, 
	public password: string
  ) {} 

/**Get all users method
 * **** to be used for future features *******
*/
  static async getAll(): Promise<UserData[]> {
	const results = await db.query(`SELECT * FROM users`)
	const users = results.rows as UserData[]
	return users
  }

/**Get user by id */
  static async getById(id: number): Promise<UserData> {
    const results = await db.query(
	  `SELECT * FROM users
	   WHERE id = $1`, [id])
	const u = results.rows[0] as UserData
	if (!u) throw new NotFoundError()
	return new User(u.id, u.username, u.email, u.password)
   }

/**Get by username */
  static async getByUsename(username: string): Promise<UserData> {
    const results = await db.query(
	  `SELECT * FROM users
	   WHERE username = $1`, [username])
	const u = results.rows[0] as UserData
	if (!u) throw new NotFoundError()
	return new User(u.id, u.username, u.email, u.password)
   }
   
/**Create a new user */
  static async create(username: string, email: string, password: string): Promise<UserData> {
	const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_ROUNDS || 10)
	const results = await db.query(
		`INSERT INTO users (username, email, password) 
		VALUES ($1, $2, $3)
	    RETURNING username, email`, [username, email, hashedPassword])
	const u = results.rows[0] as User
	return new User(u.id, u.username, u.email, u.password)
	}

/**Log user in */
  static async authenticate(username: string, password: string): Promise<UserData> {
	const results = await db.query(
		`SELECT * FROM users
		WHERE username = $1`, [username])
	const user = results.rows[0] as UserData
	if (user) {
	  if (await bcrypt.compare(password, user.password)) {
		return user
	  }
	} 
	throw new ExpressError('Invalid credentials', 403)
  }

/**Delete user 
 ******* to be used for future features ********
*/
//   async remove(): Promise<void> {
// 	   await db.query(`DELETE FROM users WHERE id = $1`, [this.id])
//   }
}