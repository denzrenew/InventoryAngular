import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { finalize, lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/pages/dashboards/default/interfaces/response.interface';
import Endpoints from 'src/app/shared/endpoints';
import { AuthfakeauthenticationService } from './authfake.service';
import BankOptions from '../models/bank/bank.model';
import DepositAccountModel from '../models/bank/deposit-account.model';
import NewBankPayload from '../models/bank/new-bank-payload.model';
import UpdateBankPayload from '../models/bank/update-bank-payload.model';
import BankDetailsModel from '../models/bank/bank-details.model';

@Injectable({ providedIn: 'root' })
/**
 * Contains the api services under the GROUP endpoint
 */
export class BanksService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

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
   * Retrieves the bank details by UserId from the Endpoint `/api/Bank/GetBankByUserId`
   * @param onSuccess
   * @param onError
   * @param onComplete
   * @param userId
   * @param pageSize
   * @param pageNo
   */
  getBankByUserId(
    onSuccess: (response: ApiResponse<BankOptions[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    userId: number,
    pageSize: number = 20,
    pageNo: number = 1
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.GetBankByUserId.GET}?userId=${userId}&filters={}&pageSize=${pageSize}&pageNo=${pageNo}`;

    this.httpClient.get<ApiResponse<BankOptions[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the bank details by UserId from the Endpoint `/api/Bank/GetBankByUserId`
   * @param onSuccess
   * @param onError
   * @param onComplete
   * @param pageSize
   * @param pageNo
   */
  getBanksByUserId(
    onSuccess: (response: ApiResponse<BankDetailsModel[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    pageSize: number = 10,
    pageNo: number = 1
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.GetBankByUserId.GET}?userId=0&filters={}&pageSize=${pageSize}&pageNo=${pageNo}`;

    this.httpClient.get<ApiResponse<BankDetailsModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  async getBanksByUserIdAsync(pageSize: number = 10, pageNo: number = 1): Promise<BankDetailsModel[]> {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.GetBankByUserId.GET}?userId=0&filters={}&pageSize=${pageSize}&pageNo=${pageNo}`;

    const request = this.httpClient.get<ApiResponse<BankDetailsModel[]>>(apiUrl, { headers: this.getHeaders() });

    const result = await lastValueFrom(request);

    return result.data;
  }

  /**
   * Creates a `GET` request to the endpoint `/api/Bank/GetDepositAccount`
   * @param onSuccess
   * @param onError
   * @param onComplete
   */
  getDepositAccount(
    onSuccess: (response: ApiResponse<DepositAccountModel[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
  ): void {
    const apiUrl = `${this.ApiUrl}${'/CompanyBank/GetAllAsync'}`;

    this.httpClient.get<ApiResponse<DepositAccountModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a `GET` request to the endpoint `/api/Bank/GetAccountType`
   * @param onSuccess
   * @param onError
   * @param onComplete
   */
  getBankTypes(
    onSuccess: (response: ApiResponse<string[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.GetAccountType.GET}`;

    this.httpClient.get<ApiResponse<string[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a `POST` request to the endpoint `/api/Bank/CreateBankAsync`
   * @param onSuccess
   * @param onError
   * @param onComplete
   * @param data
   */
  createBankAsync(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    data: NewBankPayload
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.CreateBankAsync.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  createBankAsyncNoOtp(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    data: NewBankPayload
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.CreateNoOtpBankAsync.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a `POST` request to the endpoint `/api/Bank/CreateBankAsync`
   * @param onSuccess
   * @param onError
   * @param onComplete
   * @param data
   */
  updateBankAsync(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    data: UpdateBankPayload
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.UpdateBankAsync.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a `GET` request to the endpoint `/api/Bank/GenerateBankOtpAsync`
   * @param onSuccess
   * @param onError
   * @param onComplete
   */
  requestOTP(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Bank.GenerateBankOtpAsync.GET}`;

    this.httpClient.get<ApiResponse<null>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}
