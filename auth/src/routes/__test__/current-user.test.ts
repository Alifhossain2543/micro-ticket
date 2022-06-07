import request from "supertest"

import { app } from "../../app"
import { signin } from "../../tests/setup"

it("get a current user with cookie", async () => {
  
    const cookie = (await signin()).toString()


  const response = await request(app)
    .get("/api/users/currentuser")
    .set('Cookie', cookie)
    .expect(200)

    expect(response.body.currentUser.email).toEqual("test@test.com")


})

it("get a current user of null", async () => {

  const response = await request(app)
    .get("/api/users/currentuser")
    .expect(200)

  expect(response.body.currentUser).toEqual(null)
})
