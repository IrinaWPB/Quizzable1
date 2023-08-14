DROP DATABASE IF EXISTS capUsersdb_test;

CREATE DATABASE capUsersdb_test;

\c capUsersdb_test;

DROP TABLE IF EXISTS quizzes;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,   
    username text NOT NULL UNIQUE,
    email text NOT NULL, 
    password text NOT NULL
);

CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    category text NOT NULL,
    score INT NOT NULL,
    user_id INT REFERENCES users(id)
);