import {Checkin} from "../interfaces/Checkin";

export class CheckinModel implements Checkin {
    pos;
    plateCar;
    carModel;
    checkIn;

    constructor(pos: number, plateCar: string, carModel: string, checkIn: Date) {
        this.pos = pos;
        this.plateCar = plateCar;
        this.carModel = carModel;
        this.checkIn = checkIn;
    }

    getPos(): number {
        return this.pos;
    }

    getPlateCar(): string {
        return this.plateCar;
    }

    getCarModel(): string {
        return this.carModel;
    }

    getCheckIn(): Date {
        return this.checkIn;
    }
}