import { Request, Response, NextFunction } from "express"
import { ParkingRepository } from "../repositories/ParkingRepository"

export default function validationPlateCheckout(req:Request, res: Response, next: NextFunction) {
    const plateCar = req.params.plate
    console.log(plateCar)
    const parkingRepository = new ParkingRepository()
    const data = parkingRepository.listAllSlot()
    console.log(data)
    const existCarPlate = data.find(car => car.plateCar === plateCar)
    console.log(existCarPlate)
    const plateRegex = /[A-Z]{3}[0-9]{4}/

    if(!plateRegex.test(plateCar)) {
        return res.status(404).json({ message: `Informe corretamente a placa. Formato: XXX0000`})
    }
    if(!existCarPlate) {
        return res.status(404).json({ message: `Nao existe carro estacionado com a placa ${plateCar}`})
    }

    next()
}