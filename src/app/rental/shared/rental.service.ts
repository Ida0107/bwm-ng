import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { HttpClient } from '@angular/common/http';

@Injectable()

export class RentalService{
    constructor( private http: HttpClient) {}

    public getRentals() : Observable<any> {
        return this.http.get('/api/v1/rentals');

    }

    public getRentalByID (rentalId : String) : Observable<any> {
        return this.http.get('/api/v1/rentals/' + rentalId);

}}