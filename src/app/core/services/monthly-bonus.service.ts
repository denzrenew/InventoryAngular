import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, finalize, forkJoin } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';

import Endpoints from 'src/app/shared/endpoints';
import MonthlyBonusResponseModel from '../models/monthly-bonuses/monthly-bonus.response.model';
import { ApiResponse } from '../models/api-response.model';
import TransferToMainWalletModel from '../models/monthly-bonuses/transfer-to-main-wallet.model';

@Injectable({ providedIn: 'root' })
export class MonthlyBonusService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;

  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;
    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.currentUser.access_token}`,
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
   * Creates a GET request to the endpoint, "/api/MonthlyBonus/GetTotalDirectBonusByDegreeAndUserId"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   getTotalMonthlyBonusByDegreeAndUserId(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.MonthlyBonus.GetTotalMonthlyBonusByDegreeAndUserId.GET}`;
    
    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
  
  /**
   * Creates a `GET` request to the endpoint, "/api/MonthlyBonus/GetAllMonthlyReward"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  getAllMonthlyReward(
    onSuccess: (response: ApiResponse<MonthlyBonusResponseModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    pageSize: number = 10,
    pageNo: number = 1,
    filters?: object | string
  ): void {
    const filter = typeof filters === 'object'
      ? JSON.stringify(filters)
      : filters;
    const apiUrl = `${this.ApiUrl}${Endpoints.MonthlyBonus.GetAllMonthlyReward.GET}?pageNo=${pageNo}&pageSize=${pageSize}&filters=${filter}`;

    this.httpClient.get<ApiResponse<MonthlyBonusResponseModel[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  transferToMainWallet(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    payloads: TransferToMainWalletModel[],
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.MonthlyBonus.TransferToMainWallet.POST}`;

    if(Array.isArray(payloads)) {
      const request = (payload: TransferToMainWalletModel): Observable<ApiResponse<null>> => {
        return this.httpClient.post<ApiResponse<null>>(`${apiUrl}`, { monthlyId: payload.monthlyId, userId: payload.userId }, { headers: this.headers });
      }

      const apiRequests = payloads.map(payload => request(payload));

      const next = (responses: ApiResponse<null>[]) => {
        const failed = responses.filter(response => response.status !== 'success');

        onSuccess({ status: failed.length > 0 ? 'failed' : 'success', data: null });
      }

      forkJoin(apiRequests)
        .subscribe({ next, error: onError, complete: onComplete });
    } else {

    }
  }
}