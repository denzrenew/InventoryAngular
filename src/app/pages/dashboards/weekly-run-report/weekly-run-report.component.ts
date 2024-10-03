import { Component, OnInit } from '@angular/core';
import WeeklyRunRequestModel from 'src/app/core/models/group/weekly-run-request.model';
import WeeklyRunModel from 'src/app/core/models/group/weekly-run.model';
import { GroupService } from 'src/app/core/services/group.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Component({
  selector: 'app-weekly-run-report',
  templateUrl: './weekly-run-report.component.html',
  styleUrls: ['./weekly-run-report.component.scss']
})
export class WeeklyRunReportComponent implements OnInit {
  protected reports: WeeklyRunModel[];
  protected payload?: WeeklyRunRequestModel;

  protected isFirstLoad: boolean;
  protected isNavigating: boolean;
  protected pagesArray: number[];
  protected totalPages: number;
  protected totalResult: number;

  constructor(private groupService: GroupService,
    private toastService: ToastrService) {
    this.pagesArray = [];
    this.totalPages = 0;
    this.totalResult = 0;
    this.isFirstLoad = true;
    this.isNavigating = true;
    this.reports = [];
    this.payload = {
      filters: {},
      pageSize: 10,
      pageNo: 1,
      isTransferred: false
    }
  }

  ngOnInit(): void {
    this.getReports();
  }

  getReports(isTransferred: boolean | null = null): void {
    if(isTransferred != null) {
      this.payload.isTransferred = isTransferred;
    }

    this.isNavigating = true;
    this.groupService.getGroupProcessedBonusByUserId(
      (response: ApiResponse<WeeklyRunModel[]>) => {
        if(response && response.status === 'success') {
          this.reports = response.data;
        }

        if(this.isFirstLoad || this.isNavigating) {
          this.totalResult = response.totalRecordCount;
          this.totalPages = Math.ceil(response.totalRecordCount / this.payload.pageSize);
          this.pagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);

          this.updatePagesArray();
        }
      },
      (error: any) => {
        !environment.production && console.log("Failed to get weekly run reports", error);
        this.toastService.error("Failed to retrieve the weekly run reports");
      },
      () => { 
        this.isNavigating = false;
        this.isFirstLoad = false;
      },
      this.payload
    )
  }

  /**
   * Update the pagesArray based on pageNo and totalPages
   */
  updatePagesArray(): void {
    const maxPageButtons = 8; // Maximum number of page buttons to display
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    // Calculate the start and end page numbers to display
    let startPage = Math.max(this.payload.pageNo - halfMaxButtons, 1);
    let endPage = Math.min(this.payload.pageNo + halfMaxButtons, this.totalPages);

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

  prevPage(): void {
    if(this.payload.pageNo - 1 <= 0) return;

    this.payload.pageNo -= 1;
    this.getReports();
  }

  nextPage(): void {
    if(this.payload.pageNo + 1 > this.pagesArray.length) return;

    this.payload.pageNo += 1;
    this.getReports();
  }

  changePageNumber(pageNumber: number): void {
    this.payload.pageNo = pageNumber;
    this.getReports();
  }

}
