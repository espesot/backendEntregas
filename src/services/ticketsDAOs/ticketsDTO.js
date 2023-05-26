export default class TicktDTO{
  constructor(ticket){
    this.id = this._id || ticket.id
    this.purchaseDateTime = ticket.purchaseDateTime
    this.amount = ticket.amount
    this.purchaser = ticket.purchaser
    this.deleted = ticket.deleted
    this.createdAt = ticket.createdAt
    this.updatedAt = ticket.updatedAt
  }
}