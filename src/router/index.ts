import {Router} from 'express'
import { ParkingController } from '../controllers/ParkingController'

const route = Router()

const parkingController = new ParkingController()

route.get('/' ,(req, res) => res.send('Bem vindo ao estacionamento!') )
route.get('/parkingIsAvailable', parkingController.listAvailableSlot )
route.get('/parkingIsNotAvailable', parkingController.listNotAvailable )
route.put('/parking', parkingController.checkin)

export default route