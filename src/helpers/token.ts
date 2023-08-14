import jwt from 'jsonwebtoken'
import { UserData } from '../types/UserType';
import { SECRET_KEY }from '../config'

// Takes username, creates and returns signed JWT. 
export function createToken(user: UserData) {
  let payload = {
    username: user.username
  };
  return jwt.sign(payload, SECRET_KEY);
}
