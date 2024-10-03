import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import { AuthfakeauthenticationService } from './authfake.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserProfileService } from './user.service';

@Injectable({ providedIn: 'root' })
export class DepositService {
    readonly ApiUrl = environment.appapiConfig.apiUrl
    currentUser : any = this.authFackservice.currentUserValue;
    constructor(private http: HttpClient, private router: Router,  private authFackservice: AuthfakeauthenticationService) {

    }
   
    createDeposit(formItem:FormData):Observable<any>{     
        return this.http.post(this.ApiUrl + '/Deposit/CreateDepositAsync/', formItem,{headers : new HttpHeaders({ 
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getConsersion(deviceValue:string):Observable<any>{
        return this.http.get('https://api.fastforex.io/fetch-one?from=' + deviceValue + '&to=USD&api_key=a6821d79cc-64ca3d467a-saok3l')
    }

    getDepositByUserId(filters:number, pageSize:number, pageNo:number):Observable<any>{
        return this.http.get(this.ApiUrl + '/Deposit/GetDepositByUserId?filters=' + filters + '&pageSize=' + pageSize + '&pageNo=' + pageNo,  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getDepositCategory():Observable<any>{
        return this.http.get(this.ApiUrl + '/Deposit/GetDepositCategory',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    adminCreateDepositAsync(formItem:any):Observable<any>{
        return this.http.post(this.ApiUrl + '/Deposit/AdminCreateDepositAsync',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    updateDepositAsync(formItem:any):Observable<any>{
        return this.http.post(this.ApiUrl + '/Deposit/UpdateDepositAsync', formItem,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    downloadAttachmentAsync(formItem:any):Observable<any>{
        return this.http.post(this.ApiUrl + '/Deposit/DownloadFile', formItem,{responseType: 'blob',observe: 'response',headers : new HttpHeaders({'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${this.currentUser.access_token}`})} )
    } 

    getAllDeposit():Observable<any>{
        return this.http.get(this.ApiUrl + '/Deposit/GetDepositByUserId',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getById(id:string):Observable<any>{
        return this.http.get(this.ApiUrl + '/Deposit/GetByIdAsync?depositId=' + id,  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
    getpackageList(id:string):Observable<any>{
        return this.http.get(this.ApiUrl + '/Package/PackageList',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
}
