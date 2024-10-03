import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/auth.models';
import { AuthfakeauthenticationService } from './authfake.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class orderservice {
    readonly ApiUrl = environment.appapiConfig.apiUrl
    currentUser : any = this.authFackservice.currentUserValue;
    constructor(private http: HttpClient, private router: Router,  private authFackservice: AuthfakeauthenticationService) {

    }

  
    updateOrderAsync(formItem:any):Observable<any>{
        let body = JSON.stringify(formItem);
        console.log(body)
        return this.http.post(this.ApiUrl + '/Order/SetOrderStatus', body,{headers : new HttpHeaders({'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    updateIspaidAsync(formItem:any):Observable<any>{
        let body = JSON.stringify(formItem);
        console.log(body)
        return this.http.post(this.ApiUrl + '/Order/SetOrderPaid', body,{headers : new HttpHeaders({'Content-Type': 'application/json' ,
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

   
}
