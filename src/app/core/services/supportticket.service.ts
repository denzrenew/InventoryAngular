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
export class SupportTicketService {
    readonly ApiUrl = environment.appapiConfig.apiUrl
    currentUser : any = this.authFackservice.currentUserValue;
    constructor(private http: HttpClient, private router: Router,  private authFackservice: AuthfakeauthenticationService) {

    }
   
    createTicketAsync(formItem:any):Observable<any>{          
        let body = JSON.stringify(formItem);     
        return this.http.post(this.ApiUrl + '/SupportTicket/CreateTicketAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getSupportTicketByUserId(filters:number, pageSize:number, pageNo:number):Observable<any>{
        return this.http.get(this.ApiUrl + '/SupportTicket/GetSupportTicketByUserId?filters=' + filters + '&pageSize=' + pageSize + '&pageNo=' + pageNo,  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    updateTicketAsync(formItem:any):Observable<any>{
        return this.http.post(this.ApiUrl + '/SupportTicket/UpdateTicketAsync',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getAllSupportTicket():Observable<any>{
        return this.http.get(this.ApiUrl + '/SupportTicket/GetAllSupportTicket',  
            {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
}
