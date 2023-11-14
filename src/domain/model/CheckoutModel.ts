import {Checkout} from "../interfaces/Checkout";

export class CheckoutModel implements Checkout {
    pos;
    plateCar;
    carModel;
    checkIn;
    checkOut;
    total?;

    constructor(pos: number, plateCar: string, carModel: string, checkIn: Date, checkOut: Date, total?: number) {
        this.pos = pos;
        this.plateCar = plateCar;
        this.carModel = carModel;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.total = total;
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

    getCheckOut(): Date {
        return this.checkOut;
    }

    getTotal(): any {
        return this.total;
    }

    calculateTotal(hourPrice: number): any {
        const duracao = this.calculateDuracao()
        const total = duracao * hourPrice
        this.total = total
        return total
    }

    calculateDuracao(): number {
        let duracao = this.checkOut.valueOf() - this.checkIn.valueOf()
        duracao = Math.ceil((Number(duracao) / 3600000))
        return duracao
    }
}