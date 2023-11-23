import {Router, Request, Response} from 'express'
import { ParkingController } from '../controllers/ParkingController'
import logger from '../middlewares/logger'
import validationSchema from '../middlewares/validationSchema'
import isAvailable from '../middlewares/isAvailable'
import valdiationCheckout from '../middlewares/validationCheckout'
import validationPlateCheckout from "../middlewares/validationPlateCheckout";
import validationDuplicateCheckin from "../middlewares/validationDuplicateCheckin";

const route = Router()

const parkingController = new ParkingController()

route.get('/' ,(req: Request, res: Response) => res.send('Bem vindo ao estacionamento!') )
route.get('/parkingIsAvailable', parkingController.listAvailableSlot )
route.get('/parkingIsNotAvailable', parkingController.listNotAvailable )
route.put('/checkin',validationSchema, isAvailable,validationDuplicateCheckin,logger,parkingController.checkin)
route.put('/checkout', validationPlateCheckout ,logger,parkingController.checkout)
route.put('/checkoutbyplate/:plate',validationPlateCheckout,logger,parkingController.checkoutByPlate)

export default route