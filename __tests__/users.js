const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")


// // to reset seeds before every test so there is a fresh start
beforeEach(async () => {
	await db.seed.run()
})
  
// This is a jest hook that will run after all the test are done, and will close the db connection before the test runner ends, so it can prevent any warning.
afterAll(async () => {
	await db.destroy()
})

describe("users integration tests for register", () => {
	it("posts register done with status code", async () => {
        const res = await supertest(server).post("/api/auth/register")
        .send({username: "martin", password: "abc123"})
        expect(res.statusCode).toBe(201)
    })
	it("posts register done with type done", async () => {
        const res = await supertest(server).post("/api/auth/register")
        .send({username: "lukas", password: "abc123"})
        expect(res.type).toBe("application/json")
    })
})

describe("users integration tests for login", () => {
	it("posts login done with type bc user is not authorized", async () => {
        const res = await supertest(server).post("/api/auth/login")
        .send({username: "jorge", password: "12345"})
        expect(res.statusCode).toBe(401)
    })
    it("posts login dont have username, and password data", async () => {
        const res = await supertest(server).post("/api/auth/login")
        expect(res.statusCode).toBe(500)
    })
    
})


describe("users integration tests for get jokes", () => {
	it("get jokes not authorized with 401", async () => {
        const res = await supertest(server).get("/api/jokes")
        expect(res.statusCode).toBe(401)
    })
    it('get jokes should return json', async() => {
        const res = await supertest(server).get('/api/jokes');
        expect(res.type).toBe('application/json')
    });
})




