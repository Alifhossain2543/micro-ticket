import { Request, Response, NextFunction, Router } from "express"
import { requireAuth, validateRequest } from "@hridoymahmud/commonfiles"
import { body } from "express-validator"
import { Ticket } from "../models/ticket"
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher"
import { netsWrapper } from "../nats-wrapper"

const router = Router()

router.post(
  "/api/tickets/newticket",
  requireAuth,
  [body("title").not().isEmpty().withMessage("title is required"), body("price").isFloat({gt : 0}).withMessage("price must be greater than 0")],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {

    const {title, price} = req.body

    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id })

    await ticket.save()

    await new TicketCreatedPublisher(netsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    })

    res.status(201).send(ticket)

  }
)

export {router as newTicket}