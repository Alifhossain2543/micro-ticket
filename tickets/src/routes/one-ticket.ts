import { Request, Response, NextFunction, Router } from "express"
import { NotFoundError, requireAuth } from "@hridoymahmud/commonfiles"
import { Ticket } from "../models/ticket"

const router = Router()

router.get(
  "/api/tickets/:id",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const ticket = await Ticket.findById({_id : id})

    if(!ticket ){
        throw new NotFoundError()
    }

    res.send(ticket)
  }
)

export { router as oneTicket }
