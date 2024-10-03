import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, finalize, forkJoin } from 'rxjs';

import Endpoints from 'src/app/shared/endpoints';
import { ApiResponse } from '../models/api-response.model';
import KycInitialData, { PrimaryVerificationModel, SecondaryVerificationModel } from '../models/kyc/kyc-initial-data.model';
import { AuthfakeauthenticationService } from './authfake.service';
import KycUserModel from '../models/kyc/kyc-user.model';
import KycUpdatePayload from '../models/kyc/kyc-update-payload.model';

@Injectable({ providedIn: 'root' })
export class KycService {
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
   * Retrieves the Primary Identification
   * @param userId 
   * @returns 
   */
  getPrimaryIdentificationByUserId(userId?: number): Observable<ApiResponse<PrimaryVerificationModel>> {
    const apiUrl = `${this.ApiUrl}${Endpoints.PrimaryIdentification.GetPrimaryIdentificationByUserId.GET}${userId ? "?userId=" + userId : "" }`;
    
    return this.httpClient.get<ApiResponse<PrimaryVerificationModel>>(apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Retrieves the list of possible Primary Identification Types
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  getIdentificationTypePrimary(): Observable<ApiResponse<string[]>> {
    const apiUrl = `${this.ApiUrl}${Endpoints.PrimaryIdentification.GetIdentificationTypePrimary.GET}`;
    
    return this.httpClient.get<ApiResponse<string[]>>(apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Creates a POST request to CreatePrimaryIdentification
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  createPrimaryIdentification(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: FormData
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.PrimaryIdentification.CreatePrimaryIdentification.POST}`;
    
    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
  
  /**
   * Creates a POST request to UpdatePrimaryIdentification
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  updatePrimaryIdentification(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: FormData
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.PrimaryIdentification.UpdatePrimaryIdentification.POST}`;
  

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the Secondary Identification
   * @param userId 
   * @returns 
   */
  getSecondaryIdentificationByUserId(userId?: number): Observable<ApiResponse<SecondaryVerificationModel>> {
    const apiUrl = `${this.ApiUrl}${Endpoints.SecondaryIdentification.GetSecondaryIdentificationByUserId.GET}${userId ? "?userId=" + userId : "" }`;
    
    return this.httpClient.get<ApiResponse<SecondaryVerificationModel>>(apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Retrieves the list of possible Secondary Identification Types
   */
  getIdentificationTypeSecondary(): Observable<ApiResponse<string[]>> {
    const apiUrl = `${this.ApiUrl}${Endpoints.SecondaryIdentification.GetIdentificationTypeSecondary.GET}`;
    
    return this.httpClient.get<ApiResponse<string[]>>(apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Creates a POST request to CreateSecondaryIdentification
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  createSecondaryIdentification(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: FormData
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.SecondaryIdentification.CreateSecondaryIdentification.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
  
  /**
   * Creates a POST request to UpdateSecondaryIdentification
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  updateSecondaryIdentification(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    data: FormData
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.SecondaryIdentification.UpdateSecondaryIdentification.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  getInitialData(
    onSuccess: (response: ApiResponse<KycInitialData>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const combinedRequests = forkJoin([ this.getPrimaryIdentificationByUserId(), this.getSecondaryIdentificationByUserId(),
      this.getIdentificationTypePrimary(), this.getIdentificationTypeSecondary() ]);

      const next = (response: [ ApiResponse<PrimaryVerificationModel>, ApiResponse<SecondaryVerificationModel>,
        ApiResponse<string[]>, ApiResponse<string[]> ]): void => {
          const { [0]: primaryId, [1]: secondaryId, [2]: primaryDropdownData, [3]: secondaryDropdownData } = response;
          
          const data: KycInitialData = {
            primaryData: primaryDropdownData.data,
            secondaryData: secondaryDropdownData.data,
            primaryVerification: primaryId.data,
            secondaryVerification: secondaryId.data,
          }

          onSuccess({ data, status: 'success' });
      }

    combinedRequests.subscribe({ next, error: onError, complete: onComplete });
  }

  /**
   * Retrieves list of Users for KYC
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param filters 
   * @param pageSize 
   * @param pageNo 
   */
  getKYCUsers(
    onSuccess: (response: ApiResponse<KycUserModel[]>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    filters: object,
    pageSize: number = 10,
    pageNo: number = 1
  ): void {
    const query = new URLSearchParams(`filters=${JSON.stringify(filters)}&pageSize=${pageSize}&pageNo=${pageNo}`).toString();
    const apiUrl = `${this.ApiUrl}${Endpoints.KYC.GetAllKYCStatus.GET}?${query}`;

    this.httpClient.get<ApiResponse<KycUserModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a POST request to `/PrimaryIdentification/UpdatePrimaryIdentificationStatus`
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  updatePrimaryIdentificationStatus(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    data: KycUpdatePayload
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.PrimaryIdentification.UpdatePrimaryIdentificationStatus.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a POST request to `/SecondaryIdentification/UpdateSecondaryIdentificationStatus`
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  updateSecondaryIdentificationStatus(
    onSuccess: (response: ApiResponse<null>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    data: KycUpdatePayload
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.SecondaryIdentification.UpdateSecondaryIdentificationStatus.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}
