import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import { AuthfakeauthenticationService } from './authfake.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class OrderService {
    readonly ApiUrl = environment.appapiConfig.apiUrl
    currentUser : any = this.authFackservice.currentUserValue;
    constructor(private http: HttpClient, private router: Router,  private authFackservice: AuthfakeauthenticationService) {

    }

    generateOTP():Observable<any>{
        return this.http.get(this.ApiUrl + '/Bank/GenerateBankOtpAsync',
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    createBankAsyncNoOtp(formItem:any):Observable<any>{
      let body = JSON.stringify(formItem);
      console.log(body)
      return this.http.post(this.ApiUrl + '/Bank/CreateNoOtpBankAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${this.currentUser.access_token}`})})
  }


    createBankAsync(formItem:any):Observable<any>{
        let body = JSON.stringify(formItem);
        console.log(body)
        return this.http.post(this.ApiUrl + '/Bank/CreateBankAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    updateBankAsync(formItem:any):Observable<any>{
        let body = JSON.stringify(formItem);
        return this.http.post(this.ApiUrl + '/Bank/UpdateBankAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    updateOrderAsync(formItem:any):Observable<any>{
        let body = JSON.stringify(formItem);
        return this.http.post(this.ApiUrl + '/Bank/UpdateBankAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }


    getWithdrawalCategory():Observable<any>{
        return this.http.get(this.ApiUrl + '/Withdrawal/GetWithdrawalCategory',
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    adminCreateWithdrawalAsync(formItem:any):Observable<any>{
        return this.http.post(this.ApiUrl + '/Withdrawal/AdminCreateWithdrawalAsync',
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    updateWithdrawalAsync(formItem:any):Observable<any>{
        return this.http.post(this.ApiUrl + '/Withdrawal/UpdateWithdrawalAsync',
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getAllWithdrawal():Observable<any>{
        return this.http.get(this.ApiUrl + '/Withdrawal/GetAllWithdrawal',
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getById(id:number):Observable<any>{
        return this.http.get(this.ApiUrl + '/Withdrawal/GetById',
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
}
