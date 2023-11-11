//@ts-nocheck
import { Request, Response } from "express";
import { parking } from "..";
import { ParkingRepository } from "../repositories/ParkingRepository";

const parkingRepository = new ParkingRepository()

export class ParkingController {

  listAvailableSlot(req:Request,res: Response) {

    const available = [] 
    parking.getSlot().forEach((item,index) => {
      if(item === '-') {
        available.push(index)
      }
    })

    res.status(200).json({ data: available }) 
  }

  listNotAvailable(req:Request,res: Response) {
    const listNotAvailable = []
    parking.getSlot().forEach((item,index) => {
      if(item !== '-') {
        listNotAvailable.push(index)
      }
    })
    res.status(200).json({ data: listNotAvailable }) 
  }

  checkin(req:Request,res: Response) {
    const { pos, car } = req.body
    try {
      parkingRepository.updateParkingRepository(req.body, res) 
    } catch (error: any) {
      return res.status(404).json({ error: error.message })
    }
    res.status(200).json({ message: `Carro ${car.placa} estacionado na vaga ${pos}`})
  }
}