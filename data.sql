DROP DATABASE IF EXISTS capUsersdb;

CREATE DATABASE capUsersdb;

\c capUsersdb;


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