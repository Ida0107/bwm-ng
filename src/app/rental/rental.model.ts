import { Booking } from "../booking/shared/booking.model";
import { shimHostAttribute } from "../../../node_modules/@angular/platform-browser/src/dom/dom_renderer";

export class Rental {

    static readonly CATEGORIES = ['House', 'Apartment', 'Condo' ];

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