import { Booking } from "../booking/shared/booking.model";

export class Rental {
    _id: string ;
    title: string;
    city: string;
    category: string;
    image: string;
    bedrooms: number;
    description: string;
    shared: boolean;
    createdAt: string;
    dailyRate: number;
    bookings: Booking[];
}