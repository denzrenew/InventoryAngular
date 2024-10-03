import { Component, OnInit } from '@angular/core';
import StateModel, { InitialData, _searchFormDefaults } from './kyc-list.states';
import { FormBuilder } from '@angular/forms';
import { KycService } from 'src/app/core/services/kyc.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import KycUserModel from 'src/app/core/models/kyc/kyc-user.model';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.scss']
})
export class KycListComponent implements OnInit {
  protected state: StateModel;

  constructor(private formBuilder: FormBuilder,
    private kycService: KycService,
    private router: Router,
    private toastService: ToastrService) {
    this.state = InitialData(this.formBuilder);
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  private retrieveUsers(): void {
    this.state.loading = true;
    this.state.isNavigating = true;

    const formValue = this.state.searchForm.value;
    
    this.kycService.getKYCUsers(
      (response: ApiResponse<KycUserModel[]>) => {
        if(response.status === 'success') {
          this.state.kycUsers = response.data;
          this.state.pagination.totalRecord = response.totalRecordCount;
          if(this.state.isFirstLoad || this.state.isNavigating) {
            this.state.pagination.totalPages = Math.ceil(response.totalRecordCount / this.state.pagination.pageSize);
            this.state.pagination.pagesArray = Array.from({ length: this.state.pagination.totalPages }, (_, index) => index + 1);

            this.updatePagesArray();
          }
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("There was a problem retrieving the list of users");
      },
      () => {
        if(this.state.isFirstLoad) {
          this.state.isFirstLoad = false;
        }

        this.state.isNavigating = false;
        this.state.loading = false;
      },
      formValue,
      this.state.pagination.pageSize,
      this.state.pagination.pageNo
    )
  }

  /**
   * Update the pagesArray based on pageNo and totalPages
   */
  private updatePagesArray(): void {
    const maxPageButtons = 8; // Maximum number of page buttons to display
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    // Calculate the start and end page numbers to display
    let startPage = Math.max(this.state.pagination.pageNo - halfMaxButtons, 1);
    let endPage = Math.min(this.state.pagination.pageNo + halfMaxButtons, this.state.pagination.totalPages);

    // Adjust the start and end page numbers if necessary
    if (endPage - startPage + 1 < maxPageButtons) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPageButtons - 1, this.state.pagination.totalPages);
      } else {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
      }
    }

    this.state.pagination.pagesArray = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  protected redirectUser(userId: number): void {
    this.router.navigate(["kyc-list/user/", userId]);
  }

  protected searchHandler(): void {
    this.retrieveUsers();
  }

  protected getClassColor(status: string): string {
    status = status.toUpperCase();

    switch(status) {
      case "COMPLETED":
        return "text-info";
      case "REJECTED":
        return "text-danger";
      case "APPROVED":
        return "text-success";
      case "INCOMPLETE":
      default:
        return "text-warning";
    }
  }

  protected resetHandler(): void {
    this.state.searchForm.reset(_searchFormDefaults);

    this.retrieveUsers();
  }

  protected prevPage(): void {
    this.state.pagination.pageNo -= 1;
    this.resetHandler();
  }

  protected nextPage(): void {
    this.state.pagination.pageNo += 1;
    this.resetHandler();
  }

  protected changePageNumber(pageNumber: number): void {
    this.state.pagination.pageNo = pageNumber;
    this.resetHandler();
  }
}
