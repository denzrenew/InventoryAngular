import { Component, OnInit } from '@angular/core';
import { SupportTicketResponse } from 'src/app/core/models/support-ticket-response.model';
import { SupportTicketService } from 'src/app/core/services/support-ticket.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AllSupportTicketResponse from 'src/app/core/models/support-ticket/support-ticket.response.model';
import { getForm, searchForm } from './support-form-admin.form-group';
import SupportTicketFilterModel from 'src/app/core/models/support-ticket/support-ticket.filter.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Component({
  selector: 'app-support-form-admin',
  templateUrl: './support-form-admin.component.html',
  styleUrls: ['./support-form-admin.component.scss']
})
export class SupportFormAdminComponent implements OnInit {
  isLoading: boolean = true;
  isFirstLoad: boolean = true;
  isNavigating: boolean = false;
  isSubmitting: boolean = false;
  supportTickets: AllSupportTicketResponse[] = [];
  selectedTicket?: SupportTicketResponse;

  searchText: string = '';
  searchFilter: string = '';
  filter: SupportTicketFilterModel = {};

  searchForm: FormGroup;
  form: FormGroup;

  pagesArray: number[] = [];
  pageSize: number = 10;
  pageNumber: number = 1;
  totalPages: number = 1;

  currentDate: Date = new Date();
  sixHoursAgo: Date;

  constructor(
    private supportService: SupportTicketService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe) {
    this.searchForm = this.formBuilder.group(searchForm);
    this.form = this.formBuilder.group(getForm());

    this.currentDate.setUTCHours(0, 0, 0, 0);
  }

  ngOnInit() { 
    this.getAllSupportTickets();
  };

  /**
   * Update the pagesArray based on pageNo and totalPages
   */
  updatePagesArray(): void {
    const maxPageButtons = 8; // Maximum number of page buttons to display
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    // Calculate the start and end page numbers to display
    let startPage = Math.max(this.pageNumber - halfMaxButtons, 1);
    let endPage = Math.min(this.pageNumber + halfMaxButtons, this.totalPages);

    // Adjust the start and end page numbers if necessary
    if (endPage - startPage + 1 < maxPageButtons) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPageButtons - 1, this.totalPages);
      } else {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
      }
    }

    this.pagesArray = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  getAllSupportTickets(searchFilter?: SupportTicketFilterModel): void {
    const success = (response: ApiResponse<AllSupportTicketResponse[]>) => {
      if(response && response.status === 'success') {
        this.supportTickets = response.data;
        if(this.isFirstLoad) {
          this.totalPages = Math.ceil(response.totalRecordCount / this.pageSize);
          this.pagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);

          this.updatePagesArray();
        }
      }
    }

    const error = (error: any) => {
      console.log('Error fetching support tickets!', error);
    }

    const complete = () => {
      if(this.isFirstLoad) {
        this.isFirstLoad = false;
      }

      this.isNavigating = false;
      this.isLoading = false;
    }

    this.supportService.getAllSupportTicket(success, error, complete, searchFilter, this.pageSize, this.pageNumber);
  }

  isNew(date: Date): boolean {
    if(typeof date === 'string') {
      date = new Date(date);
    }

    const sixHoursAgo = new Date(this.currentDate.getTime() - 6 * 60 * 60 * 1000); // Calculate 6 hours ago in UTC

    // Check if the date is today (same year, month, and day)
    const isToday = date.getUTCFullYear() === this.currentDate.getUTCFullYear() &&
      date.getUTCMonth() === this.currentDate.getUTCMonth() &&
      date.getUTCDate() === this.currentDate.getUTCDate();

    // Check if the date is within 6 hours ago
    const isWithinSixHours = date >= sixHoursAgo;

    return isToday && isWithinSixHours;
  }

  selectTicket(ticket: AllSupportTicketResponse): void {
    if(!ticket.isReadByAdmin) {
      this.updateTicket(ticket.id, '', true);
    }

    this.form.get('id').patchValue(ticket.id);
    this.selectedTicket = ticket;
  }

  /* ==== NAVIGATION FUNCTIONS ==== */
  searchTickets(): void {
    const searchValue = this.searchForm.get('value').value;
    this.filter = {};
    this.filter[this.searchFilter] = searchValue;

    this.isNavigating = true;
    this.getAllSupportTickets(this.filter);
  }

  selectFilter(event: Event): void {
    const target: any = event.target;
    const value: any = target.value;

    this.searchFilter = value;
  }

  prevPage(): void {
    this.pageNumber -= 1;
    this.searchTickets();
  }

  nextPage(): void {
    this.pageNumber += 1;
    this.searchTickets();
  }

  changePageNumber(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.searchTickets();
  }

  submitTicket(): void {
    const adminReply = this.form.get('adminReply')?.value;
    this.updateTicket(this.selectedTicket.id, adminReply);
  }

  updateTicket(id: number, adminReply: string, seenOnly: boolean = false) {
    if(!seenOnly) {
      this.isSubmitting = true;
    }

    const success = (response: ApiResponse<null>) => {
      if(response && response.status === 'success') {
        if(seenOnly) {
          this.selectedTicket.isReadByAdmin = true;
        } else {
          this.selectedTicket.adminReply = adminReply;
          this.selectedTicket.lastModified = this.datePipe.transform(new Date(), 'MMM/dd/yyyy hh:mm a');
          this.form.reset();
        }
      }
    }

    const error = (error: any) => {
      console.log("Error updating ticket", error);
    }

    const complete = () => {
      if(!seenOnly) {
        this.isSubmitting = false;
      }
    }

    this.supportService.updateTicket(success, error, complete, { id, adminReply, isReadByAdmin: true });
  }
  
}