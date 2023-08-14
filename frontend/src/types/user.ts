
export type UserData = {
	id: number;
	username: string;
	email: string;
	password: string;
	quizzes_id: number[] | null
}

export type DecodedUser = {
	username: string;
	iat: number;
	id: number;
}



