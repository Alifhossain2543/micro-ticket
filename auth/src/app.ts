import express from "express"
require("express-async-errors")
import { json } from "body-parser"
import { CurrnetUser } from "./routes/current-user"
import { SignIn } from "./routes/signin"
import { SignOut } from "./routes/signout"
import { SignUp } from "./routes/signup"
import { errorHandler } from "@hridoymahmud/commonfiles"
import { NotFoundError } from "@hridoymahmud/commonfiles"
import cookieSession from "cookie-session"

const app = express()
app.set("trust proxy", true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)
// this is a comment

app.use(CurrnetUser)
app.use(SignUp)
app.use(SignIn)
app.use(SignOut)

app.all("*", () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export{app}