import { Request, Response, NextFunction } from "express"

export default function logger(req:Request, res: Response, next: NextFunction) {
  const operation = req.url.replace('/','')

  const { pos, plateCar, carModel } = req.body
  const data = new Date()

  console.log(`Realizando a operação de ${operation}, no momento: ${data}. 
  O carro de modelo ${carModel} e placa ${plateCar}, ocupará a vaga: ${pos} `)

  next()
}