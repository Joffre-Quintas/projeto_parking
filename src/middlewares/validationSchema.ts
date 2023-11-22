import { Request, Response, NextFunction } from "express"

export default function validation(req:Request, res: Response, next: NextFunction) {
  const { pos, plateCar, carModel } = req.body
  if(pos < 0 || !plateCar || !carModel) {
    return res.status(400).json({ message: "Preencha todos os campos" })
  }
  
  next()
}