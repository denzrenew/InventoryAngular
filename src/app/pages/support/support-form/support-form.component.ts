import { Component, OnInit } from '@angular/core';
import { SupportTicketResponse } from 'src/app/core/models/support-ticket-response.model';
import { SupportTicketService } from 'src/app/core/services/support-ticket.service';
import { ApiResponse } from '../../dashboards/default/interfaces/response.interface';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {
  isLoading: boolean = true;
  isSubmitting: boolean = false;
  editMode: boolean = false;
  supportTickets: SupportTicketResponse[] = [];
  selectedTicket?: SupportTicketResponse;

  subTicketId: number = 0;
  form: FormGroup;

  constructor(private supportService: SupportTicketService, private datePipe: DatePipe, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      subject: ['', [ Validators.required, Validators.maxLength(50) ]],
      content: ['', [ Validators.required, Validators.maxLength(250) ]]
    })
  }

  ngOnInit() { 
    this.getSupportTickets();
  };

  getSupportTickets(): void {
    const success = (response: ApiResponse<SupportTicketResponse[]>) => {
      if(response && response.status === 'success') {
        this.supportTickets = response.data;
      }
    }

    const error = (error: any) => {
      console.log('Error fetching support tickets!', error);
    }

    const complete = () => {
      this.isLoading = false;
    }

    this.supportService.getSupportTicketByUserId(success, error, complete);
  }

  submitTicket(): void {
    this.isSubmitting = true;

    const success = (response: ApiResponse<null>) => {
      if(response && response.status === 'success') {
        const newSupportTicket: SupportTicketResponse = {
          ...this.form.value,
          id: this.subTicketId,
          userId: 0,
          isReadByAdmin: false,
          adminReply: '',
          createdDate: new Date(),
          lastModified: null
        };

        this.supportTickets = [ newSupportTicket, ...this.supportTickets ];
        this.selectedTicket = newSupportTicket;
        this.editMode = false;
        this.form.reset();
        this.subTicketId -= 1;
      }
    }

    const error = (error: any) => {
      console.log("Error creating ticket", error);
    }

    const complete = () => {
      this.isSubmitting = false;
    }

    this.supportService.createTicketAsync(success, error, complete, this.form.value);
  }
}