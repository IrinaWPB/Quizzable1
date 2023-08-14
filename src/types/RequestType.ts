import jwt from "jsonwebtoken"
export {}

declare global {
  namespace Express {
    
    //add "user" property to "Request" type with type of string or Payload object
    export interface Request {
      user?: string | jwt.JwtPayload 
    }
  }
}