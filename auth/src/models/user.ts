import mongoose from "mongoose";
import { Password } from '../services/password';

interface userAttr {
    email : string,
    password : string
}

interface userModel extends mongoose.Model<userDoc> {
  build(attr: userAttr): any
}

interface userDoc extends mongoose.Document {
    email :string,
    password : string
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  toJSON : {
    transform (doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v

    }
  }
})

userSchema.pre('save', async function (next) {
  if(this.isModified('password')) {
    const hash = await Password.toHash(this.get('password'))

    this.set('password', hash)

  }

  next()

} )

userSchema.statics.build = (attr : userAttr ) => {
 return new User(attr)
}

const User = mongoose.model<userDoc, userModel>("User", userSchema)


export {User}