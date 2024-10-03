import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import { AuthfakeauthenticationService } from './authfake.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class WithdrawService {
    readonly ApiUrl = environment.appapiConfig.apiUrl
    currentUser : any = this.authFackservice.currentUserValue;
    constructor(private http: HttpClient, private router: Router,  private authFackservice: AuthfakeauthenticationService) {

    }
   
    createWithdrawal(formItem:any):Observable<any>{          
        let body = JSON.stringify(formItem);     
        return this.http.post(this.ApiUrl + '/Withdrawal/CreateWithdrawalAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getWithdrawalByUserId(filters:number, pageSize:number, pageNo:number):Observable<any>{
        return this.http.get(this.ApiUrl + '/Withdrawal/GetWithdrawalByUserId?filters=' + filters + '&pageSize=' + pageSize + '&pageNo=' + pageNo,  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
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
        return this.http.post(this.ApiUrl + '/Withdrawal/UpdateWithdrawalAsync', formItem,  
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

    generateOTP():Observable<any>{
        return this.http.get(this.ApiUrl + '/Withdrawal/CreatingWithdrawalAsync',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
    getBankList():Observable<any>{
        return this.http.get(this.ApiUrl + '/Bank/GetBankByUserId?filters={}' + '&pageSize=15&pageNo=1',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
}