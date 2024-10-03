import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthfakeauthenticationService } from './authfake.service';
import { environment } from 'src/environments/environment';
import { Observable, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from '../models/api-response.model';
import Endpoints from 'src/app/shared/endpoints';
import Matrix from '../models/group/matrix.model';

@Injectable({ providedIn: 'root' })
export class MatrixService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;
  
  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;
    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.currentUser.access_token}`,
    });
  }

  /**
   * Creates a GET request to the endpoint, "/api/Group/GetAccountGroupMatrix"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   getAccountGroupMatrix(
    onSuccess: (response: ApiResponse<Matrix[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetAccountGroupMatrix.GET}?level=9999`;
      
    this.httpClient.get<ApiResponse<Matrix[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a GET request to the endpoint, "/api/Group/GetGroupMatrix"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   getGroupMatrix(
    onSuccess: (response: ApiResponse<Matrix[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId: number,
    level: number = 3
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetGroupMatrix.GET}?userId=${userId}&level=${level}`;
      
    this.httpClient.get<ApiResponse<Matrix[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a POST request to the endpoint, "/api/Group/AllocateMember"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  allocateMember(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: {
      childUserId: number,
      parentUserId: number,
      placementSide: number
    }
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.AllocateMember.POST}`;
      
    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
   
  createWithdrawal(formItem:any):Observable<any>{          
    let body = JSON.stringify(formItem);
    return this.httpClient.post(this.ApiUrl + '/Withdrawal/CreateWithdrawalAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
    'Authorization': `Bearer ${this.currentUser.access_token}`})})
  }

  getMatrixByUserId(userId:string):Observable<any>{
    return this.httpClient.get(this.ApiUrl + '/Group/GetGroupMatrix?userId=' + userId + '&level=3',  
      {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
  }

  getMatrix():Observable<any>{
    return this.httpClient.get(this.ApiUrl + '/Group/GetAccountGroupMatrix?level=2',  
      {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
  }
    
}