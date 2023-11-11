import {Router} from 'express'
import { ParkingModel } from '../model/ParkingModel'

const route = Router()

function qualquer() {
  const parkingModel = new ParkingModel(5)
  parkingModel.toString()
}


route.get('/', () => qualquer())

export default route