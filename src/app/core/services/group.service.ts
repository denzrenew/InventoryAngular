import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import Endpoints from 'src/app/shared/endpoints';
import UnallocatedUsers from '../models/group/unallocated.model';
import Matrix from '../models/group/matrix.model';
import VolumeModel from '../models/group/volume.model';
import WeeklyRunModel from '../models/group/weekly-run.model';
import WeeklyRunRequestModel from '../models/group/weekly-run-request.model';
import { ApiResponse } from '../models/api-response.model';
import { AuthfakeauthenticationService } from './authfake.service';

@Injectable({ providedIn: 'root' })
/**
 * Contains the api services under the GROUP endpoint
 */
export class GroupService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;

  constructor(private httpClient: HttpClient, private authService: AuthfakeauthenticationService) {
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
   * Creates a GET request to the endpoint, "/api/Group/GetTotalGroupBonusByDegreeAndUserId"
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
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetTotalGroupBonusByDegreeAndUserId.GET}`;
    
    this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  searchMyNetwork(
    onSuccess: (response: ApiResponse<Matrix[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    keyword: string
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.SearchMyNetwork.GET}?keyword=${keyword}`;
    
    this.httpClient.get<ApiResponse<Matrix[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a GET request to the endpoint, "/api/Group/GetUnPositionedUsers"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   getUnPositionedUsers(
    onSuccess: (response: ApiResponse<UnallocatedUsers[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetUnPositionedUsers.GET}`;
    
    this.httpClient.get<ApiResponse<UnallocatedUsers[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a GET request to the endpoint, "/api/Group/GetMyNetworkVolume"
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
   getMyNetworkVolume(
    onSuccess: (response: VolumeModel) => void, 
    onError: (error: any) => void, 
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetMyNetworkVolume.GET}`;
    
    this.httpClient.get<VolumeModel>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a `GET` request to the endpoint, `/api/Group/GetGroupBonusByUserId`
   * 
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param {WeeklyRunRequestModel} payload - WeeklyRunRequestModel
   */
  getGroupBonusByUserId(
    onSuccess: (response: ApiResponse<WeeklyRunModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    payload: WeeklyRunRequestModel,
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetGroupBonusByUserId.GET}?${this.querify(payload)}`;
    
    this.httpClient.get<ApiResponse<WeeklyRunModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a `GET` request to the endpoint, `/api/Group/GetGroupProcessedBonusByUserId`
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  getGroupProcessedBonusByUserId(
    onSuccess: (response: ApiResponse<WeeklyRunModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    payload: WeeklyRunRequestModel,
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetGroupProcessedBonusByUserId.GET}?${this.querify(payload)}`;

    this.httpClient.get<ApiResponse<WeeklyRunModel[]>>(apiUrl, { headers: this.getHeaders() })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });    
  }
}