import request from 'supertest'
import { app } from '../../app'
import { signin } from '../../tests/setup'

const createTicket = () => {
    let number = 1
    return request(app)
      .post("/api/tickets/newticket")
      .set("Cookie", signin())
      .send({
        title: `test ${number++}`,
        price: 10,
      })
}

it("check if getting all the tickets", async () => {
    await createTicket()
    await createTicket()
    await createTicket()
    await createTicket()

    const response = await request(app)
      .get("/api/tickets")
      .set("Cookie", signin())
      .send()
      .expect(200)

    expect(response.body.length).toEqual(4)
})
