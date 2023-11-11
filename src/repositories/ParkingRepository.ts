import { Request, Response } from "express";
import { parking } from "..";

export class ParkingRepository {
  
  updateParkingRepository(pos: number, car: object) {

    const isEmpty = parking.getSlot()[pos] === '-'
    if(isEmpty) {
      throw new Error("Vaga ocupada!")
    }

   parking.getSlot().splice(pos,1,{...car, checkIn: new Date()})
  }
}