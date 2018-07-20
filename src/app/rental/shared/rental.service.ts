import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { HttpClient } from '@angular/common/http';
import { Rental } from '../rental.model';

@Injectable()

export class RentalService{
    constructor( private http: HttpClient) {}

    public getRentals() : Observable<any> {
        return this.http.get('/api/v1/rentals');

    }

    public getRentalsByCity(city : string) : Observable<any> {
        return this.http.get(`/api/v1/rentals?city=${city}`);

    }

    public getRentalByID (rentalId : String) : Observable<any> {
        return this.http.get('/api/v1/rentals/' + rentalId);

    }

    public createRental (rental : Rental) : Observable<any> {
        return this.http.post('/api/v1/rentals/',rental);

    }



}