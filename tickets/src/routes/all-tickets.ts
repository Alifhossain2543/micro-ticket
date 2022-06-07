import { Request, Response, NextFunction, Router } from "express"
import { NotFoundError, requireAuth } from "@hridoymahmud/commonfiles"
import { Ticket } from "../models/ticket"

const router = Router()

router.get(
  "/api/tickets",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {

    const ticket = await Ticket.find({ })

    if (!ticket) {
      throw new NotFoundError()
    }

    res.send(ticket)
  }
)

export { router as allTickets }
