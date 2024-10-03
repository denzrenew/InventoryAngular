import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

import Endpoints from 'src/app/shared/endpoints';
import { DirectBonus } from '../models/direct-bonus/direct-bonus.model';
import { ApiResponse } from '../models/api-response.model';
import { AuthfakeauthenticationService } from './authfake.service';
import UserProfileModel from '../models/account/user-profile.model';

@Injectable({ providedIn: 'root' })
export class DirectBonusService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;

  constructor(private httpClient: HttpClient,     
    private authService2: AuthfakeauthenticationService,) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;
    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.currentUser.access_token}`
    });
  }

  private querify(obj: object): string {
    const params = new URLSearchParams();

    for(const key in obj) {
      if(obj.hasOwnProperty(key)) {
        params.set(key, obj[key]);
      }
    }

    return params.toString();
  }

  /**
   * Creates a GET request to the endpoint, "/api/DirectBonus/GetDirectBonusByUserId"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  getDirectBonusByUserId(
    onSuccess: (response: ApiResponse<DirectBonus[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    data: {
      filters: string,
      pageSize: number,
      pageNo: number,
      isTransferred: boolean
    } = {
      filters: "{'firstname':'','lastname':'','email':''}",
      pageSize: 100,
      pageNo: 1,
      isTransferred: false
    }
    ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.DirectBonus.GetDirectBonusByUserId.GET}?${this.querify(data)}`;
    
    this.httpClient.get<ApiResponse<DirectBonus[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

    /**
   * Creates a GET request to the endpoint, "/api/DirectBonus/GetDirectReferalByUserId"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
    getDirectReferalByUserId(
      onSuccess: (response: ApiResponse<DirectBonus[]>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void
      ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.DirectBonus.GetDirectReferalByUserId.GET}?pageSize=100&pageNo=1&filters={}`;

      this.httpClient.get<ApiResponse<DirectBonus[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
     
    }

      /**
   * Creates a GET request to the endpoint, "/api/DirectBonus/GetDirectReferalByUserId"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
      getDirectReferalByUserIdWithId(
        userId: number,
        onSuccess: (response: ApiResponse<DirectBonus[]>) => void, 
        onError: (error: any) => void, 
        onComplete: () => void
        ): void {
        const apiUrl = `${this.ApiUrl}${Endpoints.DirectBonus.GetDirectReferalByUserId.GET}?userId=${userId}&pageSize=100&pageNo=1&filters={}`;
  
        this.httpClient.get<ApiResponse<DirectBonus[]>>(apiUrl, { headers: this.getHeaders() })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
       
      }
  

  /**
   * Creates a GET request to the endpoint, "/api/DirectBonus/GetTotalDirectBonusByDegreeAndUserId"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  getTotalDirectBonusByDegreeAndUserId(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.DirectBonus.GetTotalDirectBonusByDegreeAndUserId.GET}`;
    
    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  private getHeaders(): HttpHeaders {
    const service = this.authService2.currentUserValue;
    if(!service.access_token) {
      console.log("User not authenticated");
      this.authService2.logout();
    }

    return new HttpHeaders({
      "Authorization": `Bearer ${service.access_token}`
    });
  }
}