import request from "supertest"

import { app } from "../../app"

it('get error while using wrong credentials', () => {
    request(app).post("/api/users/signin").send({email : "test@test.com", password : "12345"}).expect(400)
})

it('get error with invalid credentials', () => {
     request(app)
       .post("/api/users/signup")
       .send({ email: "test@test.com", password: "12345" })
       .expect(201)
     request(app)
       .post("/api/users/signin")
       .send({ email: "test", password: "125" })
       .expect(200)
})

it('login to account', () => {
        request(app).post("/api/users/signup").send({email : "test@test.com", password : "12345"}).expect(201)
        request(app)
            .post("/api/users/signin")
                  .send({ email: "test@test.com", password: "12345" })
                  .expect(200)


})

it("get cookie back", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({ email: "test@test.com", password: "passowrd" })
      .expect(201)

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "passowrd" })
    .expect(200)

  expect(response.get("Set-Cookie")).toBeDefined()
})