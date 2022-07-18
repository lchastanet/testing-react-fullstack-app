const server = require("../../index.js")
const db = require("../models/db")
const supertest = require("supertest")
const request = supertest(server)

afterAll(() => {
  server.close()
  db.end()
})

describe("Get error page", () => {
  it("GET /* should return 404", async () => {
    const res = await supertest(server).get("/toto")
    expect(res.status).toEqual(404)
  })
})

describe("Students Endpoints", () => {
  it("GET /students should show all students", async () => {
    const res = await request.get("/students")
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining("json"))
    expect(typeof res.body).toBe(typeof [])
  })

  it("GET /students/:id should show one student", async () => {
    const res = await request.get("/students/2")
    expect(res.status).toEqual(200)
    expect(res.type).toEqual(expect.stringContaining("json"))
    expect(typeof res.body).toBe(typeof {})
    expect(res.body).toHaveProperty("firstname")
    expect(res.body).toHaveProperty("lastname")
    expect(res.body).toHaveProperty("age")
    expect(res.body).toHaveProperty("remote")
  })
})
