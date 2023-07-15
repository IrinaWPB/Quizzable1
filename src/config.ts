
export let DB_URI: string ;
if (process.env.NODE_ENV === "test") {
   DB_URI = "postgresql:///capUsersdb_test"
} else {
   DB_URI = process.env.DATABASE_URL || "postgresql:///capUsersdb"
}
export const BCRYPT_ROUNDS = 12
export const SECRET_KEY = process.env.SECRET_KEY || "secret"
export const sizes = {
   sm: '640px',
   md: '768px',
   lg: '1024px',
   xl: '1280px',
}

console.log('running')