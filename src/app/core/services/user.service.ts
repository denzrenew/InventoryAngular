import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import { AuthfakeauthenticationService } from './authfake.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    readonly ApiUrl = environment.appapiConfig.apiUrl
    currentUser : any = this.authFackservice.currentUserValue;
    constructor(private http: HttpClient, private router: Router,  private authFackservice: AuthfakeauthenticationService) {

    }
    getTokenData():any{
        if (localStorage.getItem("currentUser") === null) {
          this.router.navigate(['/account/login']);
        }
        else
        {
          const tokenInfo = this.getDecodedAccessToken(JSON.stringify(this.currentUser.access_token))
          return tokenInfo;
        }
    }

    getDecodedAccessToken(token: string): any {
        try {
          return jwt_decode(token);
        } catch(Error) {
          return null;
        }
    }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    getUserInfo():Observable<any>{
        let userinfo = this.getTokenData()
        return this.http.get(this.ApiUrl + '/Account/ViewUserProfile',  
                                {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
      }

    register(user: User) {
        console.log(user)
        return this.http.post( this.ApiUrl + `/Auth/Register`, user);
    }

    validateOtp(otp: number):Observable<any>{ 
      return this.http.post(this.ApiUrl + '/Auth/IsValidOtp', otp)
    }

    resetPassword(formItem:any):Observable<any>{
      let body = JSON.stringify(formItem);     
      return this.http.post(this.ApiUrl + '/Auth/ForgotPassword', body,
        {headers : new HttpHeaders({'Content-Type': 'application/json'})})
    }

}
