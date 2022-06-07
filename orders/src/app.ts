import express from "express"
require("express-async-errors")
import { json } from "body-parser"

import { errorHandler, NotFoundError, currentUserCheck } from "@hridoymahmud/commonfiles"
import cookieSession from "cookie-session"
import { indexOrderRoute } from "./routes"
import { newOrderRoute } from "./routes/new"
import { deleteOrderRoute } from "./routes/delete"
import { showOrderRoute } from "./routes/show"


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
app.use(indexOrderRoute)
app.use(newOrderRoute)
app.use(deleteOrderRoute)
app.use(showOrderRoute)


app.all("*", () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export{app}