"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const config_1 = require("./config");
exports.db = (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) ? new pg_1.Client({
    connectionString: config_1.DB_URI,
    ssl: {
        rejectUnauthorized: false
    }
}) : new pg_1.Client({
    connectionString: config_1.DB_URI
});
console.log(config_1.DB_URI);
console.log(process.env.NODE_ENV);
exports.db.connect();
