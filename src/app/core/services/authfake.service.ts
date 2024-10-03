import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, } from 'rxjs/operators';

import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromLocalStorage());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    private getCurrentUserFromLocalStorage(): User | null {
        const userJson = localStorage.getItem('currentUser');
        return userJson ? JSON.parse(userJson) : null;
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.getValue();
    }

    login(email: string, password: string) {
        const url:string = environment.appapiConfig.apiUrl + "/Auth/Login"
        const data = {
            emailAddress: email,
            password: password
        }

       
        return this.http.post<any>(url, data).pipe
            (tap(user => {
                console.log("LOGIN RESPONSE START", user);
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                console.log("LOGIN RESPONSE END");
            }));
    }

    loginWithOTP(email: string, password: string, OTP: string) {
        const url:string = environment.appapiConfig.apiUrl + "/Auth/LoginOtp"
        const data = {
            emailAddress : email ,
            password : password,
            otp : Number(OTP)
        }
        return this.http.post<any>(url, data)
            .pipe(tap(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    sendOTP(email: string) {
        const url:string = environment.appapiConfig.apiUrl + "/Auth/OneTimePasword"
        const data = {
            emailAddress: email 
        };
        return this.http.post<any>(url, data)
            .pipe(tap(user => {
                // login successful if there's a jwt token in the response
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
