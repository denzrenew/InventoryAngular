import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthfakeauthenticationService } from './authfake.service';
import { environment } from 'src/environments/environment';
import { Observable, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { UserProfileService } from './user.service';
import { ApiResponse } from '../models/api-response.model';
import Endpoints from 'src/app/shared/endpoints';
import SearchModel from '../models/search.model';
import ContractResponseModel from '../models/contract/contract.response.model';

@Injectable({ providedIn: 'root' })
export class ContractService {
    readonly ApiUrl = environment.appapiConfig.apiUrl
    currentUser : any = this.authFackservice.currentUserValue;
    headers: HttpHeaders;
    constructor(private http: HttpClient, private router: Router, 
      private authFackservice: AuthfakeauthenticationService,
      private userSerivce:UserProfileService) {
        this.headers = new HttpHeaders({
          'Content-Type': 'application/json' , 
          'Authorization': `Bearer ${this.currentUser.access_token}`
        });
    }

    getContractInfo():Observable<any>{

      console.log(this.currentUser.access_token)
      return this.http.get(this.ApiUrl + '/Contract/GetContractByUserId',  
                              {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }

    getWalletInfo():Observable<any>{
      return this.http.get(this.ApiUrl + '/MainWallet/GetMainWalletByUserId',  
                              {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
    getContractPDF():Observable<any>{
      return this.http.get(this.ApiUrl + '/Contract/GetSubscriptionContract',  
                              {headers : new HttpHeaders({'Authorization': `Bearer ${this.currentUser.access_token}`})})
    }
    addContract(formItem:any):Observable<any>{

        let body = JSON.stringify(formItem);
        return this.http.post( this.ApiUrl + '/Contract/CreateContractAsync', body,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
        'Authorization': `Bearer ${this.currentUser.access_token}`})})

    }

    updateContract(amount:number):Observable<any>{
      return this.http.post( this.ApiUrl + '/Contract/UpgradeContractAsync', amount,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
      'Authorization': `Bearer ${this.currentUser.access_token}`})})

    }

    renewContract(amount:number):Observable<any>{
      return this.http.post( this.ApiUrl + '/Contract/RenewContractAsync', amount,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
      'Authorization': `Bearer ${this.currentUser.access_token}`})})

    }

    updateContractRenewal(amount:boolean):Observable<any>{
      return this.http.post( this.ApiUrl + '/Contract/UpdateContractAutoRenewal', amount,{headers : new HttpHeaders({'Content-Type': 'application/json' , 
      'Authorization': `Bearer ${this.currentUser.access_token}`})})

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
     * Retrieves the contract by user id with the method `GET` and endpoint `/api/Contract/GetContractByUserId`
     * @param onSuccess 
     * @param onError 
     * @param onComplete 
     * @param userId 
     */
    getContractByUserId(
      onSuccess: (response: ApiResponse<ContractResponseModel[]>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void,
      userId?: number
    ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.Contract.GetContractByUserId.GET}${userId ? `?userId=${userId}` : ''}`;

      this.http.get<ApiResponse<ContractResponseModel[]>>(apiUrl, { headers: this.headers })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
    }

    /**
     * Updates the subscription to premiere account
     * @param onSuccess 
     * @param onError 
     * @param onComplete 
     * @param isTransferred 
     */
    updatePremiereAccount(
      onSuccess: (response: ApiResponse<any>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void
      ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.Account.UpdatePremiere.POST}`;

      this.http.post<ApiResponse<any>>(apiUrl, { /* NO DATA NEEDED */}, { headers: this.headers })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
    }

    /**
     * Updates the subscription to premiere account
     * @param onSuccess 
     * @param onError 
     * @param onComplete 
     * @param isTransferred 
     */
     getContractInfo2(
      onSuccess: (response: ApiResponse<any>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void
      ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.Contract.GetContractByUserId.GET}`;

      this.http.get<ApiResponse<any>>(apiUrl, { headers: this.headers })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
    }

    /**
     * Create a GET request to the endpoint /api/Contract/GetPercentAccumulation
     * @param onSuccess 
     * @param onError 
     * @param onComplete 
     * @param isTransferred 
     */
    getPercentAccumulation(
      onSuccess: (response: ApiResponse<string>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void
      ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.Contract.GetPercentAccumulation.GET}`;

      this.http.get<ApiResponse<string>>(apiUrl, { headers: this.headers })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
    }

    /**
     * Create a GET request to the endpoint /api/Contract/GetTotalAccumulatedReward
     * @param onSuccess 
     * @param onError 
     * @param onComplete 
     * @param isTransferred 
     */
    getTotalAccumulatedReward(
      onSuccess: (response: ApiResponse<number>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void
      ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.Contract.GetTotalAccumulatedReward.GET}`;

      this.http.get<ApiResponse<number>>(apiUrl, { headers: this.headers })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
    }

    /**
     * Create a GET request to the endpoint /api/Contract/GetAllExpiringContract
     * @param onSuccess 
     * @param onError 
     * @param onComplete 
     * @param isTransferred 
     */
    getAllExpiringContract(
      onSuccess: (response: ApiResponse<number>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void,
      data: SearchModel = {
        filters: '',
        pageSize: 200,
        pageNo: 1
      }
      ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.Contract.GetAllExpiringContract.GET}?$${this.querify(data)}`;

      this.http.get<ApiResponse<number>>(apiUrl, { headers: this.headers })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
    }

  /**
   * Creates a `POST` request to the endpoint `/api/Contract/CreateContractAsync`
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  createContractAsync(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void, 
    onComplete: () => void,
    data: {
      amount: number,
      isAutoRenew: boolean,
      userId: number,
    }
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Contract.CreateContractAsync.POST}`;

    this.http.post<ApiResponse<null>>(apiUrl, data, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}
