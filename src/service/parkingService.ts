import {Checkin} from "../domain/interfaces/Checkin";
import {ParkingRepository} from "../repositories/ParkingRepository";
import {parking} from "../index";
import {CheckoutModel} from "../domain/model/CheckoutModel";
import {Checkout} from "../domain/interfaces/Checkout";

const parkingRepository = new ParkingRepository()

export class ParkingService {
    createCheckin(checkin: Checkin): void {
        const isEmpty = parkingRepository.listAllSlot()[checkin.pos] === '-'

        const isAllOcuped = parkingRepository.listAllSlot().every((item) => {
            return item !== '-'
        })

        if (isAllOcuped) {
            throw new Error("Estacionamento lotado!")
        }

        if(!isEmpty) {
            console.log(parkingRepository.listAllSlot())
            throw new Error("Vaga ocupada!")
        }

        console.log(`realizando checkin do carro ${checkin.carModel}
         na vaga ${checkin.pos} 
         às ${checkin.checkIn.toLocaleTimeString()}
         no dia ${checkin.checkIn.toLocaleDateString()}`)

        parkingRepository.updateParkingRepository(checkin)

        const isAllOcupedAfter = parkingRepository.listAllSlot().every((item) => {
            return item !== '-'
        })

        if (isAllOcupedAfter) {
            console.log("Estacionamento lotado!")
        }
    }

    getNotAvailableSlot(): Checkin[] {
        const listNotAvailable: Checkin[] = []
        parking.getSlot().forEach((item) => {
            if(item !== '-') {
                listNotAvailable.push({...item})
            }
        })
        console.log(listNotAvailable)
        return listNotAvailable
    }

    createCheckout(pos: number, priceHour: number): Checkout {
        let infoCheckin: Checkin
        parking.getSlot().forEach((item) => {
            if(item.pos === pos) {
                infoCheckin = {...item}
            }
        })
        if (infoCheckin! === undefined) {
            throw new Error("Vaga não ocupada!")
        }

        console.log(`realizando checkout do carro ${infoCheckin.carModel}`)
        const checkout = new CheckoutModel(
            pos,
            infoCheckin.plateCar,
            infoCheckin.carModel,
            infoCheckin.checkIn,
            new Date()
            )

        checkout.calculateTotal(priceHour)

        parking.getSlot().splice(pos,1,'-')

        console.log(`Carro ${checkout.plateCar} saiu da vaga ${checkout.pos}`)
        console.log(`Valor a pagar: ${checkout.total}`)

        return checkout
    }
}