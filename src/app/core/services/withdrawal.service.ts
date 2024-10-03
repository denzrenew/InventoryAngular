import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from 'src/app/pages/dashboards/default/interfaces/response.interface';
import Endpoints from 'src/app/shared/endpoints';
import AdminWithdrawalModel from '../models/withdrawal/admin-withdrawal.model';

@Injectable({ providedIn: 'root' })
export class WithdrawalService {
  readonly ApiUrl = environment.appapiConfig.apiUrl;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;

  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;
    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.currentUser.access_token}`,
    });
  }

  /**
   * Creates a withdrawal request to the server using POST `/api/Withdrawal/CreateWithdrawalAdministratorAsync` endpoint
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  createWithdrawalAdministratorAsync(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    data: AdminWithdrawalModel
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Withdrawal.CreateWithdrawalAdministratorAsync.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}