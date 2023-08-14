// Defining ExpressError class 
export class ExpressError extends Error {
  public status: number
  public message: string
  constructor(msg: string, status: number) {
	super()
	this.message = msg
	this.status = status
	console.error(this.stack)
  }
}
// Defining "NotFoundError" class  
export class NotFoundError extends ExpressError {
  constructor(message = "Page Not Found") {
    super(message, 404);
  }
}

export type ExpressErrorType = {
   message: string,
   status: number
}
