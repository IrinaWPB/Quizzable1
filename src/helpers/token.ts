import jwt from 'jsonwebtoken'
import { UserData } from '../types/UserType';
import { SECRET_KEY }from '../config'

/** return signed JWT from user data. */
export function createToken(user: UserData) {
  let payload = {
    username: user.username
  };
  return jwt.sign(payload, SECRET_KEY);
}
