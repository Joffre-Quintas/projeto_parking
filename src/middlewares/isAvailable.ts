import { Request, Response, NextFunction } from "express"
import { ParkingRepository } from "../repositories/ParkingRepository"

export default function isAvailable(req:Request, res: Response, next: NextFunction) {
  const parkingRepository = new ParkingRepository()
  if(!parkingRepository.listAllSlot().some(slot => slot === '-')) {
    return res.status(404).json({  message: 'Não há vagas disponíveis'})
  }
  
  next()
}