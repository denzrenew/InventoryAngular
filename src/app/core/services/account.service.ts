import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, finalize } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from 'src/app/pages/dashboards/default/interfaces/response.interface';
import Endpoints from 'src/app/shared/endpoints';
import UpdateUser from '../models/account/update-user.model';
import UserProfileModel from '../models/account/user-profile.model';
import UpdatePassword from '../models/account/update-password.model';
import FilterModel from '../models/account/filter.model';
import AllUserModel from '../models/account/all-user.model';
import { AuthfakeauthenticationService } from './authfake.service';

@Injectable({ providedIn: 'root' })
/**
 * Contains the api services under the GROUP endpoint
 */
export class AccountService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;
  http: any;


  constructor(private httpClient: HttpClient, 
    private authService: AuthfakeauthenticationService) {
  }

  private asFormData(json: any): FormData {
    const formData = new FormData();
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        formData.append(key, json[key]);
      }
    }
    return formData;
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
   * Creates a GET request to the endpoint, "/api/Account/ViewUserProfile"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   viewUserProfile(
    onSuccess: (response: ApiResponse<UserProfileModel>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId?: number
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Account.ViewUserProfile.GET}${userId ? "?userId=" + userId : ''}`;
    
    this.httpClient.get<ApiResponse<UserProfileModel>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a POST request to the endpoint, "/api/Account/ViewUserProfile"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  updateProfile(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: UpdateUser | FormData,
    isMultipart: boolean = false
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Account.UpdateProfile.POST}`;
    if(isMultipart) {
      data = this.asFormData(data);
    }

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

    /**
   * Creates a POST request to the endpoint, "/api/Account/ViewUserProfile"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
    updateProfileWithAttachment(
      onSuccess: (response: ApiResponse<null>) => void, 
      onError: (error: any) => void, 
      onComplete: () => void,
      data: UpdateUser | FormData,
      isMultipart: boolean = false,
      attachBlob:Blob,
      attachmentName:string

    ): void {
      const apiUrl = `${this.ApiUrl}${Endpoints.Account.UpdateProfile.POST}`;
      console.log(data)
      if(isMultipart) {
        data = this.asFormData(data);
        if (attachmentName !== '')
          data.append("attachment", attachBlob, attachmentName);
      }
  
      this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
        .pipe(finalize(onComplete))
        .subscribe({ next: onSuccess, error: onError });
    }

  /**
   * Creates a POST request to the endpoint, "/api/Account/UpdateReferralCode"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   updateReferralCode(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    value: string
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Account.UpdateReferralCode.POST}`;
    
    this.httpClient.post<ApiResponse<null>>(apiUrl, { referralCode: value }, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a POST request to the endpoint, "/api/Account/UpdatePassword"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   updatePassword(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: UpdatePassword
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Account.UpdatePassword.POST}`;
    
    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a POST request to the endpoint, "/api/Account/UpdatePassword"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  updatePasswordByUserId(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId: number,
    data: UpdatePassword
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Account.UpdatePassword.POST}`;
    
    this.httpClient.post<ApiResponse<null>>(apiUrl, { ...data, userId }, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Create a GET request to the endpoint "/api/Account/GetAllUsers"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  getAllUsers(
    onSuccess: (response: ApiResponse<AllUserModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    filters: FilterModel = {},
    pageSize: number = 10,
    pageNo: number = 1
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Account.GetAllUsers.GET}?filters={}&pageSize=${pageSize}&pageNo=${pageNo}`;

    this.httpClient.get<ApiResponse<AllUserModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  getProfileImage(payload: FormData, userId?: number): Observable<any>{    
    let url = this.ApiUrl + '/Account/ViewProfilePicture';

    if(userId) {
      url += "?userId=" + userId;
    }

    return this.httpClient.post(url, payload , {
      responseType: 'blob',
      observe: 'response',
      headers: this.getHeaders()
    });
  }

  getImageByReferalCode(referralcode: string): Observable<any>{
    let url = this.ApiUrl + '/Account/ViewProfilePictureByCompositeId';
    if(referralcode) {
      url += "?referralCode=" + referralcode;
    }
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}