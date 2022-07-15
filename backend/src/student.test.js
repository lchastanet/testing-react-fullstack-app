const server = require("../index.js")
const supertest = require("supertest")
const request = supertest(server)

afterEach(() => {
  server.close()
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
