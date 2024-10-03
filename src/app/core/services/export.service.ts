import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/login-response.model';

import Endpoints from 'src/app/shared/endpoints';
import { finalize } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExportService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;
  private readonly saltPapi = `524456Skwnf@@11`;

  private headers: HttpHeaders;
  private currentUser: LoginResponse;

  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;
    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.currentUser.access_token}`,
    });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ProcessMonthlyBonus` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  processMonthlyBonus(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    dateMonth: number,
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ProcessMonthlyBonus.GET}?salt=${this.saltPapi}&dateMonth=${dateMonth}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'processMonthlyBonus.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllContract` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllContract(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllContract.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllContract.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllContractHistory` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllContractHistory(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllContractHistory.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllContractHistory.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllUsers` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllUsers(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllUsers.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllUsers.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllDirectBonus` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllDirectBonus(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllDirectBonus.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllDirectBonus.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllMonthlyBonus` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllMonthlyBonus(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllMonthlyBonus.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllMonthlyBonus.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllGroupBonus` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllGroupBonus(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllGroupBonus.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllGroupBonus.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllDeposit` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllDeposit(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllDeposit.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllDeposit.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/ExportAllWithdrawal` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  exportAllWithdrawal(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.ExportAllWithdrawal.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'exportAllWithdrawal.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

  /**
   * Downloads a .csv file from the endpoint `/api/Export/AutowithdrawMonthlyReward` with a `GET` method
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   */
  autowithdrawMonthlyReward(
    onSuccess: (response: HttpResponse<Blob>) => void,
    onError: (error: any) => void,
    onComplete: () => void
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.Export.AutowithdrawMonthlyReward.GET}?salt=${this.saltPapi}`

    this.httpClient.get(apiUrl, { headers: this.headers, responseType: 'blob', observe: 'response' })
      .pipe(finalize(onComplete))
      .subscribe({ 
        next: (response) => {
          const contentDisposition = response.headers?.get('content-disposition');
          const filename = contentDisposition ? contentDisposition.split('=')[1] : 'autowithdrawMonthlyReward.csv';

          saveAs(response.body, filename);
          onSuccess(response);
      }, error: onError });
  }

}