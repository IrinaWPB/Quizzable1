export const port: undefined | number | string = process.env.PORT || 3001;
export let DB_URI: string;
if (process.env.NODE_ENV === "test") {
   DB_URI = "postgresql:///capUsersdb_test"
} else {
   DB_URI = process.env.DATABASE_URL || "postgresql:///capUsersdb"
}

export const BCRYPT_ROUNDS = 12
export const SECRET_KEY = process.env.SECRET_KEY || "secret"

