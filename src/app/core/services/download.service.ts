import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';
import { AuthfakeauthenticationService } from './authfake.service';

@Injectable({ providedIn: 'root' })
/**
 * Contains the api services under the GROUP endpoint
 */
export class DownloadService {
  private readonly ApiUrl = environment.appapiConfig.apiUrl;

  constructor(private httpClient: HttpClient, 
    private authService: AuthfakeauthenticationService) {
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
   * Retrieves a blob file from the endpoint `/DownloadFile/DownloadStreamFile`
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param fileName 
   */
  downloadStreamFile(
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
    onComplete: () => void,
    fileName: string
  ): void {
    const apiUrl = `${this.ApiUrl}/DownloadFile/DownloadStreamFile?fileName=${fileName}`;

    this.httpClient.get(apiUrl, { 
        headers: this.getHeaders(),
        responseType: 'blob'
    }).pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}