const request=require("supertest");
const app=require("../app");

describe("API Tests",()=>{

test("GET /",async()=>{

const response=await request(app)
.get("/");

expect(response.statusCode)
.toBe(200);

expect(response.text)
.toBe("DevOps CI/CD Project Running Successfully");

});


test("GET /health",async()=>{

const response=await request(app)
.get("/health");

expect(response.statusCode)
.toBe(200);

expect(response.body.status)
.toBe("UP");

});

});