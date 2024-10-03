import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from 'src/app/pages/dashboards/default/interfaces/response.interface';
import Endpoints from 'src/app/shared/endpoints';
import QueryModel from '../models/reports/query.model';
import ContractModel from '../models/reports/contract.model';
import MainWalletModel from '../models/reports/main-wallet.model';
import DepositModel from '../models/reports/deposit.model';
import WithdrawalModel from '../models/reports/withdrawal.model';

@Injectable({ providedIn: 'root' })
/**
 * Contains the api services under the GROUP endpoint
 */
export class ReportsService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;
  defaultQueryData: QueryModel = {
    filters: {},
    pageNo: 1,
    pageSize: 15
  }

  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;
    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.currentUser.access_token}`,
      "Content-Type": "application/json"
    });
  }

  getDefaultData(type: string): string {
    let endpoint = '';

    switch(type) {
      case "contract":
        endpoint = `${Endpoints.Contract.GetAllContract.GET}${this.querify(this.defaultQueryData)}`;
        break;
      case "main-wallet":
        endpoint = `${Endpoints.MainWallet.GetAllMainWallet.GET}${this.querify(this.defaultQueryData)}`;
        break;
      case "deposit":
        endpoint = `${Endpoints.Deposit.GetAllDeposit.GET}${this.querify(this.defaultQueryData)}`;
        break;
      case "withdrawal":
        endpoint = `${Endpoints.Withdrawal.GetAllWithdrawal.GET}${this.querify(this.defaultQueryData)}`;
        break;
      default:
        break;
    }

    return endpoint;
  }

  querify(obj: object): string {
    const params = new HttpParams();

    for(const key in obj) {
      if(obj.hasOwnProperty(key)) {
        if(typeof obj[key] === 'object') {
          params.set(key, this.querify(obj[key]));
        } else {
          params.set(key, obj[key]);
        }
      }
    }
    
    return params.toString();
  }

  /**
   * Retrieves all the contracts from /Contracts/GetAllContract
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  getAllContracts(
    onSuccess: (response: ApiResponse<ContractModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: QueryModel = this.defaultQueryData
  ): void {
    if(typeof data.filters === 'object') {
        data.filters = JSON.stringify(data.filters);
    }

    const apiUrl = `${this.ApiUrl}${Endpoints.Contract.GetAllContract.GET}${this.querify(data)}`;

    this.httpClient.get<ApiResponse<ContractModel[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves all the MainWallet from /MainWallet/GetAllMainWallet
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  getAllMainWallets(
    onSuccess: (response: ApiResponse<MainWalletModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: QueryModel = this.defaultQueryData
  ): void {
    if(typeof data.filters === 'object') {
        data.filters = JSON.stringify(data.filters);
    }

    const apiUrl = `${this.ApiUrl}${Endpoints.MainWallet.GetAllMainWallet.GET}${this.querify(data)}`;

    this.httpClient.get<ApiResponse<MainWalletModel[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves all the MainWallet from /Deposit/GetAllDeposit
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   getAllDeposits(
    onSuccess: (response: ApiResponse<DepositModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: QueryModel = this.defaultQueryData
  ): void {
    if(typeof data.filters === 'object') {
        data.filters = JSON.stringify(data.filters);
    }

    const apiUrl = `${this.ApiUrl}${Endpoints.Deposit.GetAllDeposit.GET}${this.querify(data)}`;

    this.httpClient.get<ApiResponse<DepositModel[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves all the MainWallet from /Withdrawal/GetAllWithdrawal
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   getAllWithdrawals(
    onSuccess: (response: ApiResponse<WithdrawalModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: QueryModel = this.defaultQueryData
  ): void {
    if(typeof data.filters === 'object') {
        data.filters = JSON.stringify(data.filters);
    }

    const apiUrl = `${this.ApiUrl}${Endpoints.Withdrawal.GetAllWithdrawal.GET}${this.querify(data)}`;

    this.httpClient.get<ApiResponse<WithdrawalModel[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}