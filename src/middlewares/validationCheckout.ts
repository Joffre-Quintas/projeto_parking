import { Request, Response, NextFunction } from "express"
import { ParkingRepository } from "../repositories/ParkingRepository"

export default function valdiationCheckout(req:Request, res: Response, next: NextFunction) {
  const { pos, plateCar, carModel } = req.body
  const parkingRepository = new ParkingRepository()
  const car = parkingRepository.listAllSlot().find(car => car.plateCar === plateCar)
  const plateRegex = /[A-Z]{3}[0-9]{4}/

  if(!plateRegex.test(plateCar)) {
    return res.status(404).json({ message: `Informe corretamente a placa. Formato: XXX0000`})
  }
  if(car) {
    return res.status(404).json({ message: `Nao existe carro estaciodano com a placa ${plateCar}`})
  }
  
  next()
}