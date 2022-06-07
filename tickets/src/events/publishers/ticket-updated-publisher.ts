import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@hridoymahmud/commonfiles"

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}
