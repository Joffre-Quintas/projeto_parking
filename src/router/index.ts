import {Router, Request, Response} from 'express'
import { ParkingController } from '../controllers/ParkingController'

const route = Router()

const parkingController = new ParkingController()

route.get('/' ,(req: Request, res: Response) => res.send('Bem vindo ao estacionamento!') )
route.get('/parkingIsAvailable', parkingController.listAvailableSlot )
route.get('/parkingIsNotAvailable', parkingController.listNotAvailable )
route.put('/checkin', parkingController.checkin)
route.put('/checkout', parkingController.checkout)

export default route