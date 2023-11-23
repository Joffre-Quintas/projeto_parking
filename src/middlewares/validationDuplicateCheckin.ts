import { Request, Response, NextFunction } from "express"
import { ParkingRepository } from "../repositories/ParkingRepository"

export default function validationDuplicateCheckin(req:Request, res: Response, next: NextFunction) {
    const { pos, plateCar, carModel } = req.body

    const parkingRepository = new ParkingRepository()
    const existCarPlate = parkingRepository.listAllSlot().find(car => car.plateCar === plateCar)
    const carPos = parkingRepository.listAllSlot().find(car => car.pos === pos)
    const existModelCar = parkingRepository.listAllSlot().find(car => car.carModel === carModel)

    if (existModelCar && existCarPlate) {
        return res.status(404).json({ message: `Ja existe um carro estacionado com o modelo ${carModel} e placa ${plateCar}`})
    }
    if (existCarPlate) {
        return res.status(404).json({ message: `Ja existe um carro estacionado com a placa ${plateCar}`})
    }
    if (carPos) {
        return res.status(404).json({ message: `Ja existe um carro estacionado na vaga ${pos}`})
    }

    next()
}