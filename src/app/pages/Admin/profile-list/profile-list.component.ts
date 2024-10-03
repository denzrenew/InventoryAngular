import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import AllUserModel from 'src/app/core/models/account/all-user.model';
import FilterModel from 'src/app/core/models/account/filter.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import searchForm, { searchFormDefaults } from './search.form-group';
import { Router } from '@angular/router';
import { ExportService } from 'src/app/core/services/export.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  protected pageNo: number = 1;
  protected pageSize: number = 10;
  protected pagesArray: number[] = [];
  protected totalPages: number = 1;

  protected isFirstLoad: boolean = true;
  protected isLoading: boolean = true;
  protected isNavigating: boolean = false;
  protected isDownloading: boolean = false;

  protected searchForm: FormGroup;

  protected allUsers: AllUserModel[] = [];
  protected totalRecord: number = 0;

  constructor(private accountService: AccountService,
    private exportService: ExportService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private router: Router) {
    this.searchForm = this.formBuilder.group(searchForm);
  }

  ngOnInit(): void {
    this.getUsers(this.searchForm.value);
  }

  /**
   * Update the pagesArray based on pageNo and totalPages
   */
  updatePagesArray(): void {
    const maxPageButtons = 8; // Maximum number of page buttons to display
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    // Calculate the start and end page numbers to display
    let startPage = Math.max(this.pageNo - halfMaxButtons, 1);
    let endPage = Math.min(this.pageNo + halfMaxButtons, this.totalPages);

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

  exportAllUsers(): void {
    this.isDownloading = true;

    this.exportService.exportAllUsers(
      (response: HttpResponse<Blob>) => {
        this.toastService.success("Successfully exported all users!");
      },
      (error: any) => {
        this.toastService.error("Failed to export all users");
        if(!environment.production) {
          console.log("There was an error exporting all users", error);
        }
      },
      () => this.isDownloading = false
    );
  }

  /**
   *
   * @param filters
   */
  getUsers(filters?: FilterModel): void {
    const success = (response: ApiResponse<AllUserModel[]>) => {
      if(response && response.status === 'success') {
        this.totalRecord = response.totalRecord;

        console.log(response.data)
        this.allUsers = response.data;


        if(this.isFirstLoad || this.isNavigating) {
          this.totalPages = Math.ceil(response.totalRecord / this.pageSize);
          this.pagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);

          this.updatePagesArray();
        }
      }
    }

    const error = (error: any) => {
      console.log("Error while fetching all users", error);
    }

    const complete = () => {
      if(this.isFirstLoad) {
        this.isFirstLoad = false;
      }

      this.isNavigating = false;
      this.isLoading = false;
    }

    this.accountService.getAllUsers(success, error, complete, filters, this.pageSize, this.pageNo);
  }

  /**
   * Searches for the users depending on the query
   */
  searchUsers(): void {
    const filter: FilterModel = this.searchForm.value;
    this.isNavigating = true;

    this.getUsers(filter);
  }

  clearFilters(): void {
    this.searchForm.reset(searchFormDefaults);
    this.searchUsers();
  }

  prevPage(): void {
    this.pageNo -= 1;
    this.searchUsers();
  }

  nextPage(): void {
    this.pageNo += 1;
    this.searchUsers();
  }

  changePageNumber(pageNumber: number): void {
    this.pageNo = pageNumber;
    this.searchUsers();
  }

  redirectToDashboard(id: number): void {
    this.router.navigate(['/admin/dashboard', id]);
  }
}
