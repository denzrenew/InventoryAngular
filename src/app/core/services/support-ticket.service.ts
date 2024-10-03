import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginResponse } from "../models/login-response.model";
import { ApiResponse } from "../models/api-response.model";
import Endpoints from "src/app/shared/endpoints";
import { finalize } from "rxjs";
import { SupportTicketResponse } from "../models/support-ticket-response.model";
import SupportTicketFilterModel from "../models/support-ticket/support-ticket.filter.model";
import AllSupportTicketResponse from "../models/support-ticket/support-ticket.response.model";
import UpdateTicketModel from "../models/support-ticket/update-ticket.model";

const defaultSupportFilter: SupportTicketFilterModel = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  content: ''
}

@Injectable({ providedIn: 'root' })
export class SupportTicketService {
  readonly ApiUrl = environment.appapiConfig.apiUrl;

  headers: HttpHeaders;
  currentUser: LoginResponse;

  constructor(private httpClient: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) as LoginResponse;
    this.headers = new HttpHeaders({
      "Authorization": `Bearer ${this.currentUser.access_token}`,
    });
  }

  /**
   * Creates a new ticket to the server
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   */
  createTicketAsync(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    data: {
      subject: string,
      content: string
    }
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.SupportTicket.CreateTicketAsync.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves the list of support tickets
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   * @param pageSize 
   * @param pageNo 
   */
  getSupportTicketByUserId(
    onSuccess: (response: ApiResponse<SupportTicketResponse[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    data: {
      subject: string,
      content: string
    } = {
      subject: '',
      content: ''
    },
    pageSize: number = 30,
    pageNo: number = 1
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.SupportTicket.GetSupportTicketByUserId.GET}?filters=${JSON.stringify(data)}&pageSize=${pageSize}&pageNo=${pageNo}`;

    this.httpClient.get<ApiResponse<SupportTicketResponse[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Retrieves all the ticket for ADMIN using the endpoint: /SupportTicket/GetAllSupportTicket
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   * @param pageSize 
   * @param pageNo 
   */
   getAllSupportTicket(
    onSuccess: (response: ApiResponse<AllSupportTicketResponse[]>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    data: SupportTicketFilterModel = defaultSupportFilter,
    pageSize: number = 10,
    pageNo: number = 1
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.SupportTicket.GetAllSupportTicket.GET}?filters=${JSON.stringify(data)}&pageSize=${pageSize}&pageNo=${pageNo}`;

    this.httpClient.get<ApiResponse<AllSupportTicketResponse[]>>(apiUrl, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }

  /**
   * Updates a ticket using the endpoint: /SupportTicket/UpdatTicketAsync
   * @param onSuccess 
   * @param onError 
   * @param onComplete 
   * @param data 
   * @param pageSize 
   * @param pageNo 
   */
  updateTicket(
    onSuccess: (response: ApiResponse<null>) => void, 
    onError: (error: any) => void, 
    onComplete: () => void, 
    data: UpdateTicketModel
  ): void {
    const apiUrl = `${this.ApiUrl}${Endpoints.SupportTicket.UpdatTicketAsync.POST}`;

    this.httpClient.post<ApiResponse<null>>(apiUrl, data, { headers: this.headers })
      .pipe(finalize(onComplete))
      .subscribe({ next: onSuccess, error: onError });
  }
}