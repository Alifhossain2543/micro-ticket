import { Request, Response, NextFunction, Router } from "express"
import { NotFoundError, requireAuth, BadRequestError } from "@hridoymahmud/commonfiles"
import { Ticket } from "../models/ticket"
import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { netsWrapper } from "../nats-wrapper";
const router = Router()

router.put(
  "/api/tickets/:ticketId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const {  title, price } = req.body
    const {ticketId} = req.params

    const ticket = await Ticket.findById({ _id: ticketId })

    if (!ticket) {
      throw new NotFoundError()
    }

    if (ticket.userId !== req.currentUser!.id) {
        throw new BadRequestError("You're not the ticket owner.")
    }

  ticket.set({
    title : title,
    price : price
  })

  await ticket.save()

  await new TicketUpdatedPublisher(netsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
  })

   

    res.send(ticket)
  }
)

export { router as updateTicket }
