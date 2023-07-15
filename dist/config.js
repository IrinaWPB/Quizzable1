"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sizes = exports.SECRET_KEY = exports.BCRYPT_ROUNDS = exports.DB_URI = void 0;
if (process.env.NODE_ENV === "test") {
    exports.DB_URI = "postgresql:///capUsersdb_test";
}
else {
    exports.DB_URI = process.env.DATABASE_URL || "postgresql:///capUsersdb";
}
exports.BCRYPT_ROUNDS = 12;
exports.SECRET_KEY = process.env.SECRET_KEY || "secret";
exports.sizes = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
};
