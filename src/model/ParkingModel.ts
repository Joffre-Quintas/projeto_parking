export class ParkingModel {
  private slot

  constructor(slot: number) {
    this.slot = new Array(slot)
  }

  toString(): string {
    console.log(`O estacionamento tem ${this.slot.length} vagas.`)
    return `O estacionamento tem ${this.slot.length} vagas.`
  }
}