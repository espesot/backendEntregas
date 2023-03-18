import TicketDTO from './tickets.dto.js'

export class TicketRepository {
  constructor(dao) {
    this.dao = dao
  }

  async getTicket(id) {
    try {
      const ticket = await this.dao.getTicket(id)
      const ticketDTO = new TicketDTO(ticket)
      return ticketDTO
    } catch (error) {
      throw new Error('Error al buscar Ticket')
    }
  }
  async createTicket(data) {
    try {
      const createdTicket = await this.dao.createTicket(data)
      const ticketDTO = new TicketDTO(createdTicket)
      return ticketDTO
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteTicket(id) {
    try {
      await this.dao.deleteTicket(id)
    } catch (error) {
      throw new Error(error.message)
    }
  }
}