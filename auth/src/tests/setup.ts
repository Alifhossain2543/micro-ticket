import {MongoMemoryServer} from 'mongodb-memory-server'
import { app } from '../app'
import request from "supertest"
import mongoose from 'mongoose'

let mongo : any;

beforeAll (async () => {
    process.env.JWT_KEY = "asdasdff"
    mongo = new MongoMemoryServer()
    const mongouri = await mongo.getUri()

    await mongoose.connect(mongouri, {
        dbName: "auth",
        useNewUrlParser : true,
        useUnifiedTopology : true
    })

})

beforeEach(async() => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async() => {
      await mongo.stop()
    await mongoose.connection.close()

})

const signin = async () => {
    const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "passowrd" })
    .expect(201)

    const cookie = res.get('Set-Cookie')

    return cookie
}

export {signin}