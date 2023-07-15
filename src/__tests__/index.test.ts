import request from 'supertest'
import app from '../index'
import { expect, test, describe } from '@jest/globals';

describe("Test index.ts", () => {
  test("Not found route", async () => {
    const res = await request(app).get("/nonexistingRoute")
    expect(res.text).toEqual("{\"error\":{\"message\":\"Page Not Found\",\"status\":404}}")
    expect(res.text).toContain("Page Not Found")
    expect(res.status).toEqual(404)
  })
})