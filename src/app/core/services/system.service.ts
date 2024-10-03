import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { AuthfakeauthenticationService } from './authfake.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

readonly ApiUrl = environment.appapiConfig.apiUrl

currentUser : any = this.authFackservice.currentUserValue;
readonly token:any = this.currentUser.access_token;
  constructor(private http:HttpClient, private router: Router, private authFackservice: AuthfakeauthenticationService) {

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

getGenericList(apiURL:string, pageNumber:number,sortBy:string, sortOrder:string, filters:any, isTransferred:boolean ):Observable<any>{
  let queryParams = new HttpParams();
  //queryParams = queryParams.append("SortBy",sortBy);
  //queryParams = queryParams.append("SortOrder",sortOrder);
  queryParams = queryParams.append("isTransferred",isTransferred);
  queryParams = queryParams.append("pageSize",environment.pageSzie);
  queryParams = queryParams.append("pageNo",pageNumber);
  queryParams = queryParams.append("filters", JSON.stringify(filters));
  return this.http.get(apiURL, {params:queryParams ,headers : new HttpHeaders({
  'Authorization': `Bearer ${this.token}`})})
  }  

  getTotalAmount(apiURL:string, isTransferred:boolean ):Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("isTransferred",isTransferred);
    return this.http.get(apiURL, {params:queryParams ,headers : new HttpHeaders({
    'Authorization': `Bearer ${this.token}`})})
    }  
  
  transferBonusCheck(transferCheckUrl:string, id:number):Observable<any>{
    return this.http.post( this.ApiUrl +  transferCheckUrl, id,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
    'Authorization': `Bearer ${this.currentUser.access_token}`})})

  }
  transferBonus(transferUrl:string, id:number):Observable<any>{
    let payload = {
      monthlyId : id
    }
    return this.http.post( this.ApiUrl +  transferUrl, payload,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
    'Authorization': `Bearer ${this.currentUser.access_token}`})})

  }
}


