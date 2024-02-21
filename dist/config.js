"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_KEY = exports.BCRYPT_ROUNDS = exports.DB_URI = exports.port = void 0;
if (process.env.NODE_ENV === "production") {
    exports.port = process.env.PORT || 10000;
}
else {
    exports.port = 3001;
}
if (process.env.NODE_ENV === "test") {
    exports.DB_URI = "postgresql:///capUsersdb_test";
}
else {
    exports.DB_URI = process.env.DATABASE_URL || "postgresql:///capUsersdb";
}
exports.BCRYPT_ROUNDS = 12;
exports.SECRET_KEY = process.env.SECRET_KEY || "secret";
