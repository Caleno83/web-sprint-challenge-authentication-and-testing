const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")


// // to reset info added here
// beforeAll(async () => {
//     await db("users").truncate()
//   })
  
// This is a jest hook that will run after all the test are done, and will close the db connection before the test runner ends, so it can prevent any warning.
afterAll(async () => {
	await db.destroy()
})

describe("users integration tests", () => {
	it("posts register", async () => {
        const res = await supertest(server).post("/api/auth/register")
        .send({username: "peter", password: "abc123"})
        expect(res.statusCode).toBe(409)
        expect(res.type).toBe("application/json")
    })
    it("posts login", async () => {
        const res = await supertest(server).post("/api/auth/login")
        .send({username: "jorge", password: "12345"})
        expect(res.statusCode).toBe(401)
        expect(res.type).toBe("application/json")
    })
    

})

describe("jokes integration tests", () => {
	it("get all jokes", async () => {
        const res = await supertest(server).post("/api/jokes")
        expect(res.statusCode).toBe(404)
        expect(res.type).toBe("text/html")
	})
})
