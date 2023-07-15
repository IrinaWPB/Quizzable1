
export type UserData = {
	id: number;
	username: string;
	email: string;
	password: string;
	quizes_id: number[] | null
}

export type DecodedUser = {
	username: string;
	iat: number;
	id: number;
}



