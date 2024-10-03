import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, finalize, forkJoin } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { ApiResponse } from 'src/app/pages/dashboards/default/interfaces/response.interface';
import Endpoints from 'src/app/shared/endpoints';
import ContractModel from '../models/account/contract.model';
import { MainWallet } from '../models/main-wallet.model';
import WalletsModel from '../models/wallets.model';
import UnallocatedUsers from '../models/group/unallocated.model';
import { DirectBonus } from '../models/direct-bonus/direct-bonus.model';
import VolumeModel from '../models/group/volume.model';
import { UserProfile } from 'src/app/pages/dashboards/default/interfaces/user-profile.interface';
import EfficiencyData from 'src/app/pages/dashboards/default/interfaces/efficiency-data.interface';

@Injectable({ providedIn: 'root' })

/**
 * Contains the api services under the GROUP endpoint
 */
export class adminDashboardService {
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
   * Retrieves the user's profile from the endpoint: ``/Account/ViewUserProfile``
   * 
   * Method: ``GET``
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param userId 
   */
  viewUserProfile(
    onSuccess: (response: ApiResponse<UserProfile>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId: number = 0
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Account.ViewUserProfile.GET}?userId=${userId}`;
    
    this.httpClient.get<ApiResponse<UserProfile>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the user's Contract information from the endpoint: ``/Account/GetContractByUserId``
   * 
   * Method: ``GET``
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param userId 
   */
  getContractInfo(
    onSuccess: (response: ApiResponse<ContractModel[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId: number = 0
    ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Contract.GetContractByUserId.GET}?userId=${userId}`;

    this.httpClient.get<ApiResponse<ContractModel[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the user's wallet information from the different endpoints
   * 
   * Method: ``GET``
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param userId 
   */
  getWalletsBalance(
    onSuccess: (response: ApiResponse<WalletsModel>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId: number = 0
  ): void {
    const transferredWallets = [
      this.getWallet(Endpoints.MainWallet.GetDirectWalletAmount.GET, true, userId),
      this.getWallet(Endpoints.MainWallet.GetMonthlyWalletAmount.GET, true, userId),
      this.getWallet(Endpoints.MainWallet.GetGroupWalletAmount.GET, true, userId),
    ];

    const untransferredWallets = [
      this.getWallet(Endpoints.MainWallet.GetDirectWalletAmount.GET, false, userId),
      this.getWallet(Endpoints.MainWallet.GetMonthlyWalletAmount.GET, false, userId),
      this.getWallet(Endpoints.MainWallet.GetGroupWalletAmount.GET, false, userId),
    ];

    const mainWalletRequest = this.httpClient.get<ApiResponse<MainWallet[]>>(
      `${this.ApiUrl}${Endpoints.MainWallet.GetMainWalletByUserId.GET}?userId=${userId}`,
      { headers: this.headers });

    const combinedRequests = forkJoin([ ...transferredWallets, ...untransferredWallets,mainWalletRequest ]);

    const next = (response: [ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ApiResponse<number>, ApiResponse<MainWallet[]>]): void => {
      const walletsModel: WalletsModel = {
        directWallet: {
          transferred: response[0] && response[0].status === 'success' ? response[0].data : 0,
          untransferred: response[3] && response[3].status === 'success' ? response[3].data : 0,
        },
        monthlyWallet: {
          transferred: response[1] && response[1].status === 'success' ? response[1].data : 0,
          untransferred: response[4] && response[4].status === 'success' ? response[4].data : 0,
        },
        groupWallet: {
          transferred: response[2] && response[2].status === 'success' ? response[2].data : 0,
          untransferred: response[5] && response[5].status === 'success' ? response[5].data : 0,
        },
        mainWallet: response[6] && response[6].status === 'success' ? response[6].data[0].amount : 0
      };

      walletsModel.totalLifetimeEarnings = 
        walletsModel.directWallet.transferred + 
        walletsModel.monthlyWallet.transferred + 
        walletsModel.groupWallet.transferred + 
        walletsModel.directWallet.untransferred + 
        walletsModel.monthlyWallet.untransferred + 
        walletsModel.groupWallet.untransferred + 
        walletsModel.mainWallet;

      onSuccess({ status: 'success', data: walletsModel });
    };

    combinedRequests.subscribe({ next, error: onError, complete: onComplete });
  }

  /**
   * Retrieves the user's unallocated referrals from the endpoint: ``/Group/GetUnPositionedUsers``
   * 
   * Method: ``GET``
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param userId 
   */
  getUnPositionedUsers(
    onSuccess: (response: ApiResponse<UnallocatedUsers[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId: number = 0
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetUnPositionedUsers.GET}?userId=${userId}`;
    
    this.httpClient.get<ApiResponse<UnallocatedUsers[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  private getWallet(endpoint: string, transferred: boolean, userId: number): Observable<ApiResponse<number>> {
    const apiUrl = `${this.ApiUrl}${endpoint}?isTransferred=${transferred}&userId=${userId}`;
    return this.httpClient.get<ApiResponse<number>>(apiUrl, { headers: this.headers });
  }

  /**
   * Creates a GET request to the endpoint, ``/DirectBonus/GetDirectBonusByUserId``
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  getDirectBonusByUserId(
    onSuccess: (response: ApiResponse<DirectBonus[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    userId: number = 0
  ): void {
    const data = {
      filters: "{}",
      pageSize: 100,
      pageNo: 1,
      isTransferred: false
    };
    const apiUrl = `${this.ApiUrl}${Endpoints.DirectBonus.GetDirectBonusByUserId.GET}?userId=${userId}&${this.querify(data)}`;
    
    this.httpClient.get<ApiResponse<DirectBonus[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Creates a GET request to the endpoint, ``/Group/GetMyNetworkVolume``
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  getMyNetworkVolume(
    onSuccess: (response: VolumeModel) => void, 
    onError: (error: any) => void, 
    onComplete: () => void,
    userId: number = 0
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Group.GetMyNetworkVolume.GET}?userId=${userId}`;
    
    this.httpClient.get<VolumeModel>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the efficiency data
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param userId 
   */
  getEfficiencyData(
    onSuccess: (response: ApiResponse<EfficiencyData>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    userId: number = 0
  ): void {
    const request = (endpoint: string): Observable<ApiResponse<number>> => {
      return this.httpClient.get<ApiResponse<number>>(`${this.ApiUrl}${endpoint}?userId=${userId}`, { headers: this.headers });
    }

    const apiRequests = [
      request(Endpoints.DirectBonus.GetTotalDirectBonusByDegreeAndUserId.GET),
      request(Endpoints.MonthlyBonus.GetTotalMonthlyBonusByDegreeAndUserId.GET),
      request(Endpoints.Group.GetTotalGroupBonusByDegreeAndUserId.GET)
    ];

    const next = (response: [ApiResponse<number>, ApiResponse<number>, ApiResponse<number>]) => {
      const data: EfficiencyData = {
        remaining: 0,
        direct: response[0] && response[0].status ? response[0].data : 0,
        monthly: response[1] && response[1].status ? response[1].data : 0,
        group: response[2] && response[2].status ? response[2].data : 0,
      }

      onSuccess({ status: 'success', data });
    }

    forkJoin(apiRequests).subscribe({ next, error: onError, complete: onComplete });
  }
}