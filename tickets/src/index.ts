import mongoose from "mongoose"
import { app } from "./app"
import { netsWrapper } from "./nats-wrapper"
const startDb = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("Jwt key must be defined")
  }
   if (!process.env.MONGO_URI) {
     throw new Error("Mongo Url must be defined")
   }
  try {
    await netsWrapper.connect("ticketing", "asdad", "http://nats-srv:4222")
      netsWrapper.client.on("close", () => {
        console.log("NATS connection closed")
        process.exit()
      })

      process.on("SIGINT", () => netsWrapper.client.close())
      process.on("SIGTERM", () => netsWrapper.client.close())

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log("db connected")
  } catch (err) {
    console.log(err)
  }
}

app.listen(4001, () => console.log("listening on port 4001"))
startDb()
