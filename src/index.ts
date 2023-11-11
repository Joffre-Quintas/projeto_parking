import express from 'express';
import route from './router';
import cors from 'cors';
import { ParkingModel } from './model/ParkingModel';

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(route)

//Singleton Parking
const randomSlot = Math.round(Math.random()*10+5)
export const parking = new ParkingModel(randomSlot)
parking.toString()

app.listen(3000, () => console.log('Servidor rodando...'))