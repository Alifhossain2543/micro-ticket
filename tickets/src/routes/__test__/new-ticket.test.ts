import request from "supertest"
import { app } from "../../app"
import { Ticket } from "../../models/ticket"
import { signin } from "../../tests/setup"


it("this will request to /api/tickets/newticket", async () => {
  const res = await request(app).post("/api/tickets/newticket").send({})
  expect(res.status).not.toEqual(400)
})

it("this can only be access by the auth user", async () => {
  await request(app).post("/api/tickets/newticket").send({}).expect(404)
})

it("add user cookie and get a auth status code", async () => {
  const res = await request(app)
    .post("/api/tickets/newticket")
    .set("Cookie", signin())
    .send({})

  expect(res.status).not.toEqual(404)
})

it("check if the provide title is valid", async () => {
  await request(app)
    .post("/api/tickets/newticket")
    .set("Cookie", signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400)

  await request(app)
    .post("/api/tickets/newticket")
    .set("Cookie", signin())
    .send({
      price: 10,
    })
    .expect(400)
})

it("check if the provide price is valid", async () => {
   await request(app)
    .post("/api/tickets/newticket")
    .set("Cookie", signin())
    .send({
      title: "asdasd",
      price: -10,
    })
    .expect(400)
})


it("make a succesful ticket creation", async () => {
  const tickets = await Ticket.find({})

  expect(tickets.length).toEqual(0)
  const title = "asdasd"
  await request(app)
    .post("/api/tickets/newticket")
    .set("Cookie", signin())
    .send({
      title: title,
      price: 10,
      userId : "asdasf23423sdf"
    })
    .expect(201)

    const newTickets = await Ticket.find({})

    expect(newTickets.length).toEqual(1)
    expect(newTickets[0].price).toEqual(10)
    expect(newTickets[0].title).toEqual(title)


})