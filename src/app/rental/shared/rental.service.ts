import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Rental } from '../rental.model';

@Injectable()

export class RentalService{
    private rentals : Rental[] = [{
        id: 1,
        title: "Central apartment",
        city: "Newyork",
        category: "apartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "very nice apartment",
        shared: false,
        createdAt: "24/12/2017",
        dailyRate: "$24"
      },
      {
        id: 2,
        title: "Central apartment",
        city: "California",
        category: "Condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "very nice apartment",
        shared: false,
        createdAt: "24/12/2017",
        dailyRate: "$24"
      },
      {
        id: 3,
        title: "Central apartment",
        city: "Mumbai",
        category: "House",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "very nice apartment",
        shared: false,
        createdAt: "24/12/2017",
        dailyRate: "$24"
        
      },
      {
        id:4,
        title: "Central apartment",
        city: "Goa",
        category: "apartment",
        image: "http://via.pla(ceholder.com/350x250",
        bedrooms: 3,
        description: "very nice apartment",
        shared: false,
        createdAt: "24/12/2017",
        dailyRate: "$24"
      },
    ];

    public getRentals() : Observable<Rental[]> {
        return new Observable<Rental[]>((observer) => {
            setTimeout(()=>{
                observer.next(this.rentals)
            }, 1000);
            setTimeout(()=>{
                observer.error("I am error")
            }, 2000);
            setTimeout(()=>{
                observer.complete();
            }, 3000)


        } );
    }

    public getRentalByID (rentalID : number) : Observable<Rental> {
        return new Observable((observer) => {
            setTimeout(()=> {
                const foundRental = this.rentals.find((rental) => {
                    return rental.id == rentalID;
                });
                observer.next(foundRental)
            }, 500);
        });
        
    }
}