import { Rental } from "../../rental/rental.model";

export class Booking {
    static readonly DATE_FORMAT = 'Y-MM-DD';
    _id: string;
    startAt: string;
    endAt: string;
    days: number;
    guests: number;
    totalPrice: number;
    createdAt: string;
    rental : Rental;
}