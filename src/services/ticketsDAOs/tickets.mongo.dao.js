import { Tickets } from '../../models/Ticket.model.js'

class TicketMongo{
  constructor(ticketModel){
    this.ticket = ticketModel
  }

  async getTicket(id){
    try {
      const ticket = await this.ticket.findOne({_id:id}).lean()
      return ticket
    } catch (error) {
      throw new Error(error)
    }
  }

  async createTicket(data){
    try {
      const createdTicket = await this.ticket.create(data)
      return createdTicket
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteTicket(id){
    try {
      await this.ticket.delete({_id:id})
    } catch (error) {
      throw new Error(error)
    }
  }

}

export default new TicketMongo(Tickets)