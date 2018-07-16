import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';    //gives access to map function
//map function acts as an intermediate between subscribe and observable return
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class DecodedToken{
    exp: number;
    username: string;
}

@Injectable()

export class AuthService{
    private decodedToken ;
    constructor( private http: HttpClient) {
        this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken;
    }

    private saveToken(token: any ) : any {
        this.decodedToken = jwt.decode(token);
        //console.log(this.decodedToken);

        localStorage.setItem('bwm_auth', token);
        localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
        return token;
    }

    public getToken(): string {
        return localStorage.getItem('bwm_auth');
    }

    
    public register(userData : any) : Observable<any> {
        return this.http.post('/api/v1/users/register', userData);

    }

    public loginUser(loginData : any) : Observable<any> {
        return this.http.post('/api/v1/users/auth', loginData).map(
            (token)=>{
                return this.saveToken(token);
            });
    }

    public isAuthenticated() : boolean {
        return moment().isBefore(moment.unix(this.decodedToken.exp));
    }

    public logout() {
        localStorage.removeItem('bwm_auth');
        localStorage.removeItem('bwm_meta');
        this.decodedToken = new DecodedToken;
    }

    public getUsername() : string {
        // console.log (this.decodedToken);
        return this.decodedToken.username;
    }

}