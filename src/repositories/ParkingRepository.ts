import { parking } from "..";
import {Checkin} from "../domain/interfaces/Checkin";

export class ParkingRepository {
  
  updateParkingRepository(checkin: Checkin) {
   parking.getSlot().splice(checkin.pos,1,{...checkin})
  }

  listAllSlot() {
    return parking.getSlot()
  }
}