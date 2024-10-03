import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from 'src/app/pages/dashboards/default/interfaces/response.interface';
import Endpoints from 'src/app/shared/endpoints';
import { AuthfakeauthenticationService } from './authfake.service';
import AuthModel from '../models/account/auth.model';
import jwt_decode from 'jwt-decode';
import { User } from '../models/auth.models';
import { BanksService } from './banks.service';

const KYC_STATUS = {
  COMPLETE: "Complete",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  INCOMPLETE: "Incomplete"
};

@Injectable({ providedIn: 'root' })
/**
 * Contains the api services under the GROUP endpoint
 */
export class AuthService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;
  private accessTokenData: AuthModel;
  private authUserDetails: AuthModel;

  constructor(private httpClient: HttpClient,
    private authService: AuthfakeauthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private banksService: BanksService) {


    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;

    if (this.currentUser !== null) {
      this.headers = new HttpHeaders({
        "Authorization": `Bearer ${this.currentUser.access_token}`,
      });

      const tempHolder: any = this.authFackservice.currentUserValue;
      this.accessTokenData = jwt_decode(tempHolder.access_token);
      this.authUserDetails = tempHolder;
      console.log("INITIALIZED AUTH2SERVICE");
    } else {
      console.log("SHOW LOGIN PAGE");
    }

  }

  getAccessTokenData(): AuthModel {
    return this.accessTokenData;
  }

  getAuthUserDetails(): AuthModel {
    return this.authUserDetails;
  }

  resetUserDetails(newUser: User): void {
    console.log('Test value')
    const tempHolder: any = this.authFackservice.currentUserValue;
    this.accessTokenData = jwt_decode(tempHolder.access_token);
    console.log('Test goods')
    this.authUserDetails = tempHolder;
  }

  async isKYCComplete(): Promise<boolean> {
    const { primaryComment, primaryIdentification, secondaryComment, secondaryIdentification, } = this.authUserDetails;
    const { role } = this.accessTokenData;


    const isApproved = primaryIdentification === KYC_STATUS.APPROVED && secondaryIdentification === KYC_STATUS.APPROVED;
    const isCompleted = primaryIdentification === KYC_STATUS.COMPLETE && secondaryIdentification === KYC_STATUS.COMPLETE;
    const bankDetails = await this.banksService.getBanksByUserIdAsync();

    if(role === "Administrator") return true;

    return (isCompleted || isApproved) && bankDetails.length > 0;
  }

  /**
   * Creates a POST request to the endpoint, "/api/Auth/OneTimePassword"
   * @param onSuccess
   * @param onError
   * @param onComplete
   * @param emailAddress
   */
   oneTimePassword(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    emailAddress: string
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Auth.OneTimePassword.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, { emailAddress }, { })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a POST request to the endpoint, "/api/Auth/ChangePassword"
   * @param onSuccess
   * @param onError
   * @param onComplete
   * @param emailAddress
   */
  ChangePassword(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    data: {
      emailAddress: string,
      newPassword: string,
      confirmPassword: string
    }
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Auth.ChangePassword.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data,  { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
  private getHeaders(): HttpHeaders {
    const service = this.authService.currentUserValue;
    if(!service.access_token) {

      this.authService.logout();
    }

    return new HttpHeaders({
      "Authorization": `Bearer ${service.access_token}`
    });
  }
}
