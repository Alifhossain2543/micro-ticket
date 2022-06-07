import request from 'supertest'

import { app } from '../../app'

it('get 201 from signup', async ()=> {
    return request(app).post("/api/users/signup").send({email : "test@test.com", password : "passowrd"}).expect(201)
})

it("get 400 from validationError", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "testst.com"})
    .expect(400)
})


it("disallow duplicate user create request", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "passowrd" })
    .expect(201)

     await request(app)
       .post("/api/users/signup")
       .send({ email: "test@test.com", password: "passowrd" })
       .expect(400)
})

it("get cookie back", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "passowrd" })
    .expect(201)

    expect(response.get("Set-Cookie")).toBeDefined()
  
})