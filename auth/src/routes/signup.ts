import express, {Request, Response} from "express"
import { body } from "express-validator"
import { User } from "../models/user";
import { BadRequestError } from "@hridoymahmud/commonfiles"
import jwt from "jsonwebtoken"
import { validateRequest } from "@hridoymahmud/commonfiles"

const router = express.Router()

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Put a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 24 })
      .withMessage("Password must be between 4 to 24 character."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError("User exist")
    }

    const user = User.build({ email, password })

    await user.save()

    const jwToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: jwToken,
    }

    res.status(201).send( user )
  }
)

export { router as SignUp }
