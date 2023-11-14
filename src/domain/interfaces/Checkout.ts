import {Checkin} from "./Checkin";

export interface Checkout extends Checkin {
    checkOut: Date;
    total?: number;
}