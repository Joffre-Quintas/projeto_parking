//@ts-nocheck
import { Request, Response } from "express";
import { parking } from "..";
import { ParkingRepository } from "../repositories/ParkingRepository";
import {Checkin} from "../domain/interfaces/Checkin";
import {CheckinModel} from "../domain/model/CheckinModel";
import {ParkingService} from "../service/parkingService";
import {Checkout} from "../domain/interfaces/Checkout";

const parkingService = new ParkingService()

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
    let info: Checkin[] = []
    try {
      info = parkingService.getNotAvailableSlot()
    } catch (error: any) {
      return res.status(404).json({ error: error.message })
    }
    res.status(200).json({ data: info })
  }

  checkin(req:Request,res: Response) {
    const { pos, plateCar, carModel } = req.body
    const checkin: Checkin = new CheckinModel(pos, plateCar, carModel, new Date())
    try {
      parkingService.createCheckin(checkin)
    } catch (error: any) {
      return res.status(404).json({ error: error.message })
    }
    res.status(200).json({ message: `Carro ${checkin.plateCar} estacionado na vaga ${checkin.pos}`})
  }

  checkout(req:Request,res: Response) {
    const { pos, priceHour } = req.body

    let checkout: Checkout
    try {
      checkout = parkingService.createCheckout(pos, priceHour)
    } catch (error: any) {
      return res.status(404).json({ error: error.message })
    }
    res.status(200).json({ message: `Carro ${checkout.plateCar} fez o checkou na vaga ${checkout.pos}, valor a pagar R$ ${checkout.total}`})
  }

  checkoutByPlate(req:Request,res: Response) {
    const { pos, priceHour } = req.body
    const plateCar = req.params.plate

    let checkout: Checkout
    try {
      checkout = parkingService.createCheckoutByPlate(pos, priceHour, plateCar)
    } catch (error: any) {
      return res.status(404).json({ error: error.message })
    }
    res.status(200).json({ message: `Carro ${checkout.plateCar} fez o checkou na vaga ${checkout.pos}, valor a pagar R$ ${checkout.total}`})
  }
}