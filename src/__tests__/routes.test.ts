import request from 'supertest'
import app from '../index'
import { expect, test, describe, beforeAll, afterAll } from '@jest/globals'
import { db } from '../db'
import { User } from '../models/User';
import { Quiz } from '../models/Quiz';

async function EmptyDB() {
  await db.query("DELETE FROM quizzes");
  await db.query("DELETE FROM users");
  await db.end()
}

async function AddTestData() {
  await User.create("test_user1", "test@gmail.com", "test_password1")
  await User.create("test_user2", "test2@gmail.com", "test_password2")
  let user = await User.getByUsename("test_user1")
  let userId = user.id
  await Quiz.addTakenQuiz("Nature", 5, userId)
  await Quiz.addTakenQuiz("Books", 8, userId)
}

beforeAll(AddTestData)
afterAll(EmptyDB)

describe("Testing user routes", () => {
  test("Fail show all users for unauthorized", async() => {
    const res = await request(app)
      .get('/users')
    expect(res.body.error.message).toEqual("Unauthorized")
    expect(res.body.error.status).toEqual(401)
  })
  test("Adding user to db with valid data", async() => {
    const res = await request(app)
      .post("/register")
      .send({ username: "test_user",
              email: "test_user@gmail.com", 
              password: "password" })
    expect(res.body.token).toEqual(expect.any(String))
    expect(res.status).toEqual(200)
  })
  test("Bad request if missing data", async() => {
    const res = await request(app)
      .post("/register")
      .send({ username: "new_user" })
    expect(res.status).toEqual(400);
    expect(res.body.error.message).toEqual('All fields required')
  });
  test("Bad request with duplicate username", async() => {
    const res = await request(app)
      .post("/register")
      .send({ username: "test_user",
              email: "test_user@gmail.com", 
              password: "password" })
    expect(res.status).toEqual(400);
    expect(res.body.error.message).toEqual('This username is taken')
  });
  
  test("Authorized with valid credentials", async() => {
    const res = await request(app)
      .post('/login')
      .send({username: "test_user1",
              password: "test_password1"})
    expect(res.body.token).toEqual(expect.any(String))
    expect(res.status).toEqual(200)
  })
  test("Fail to authorize with invalid credentials", async() => {
    const res = await request(app)
      .post('/login')
      .send({username: "test_user1",
             password: "wrongpassword1"})
    expect(res.body.error.message).toEqual("Invalid credentials")
    expect(res.status).toEqual(403)
  })
  test("Get user by username", async() => {
    const res = await request(app)
      .get("/users/user/test_user1")
    expect(res.body).toEqual(
        {"id": expect.any(Number),
         "username": "test_user1",
         "email": "test@gmail.com",  
         "password": expect.any(String)})
    expect(res.status).toEqual(200)
  })
  test("Fail to find user", async() => {
    const res = await request(app)
      .get("/users/user/dontexist")
    expect(res.body.error.message).toEqual('Page Not Found')
    expect(res.status).toEqual(404)
  })
})

describe("Quiz routes", () => {
  test("Get all quizzes", async() => {
    const res = await request(app)
      .get("/quizzes")
    expect(res.body).toEqual([
      {"category": "Nature", "id": expect.any(Number), "score": 5, "user_id": expect.any(Number)}, 
      {"category": "Books", "id": expect.any(Number), "score": 8, "user_id": expect.any(Number)}])
    })
  test("Add quiz results", async() => {
    //make sure to use existing user id
    let user = await User.getByUsename('test_user1')
    const res = await request(app)
      .post("/quizzes")
      .send({ category: "Music", score: 5, user_id: user.id})
    expect(res.text).toContain("Music")
    expect(res.status).toEqual(201)
  })
  test("Show all quizzes by user id", async() => {
    let user = await User.getByUsename('test_user1')
    const res = await request(app)
      .get(`/quizzes/user/${user.id}`)
    expect(res.body).toEqual([
        {"category": "Nature", "id": expect.any(Number), "score": 5, "user_id": expect.any(Number)}, 
        {"category": "Books", "id": expect.any(Number), "score": 8, "user_id": expect.any(Number)},
        {"category": "Music", "id": expect.any(Number), "score": 5, "user_id": expect.any(Number)}])
    expect(res.status).toEqual(200)
  })
  test("User did not take any quizzes", async() => {
    let user = await User.getByUsename('test_user2')
    const res = await request(app)
      .get(`/quizzes/user/${user.id}`)
    expect(res.body).toEqual([])
  })
  test("Update score for the quiz", async() => {
    //make sure to use existing user id
    let user = await User.getByUsename('test_user1')
    const quizzes = await request(app)
      .get(`/quizzes/user/${user.id}`)
    //take i.e the first quiz in the list
    expect(quizzes.body[0]).toEqual({"category": "Nature", "id": expect.any(Number), "score": 5, "user_id": expect.any(Number)})
    let quizId = quizzes.body[0].id

    //update it's score
    const res = await request(app)
      .patch(`/quizzes/${quizId}`)
      .send({ score: 10 })
    expect(res.body).toEqual({"category": "Nature", "id": expect.any(Number), "score": 10, "user_id": expect.any(Number)})
    expect(res.status).toEqual(200)
  })
})

