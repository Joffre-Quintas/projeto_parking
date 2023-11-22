import {Router, Request, Response} from 'express'
import { ParkingController } from '../controllers/ParkingController'
import logger from '../middlewares/logger'
import validationSchema from '../middlewares/validationSchema'
import isAvailable from '../middlewares/isAvailable'
import valdiationCheckout from '../middlewares/validationCheckout'

const route = Router()

const parkingController = new ParkingController()

route.get('/' ,(req: Request, res: Response) => res.send('Bem vindo ao estacionamento!') )
route.get('/parkingIsAvailable', parkingController.listAvailableSlot )
route.get('/parkingIsNotAvailable', parkingController.listNotAvailable )
route.put('/checkin',validationSchema, isAvailable,logger,parkingController.checkin)
route.put('/checkout', valdiationCheckout ,logger,parkingController.checkout)

export default route