import express, {Request, Response} from "express"
import { validateRequest } from "@hridoymahmud/commonfiles"
import { body } from "express-validator"
import { User } from "../models/user"
import { BadRequestError } from "@hridoymahmud/commonfiles"
import { Password } from '../services/password';
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/api/users/signin", [
    body("email").isEmail().withMessage("Put a valid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be between 4 to 24 character."),
  ],
  validateRequest,
   async (req : Request, res : Response) => {

  const {email, password} = req.body

  const user = await User.findOne({email : email})

if (!user) {
        throw new BadRequestError("Credential does not match.")
      }
  const comparePassword = await Password.compare(user.password, password)
if (!comparePassword) {
  throw new BadRequestError("Credential does not match.")
}

 const jwToken = jwt.sign(
   { id: user._id, email: user.email },
   process.env.JWT_KEY!
 )

req.session = {
  jwt : jwToken
}

res.status(200).send({user})

})

export { router as SignIn }
