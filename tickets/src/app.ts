import express from "express"
require("express-async-errors")
import { json } from "body-parser"

import { errorHandler, NotFoundError, currentUserCheck } from "@hridoymahmud/commonfiles"
import cookieSession from "cookie-session"
import { newTicket } from "./routes/new-ticket"
import { oneTicket } from "./routes/one-ticket"
import { allTickets } from "./routes/all-tickets"
import { updateTicket } from "./routes/update-ticket"

const app = express()
app.set("trust proxy", true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)


app.use(currentUserCheck)
app.use(newTicket)
app.use(oneTicket)
app.use(allTickets)
app.use(updateTicket)

app.all("*", () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export{app}