import request from 'supertest'
import { app } from '../../app'
import {signin} from '../../tests/setup'

it("send a 404 error since the valid route is not found", async () => {
  await request(app)
    .get("/api/tickets/asgdfg334534")
    .expect(404)
} )

it('get a saved ticket', async () =>  {
  const title = "asdasd"
  const price = 10
  const res = await request(app)
    .post("/api/tickets/newticket")
    .set("Cookie", signin())
    .send({
      title,
      price,
    })
    .expect(201)

  const data = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .set("Cookie", signin())
    .send()
    .expect(200)

  expect(data.body.title).toEqual(title)
  expect(data.body.price).toEqual(price)
  expect(data.body.id).toEqual(res.body.id)
  expect(data.body.userId).toEqual(res.body.userId)
})