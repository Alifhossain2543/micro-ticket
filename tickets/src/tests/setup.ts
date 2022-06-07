import {MongoMemoryServer} from 'mongodb-memory-server'
import { app } from '../app'
import request from "supertest"
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';


let mongo : any;
jest.mock("../nats-wrapper")

beforeAll (async () => {
    process.env.JWT_KEY = "asdasdff"
    mongo = new MongoMemoryServer()
    const mongouri = await mongo.getUri()

    await mongoose.connect(mongouri, {
        dbName: "tickets",
        useNewUrlParser : true,
        useUnifiedTopology : true
    })

})

beforeEach(async() => {
    jest.clearAllMocks()
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async() => {
      await mongo.stop()
    await mongoose.connection.close()

})

const signin =  () => {
  const payload = {
      id: "asdas231sdf",
      email : "test@test.com"
  }

const token = jwt.sign(payload, process.env.JWT_KEY!)

const session = {jwt : token}

const tokenJson = JSON.stringify(session)

const base64 = Buffer.from(tokenJson).toString("base64")

return [`session=${base64}`]


}

export {signin}