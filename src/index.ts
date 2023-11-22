import express from 'express';
import route from './router';
import cors from 'cors';
import { ParkingModel } from './domain/model/ParkingModel';
import {CheckinModel} from "./domain/model/CheckinModel";

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(route)

//Singleton Parking
const randomSlot = Math.round(Math.random()+5)
export const parking = new ParkingModel(randomSlot)
parking.toString()

const checkin = new CheckinModel(0, 'ABC-1234', 'Fiat Uno', new Date())
// console.log({...checkin})
app.listen(3000, () => console.log('Servidor rodando...'))