import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, finalize, forkJoin } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from 'src/app/pages/dashboards/default/interfaces/response.interface';
import Endpoints from 'src/app/shared/endpoints';
import { MainWallet } from '../models/main-wallet.model';
import ConsolidatedWalletModel from '../models/wallets/consolidated-wallet.model';
import { AuthfakeauthenticationService } from './authfake.service';

@Injectable({ providedIn: 'root' })
export class WalletsService {
  readonly ApiUrl = environment.appapiConfig.apiUrl;

  headers: HttpHeaders;
  currentUser: LoginResponse;
  http: any;

  constructor(private httpClient: HttpClient, 
    private authService: AuthfakeauthenticationService) 
  {
  }

  private getHeaders(): HttpHeaders {
    const service = this.authService.currentUserValue;
    if(!service.access_token) {
      console.log("User not authenticated");
      this.authService.logout();
    }

    return new HttpHeaders({
      "Authorization": `Bearer ${service.access_token}`
    });
  }

  /**
   * Retrieves the Direct Wallet amount from the Server
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param isTransferred 
   */
  getDirectWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
    const apiUrl = `${this.ApiUrl}${"/MainWallet/GetDirectWalletAmount"}?isTransferred=${isTransferred ? "true" : "false"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  getUnilevelWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
    const apiUrl = `${this.ApiUrl}${"/MainWallet/GetUnileveWalletAmount"}?isTransferred=${isTransferred ? "true" : "false"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  getProfitWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
    const apiUrl = `${this.ApiUrl}${"/MainWallet/GetProfit"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  getGoldWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
    const apiUrl = `${this.ApiUrl}${"/MainWallet/GetGoldWalletAmount"}?isTransferred=${isTransferred ? "true" : "false"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
  getDiamondWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
    const apiUrl = `${this.ApiUrl}${"/MainWallet/GetDiamondWalletAmount"}?isTransferred=${isTransferred ? "true" : "false"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
  getPlatinumWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
    const apiUrl = `${this.ApiUrl}${"/MainWallet/GetPlatinumWalletAmount"}?isTransferred=${isTransferred ? "true" : "false"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
  /**
   * Retrieves the Group Wallet amount from the Server
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param isTransferred 
   */
   getConsolidateWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
      
    const apiUrl = `${this.ApiUrl}${Endpoints.MainWallet.GetConsolidatedWalletAmount.GET}?isTransferred=${isTransferred ? "true" : "false"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the Monthly Wallet amount from the Server
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param isTransferred 
   */
   getMonthlyWalletAmount(
    onSuccess: (response: ApiResponse<number>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    isTransferred: boolean = true
    ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.MainWallet.GetMonthlyWalletAmount.GET}?isTransferred=${isTransferred ? "true" : "false"}`;

    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the Main Wallet amount from the Server
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param isTransferred 
   */
  getMainWalletByUserId(
    onSuccess: (response: ApiResponse<MainWallet[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId?: number
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.MainWallet.GetMainWalletByUserId.GET}${userId ? `?userId=${userId}` : ""}`;

    this.httpClient.get<ApiResponse<MainWallet[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves all the wallet details both transffered and untransferred
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  getAllWalletsBalance(
    onSuccess: (response: ApiResponse<number[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {;
    const directT = this.httpClient.get<ApiResponse<number>>(`${this.ApiUrl}${Endpoints.MainWallet.GetDirectWalletAmount.GET}?isTransferred=true`, { headers: this.getHeaders() });
    const directU = this.httpClient.get<ApiResponse<number>>(`${this.ApiUrl}${Endpoints.MainWallet.GetDirectWalletAmount.GET}?isTransferred=false`, { headers: this.getHeaders() });

    const monthlyT = this.httpClient.get<ApiResponse<number>>(`${this.ApiUrl}${Endpoints.MainWallet.GetMonthlyWalletAmount.GET}?isTransferred=true`, { headers: this.getHeaders() });
    const monthlyU = this.httpClient.get<ApiResponse<number>>(`${this.ApiUrl}${Endpoints.MainWallet.GetMonthlyWalletAmount.GET}?isTransferred=false`, { headers: this.getHeaders() });

    const consolidateT = this.httpClient.get<ApiResponse<number>>(`${this.ApiUrl}${Endpoints.MainWallet.GetConsolidatedWalletAmount.GET}?isTransferred=true`, { headers: this.getHeaders() });
    const consolidateU = this.httpClient.get<ApiResponse<number>>(`${this.ApiUrl}${Endpoints.MainWallet.GetConsolidatedWalletAmount.GET}?isTransferred=false`, { headers: this.getHeaders() });

    const requests = forkJoin([ directT, directU, monthlyT, monthlyU, consolidateT, consolidateU ]);

    const next = (response: [ ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ]) => {
      const { [0]: tDirect, [1]: uDirect, [2]: tMonthly, [3]: uMonthly, [4]: tConsolidate, [5]: uConsolidate } = response;

      const data = [ (tDirect.data + uDirect.data), (tMonthly.data + uMonthly.data), (tConsolidate.data + uConsolidate.data)];

      onSuccess({
        status: 'success',
        data
      });
    };

    requests.subscribe({ next, error: onError, complete: onComplete });
  }

  /**
   * Retrieves the list of `TRANSFERRED` consolidated wallet data in the endpoint: `/api/ConsolidatedMonthly/GetConsolidationMonthlyRewardByUserId`
   * @param onSuccess - Returns the response with the data as callback
   * @param onError - Returns the error object as a callback
   * @param onComplete - Triggered after the end of the request as a callback 
   * @param pageSize - number of data to retrieve
   * @param pageNo - number of the page
   * @param filters - filter the table as an JSON object or string
   */
  getTransferredConsolidationMonthlyRewardByUserId(
    onSuccess: (response: ApiResponse<ConsolidatedWalletModel[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    pageSize: number = 10,
    pageNo: number = 1,
    filters: object | string = ""
  ): void {
    const filter = typeof filters === 'object'
      ? JSON.stringify(filters)
      : filters;

    const apiUrl = `${this.ApiUrl}/ConsolidatedMonthly/GetConsolidationMonthlyRewardByUserId?isTransferred=true&pageNo=${pageNo}&pageSize=${pageSize}&filters=${filter}`;

    this.httpClient.get<ApiResponse<ConsolidatedWalletModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the list of `UNTRANSFERRED` consolidated wallet data in the endpoint: `/api/ConsolidatedMonthly/GetConsolidationMonthlyRewardByUserId`
   * @param onSuccess - Returns the response with the data as callback
   * @param onError - Returns the error object as a callback
   * @param onComplete - Triggered after the end of the request as a callback 
   * @param pageSize - number of data to retrieve
   * @param pageNo - number of the page
   * @param filters - filter the table as an JSON object or string
   */
  getUntransferredConsolidationMonthlyRewardByUserId(
    onSuccess: (response: ApiResponse<ConsolidatedWalletModel[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    pageSize: number = 10,
    pageNo: number = 1,
    filters: object | string = ""
  ): void {
    const filter = typeof filters === 'object'
      ? JSON.stringify(filters)
      : filters;

    const apiUrl = `${this.ApiUrl}/ConsolidatedMonthly/GetConsolidationMonthlyRewardByUserId?isTransferred=false&pageNo=${pageNo}&pageSize=${pageSize}&filters=${filter}`;

    this.httpClient.get<ApiResponse<ConsolidatedWalletModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Requests for a `Transfer All` to a specific wallet `Monthly Bonus` wallet
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param url 
   * @param category 
   */
  transferAllMonthlyByCategory(
    onSuccess: (response: ApiResponse<any>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    url: string,
    category: string
  ): void {
    const apiUrl = `${this.ApiUrl}${url}`;
    const body = { category };

    this.httpClient.post<ApiResponse<any>>(apiUrl, body, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Requests for a `Transfer All` to a specific wallet `Direct Bonus` wallet
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param url 
   */
  transferAllDirectBonus(
    onSuccess: (response: ApiResponse<any>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    url: string
  ): void {
    const apiUrl = `${this.ApiUrl}${url}`;

    this.httpClient.post<ApiResponse<any>>(apiUrl, null, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}