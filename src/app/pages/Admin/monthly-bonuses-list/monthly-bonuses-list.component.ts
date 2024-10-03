import { Component, OnInit, TemplateRef } from '@angular/core';
import { tableColumns } from './definitions';
import { ExportService } from 'src/app/core/services/export.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MonthlyBonusService } from 'src/app/core/services/monthly-bonus.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import MonthlyBonusResponseModel from 'src/app/core/models/monthly-bonuses/monthly-bonus.response.model';
import MonthlyBonusModel from './monthly-bonuses-list.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import TransferToMainWalletModel from 'src/app/core/models/monthly-bonuses/transfer-to-main-wallet.model';

@Component({
  selector: 'app-monthly-bonuses-list',
  templateUrl: './monthly-bonuses-list.component.html',
  styleUrls: ['./monthly-bonuses-list.component.scss']
})
export class MonthlyBonusesListComponent implements OnInit {
  breadCrumbItems:string="Test";
  listApi = "/MonthlyBonus/GetAllMonthlyReward"
  formRoute = "/monthly-bonuses-form"
  detailFormRoute = "/monthly-bonuses-form"
  allocateRoute = ""
  showAction = true
  showViewDetails = false
  showFilter = true
  showAllocate = false
  deleteApi = ""
  columns = tableColumns
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  name: any;
  deposits:any=[]

  protected active: string = 'all';
  protected forTransfer: MonthlyBonusModel;
  protected bsModalRef?: BsModalRef;
  protected trigger: string = '';

  constructor(private exportService: ExportService,
    private toastService: ToastrService,
    private modalService: BsModalService,
    private monthlyBonusService: MonthlyBonusService) {
      this.forTransfer = {
        pageSize: 10, 
        pageNo: 1, 
        totalPages: 1, 
        loading: true, 
        model: [], 
        pagesArray: [], 
        selectedItems: [],
        firstLoad: true,
        silentRetrieval: false,
        isProcessing: false,
      }
    }

  ngOnInit(): void {
    this.getForTransferMonthlyBonusRewards();
  }

  private getForTransferMonthlyBonusRewards(): void {
    this.forTransfer.loading = true;
    this.forTransfer.model = [];

    this.monthlyBonusService.getAllMonthlyReward(
      (response: ApiResponse<MonthlyBonusResponseModel[]>) => {
        if(response && response.status === 'success') {
          this.forTransfer.model = response.data;
          this.forTransfer.totalNumberCount = response!.totalRecordCount;

          if(this.forTransfer.loading) {
            this.forTransfer.totalPages = Math.ceil(response.totalRecordCount / this.forTransfer.pageSize);
            this.forTransfer.pagesArray = Array.from({ length: this.forTransfer.totalPages }, (_, index) => index + 1);
            
            if(this.forTransfer.totalPages <= 0) {
              this.forTransfer.totalPages = 1;
            }

            this.updatePagesArray();
          }
        }

        this.forTransfer.totalNumberCount = response.totalRecordCount ?? 1;
      },
      (error: any) => {
        this.toastService.error("Failed to retrieve For Transfer Monthly Bonus Rewards");
        if(!environment.production) {
          console.log("Failed to retrieve for transfer monthly bonus rewards", error);
        }
      },
      () => {
        this.forTransfer.loading = false;
        if(this.forTransfer.firstLoad) this.forTransfer.firstLoad = false;
      },
      this.forTransfer.pageSize,
      this.forTransfer.pageNo,
      "{'isTransferred':'false'}"
    );
  }

  // This is required for the app-basic-table
  private isDownloading: boolean = false;
  export(): void {
    this.isDownloading = true;
    this.exportService.exportAllMonthlyBonus(
      (response: HttpResponse<Blob>) => {
        this.toastService.success("Successfully exported all monthly bonuses!");
      }, 
      (error: any) => {
        this.toastService.error("There was a problem exporting all monthly bonuses.");
        if(!environment.production) {
          console.log("Error while exporting all monthly bonuses", error); 
        }
      }, 
      () => this.isDownloading = false);
  }

  protected tabClick(option: string): void {
    this.active = option;
  }

  protected prevPage(): void {
    this.forTransfer.pageNo -= 1;
    this.getForTransferMonthlyBonusRewards();
  }

  protected nextPage(): void {
    this.forTransfer.pageNo += 1;
    this.getForTransferMonthlyBonusRewards();
  }

  protected changePageNumber(pageNo: number): void {
    this.forTransfer.pageNo = pageNo;
    this.getForTransferMonthlyBonusRewards();
  }
  
  /**
   * Update the pagesArray based on pageNo and totalPages
   */
  private updatePagesArray(): void {
    const maxPageButtons = 8; // Maximum number of page buttons to display
    const halfMaxButtons = Math.floor(maxPageButtons / 2);

    // Calculate the start and end page numbers to display
    let startPage = Math.max(this.forTransfer.pageNo - halfMaxButtons, 1);
    let endPage = Math.min(this.forTransfer.pageNo + halfMaxButtons, this.forTransfer.totalPages);

    // Adjust the start and end page numbers if necessary
    if (endPage - startPage + 1 < maxPageButtons) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPageButtons - 1, this.forTransfer.totalPages);
      } else {
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
      }
    }

    this.forTransfer.pagesArray = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  protected toggleCheckbox(event: any, id: number, userId: number): void {
    const value = event.target.checked;

    // Add to the selected items or remove them from the list
    this.forTransfer.selectedItems = value
      ? [...this.forTransfer.selectedItems, { monthlyId: id, userId }]
      : this.forTransfer.selectedItems.filter(i => i.monthlyId !== id);
  }

  protected toggleAllCheckbox(event: any): void {
    const value = event.target.checked;

    if(value) {
      this.forTransfer.silentRetrieval = true;

      this.retrieveAllItems();
    } else {
      this.forTransfer.selectedItems = [];
    }
  }

  protected showModal(template: TemplateRef<any>, trigger: string): void {
    this.trigger = trigger;
    this.bsModalRef = this.modalService.show(template, { class: 'modal-md', animated: true });
  }

  protected closeModal(): void {
    this.bsModalRef?.hide();
  }

  protected process(): void {
    this.forTransfer.isProcessing = true;

    const messages = {
      all: {
        success: 'Successfully processed all the items',
        failed: 'Failed to process all the items',
      },
      selected: {
        success: 'Successfully processed the selected items',
        failed: 'Failed to process the selected items',
      }
    };

    const callback = () => {
      this.monthlyBonusService.transferToMainWallet(
        (response: ApiResponse<null>) => {
          if(response && response.status === 'success') {
            this.toastService.success(messages[this.trigger].success);
            this.getForTransferMonthlyBonusRewards();
            this.forTransfer.selectedItems = [];
          } else {
            this.toastService.error(messages[this.trigger].failed);
          }
        },
        (error: any) => {
          this.toastService.error(messages[this.trigger].failed);
          if(!environment.production) {
            console.log("Failed to process items", error);
          }

          this.forTransfer.isProcessing = false;
          this.bsModalRef?.hide();
        },
        () => {
          this.forTransfer.isProcessing = false;
          this.bsModalRef?.hide();
        },
        this.forTransfer.selectedItems
      );
    }

    if(this.trigger === 'all') {
      this.retrieveAllItems(callback);
    } else {
      callback();
    }
  }

  private retrieveAllItems(callback: any = null): void {
    // Create a request
    this.monthlyBonusService.getAllMonthlyReward(
      (response: ApiResponse<MonthlyBonusResponseModel[]>) => {
        if(response && response.status === 'success') {
          this.forTransfer.selectedItems = response.data.map(i => { 
            return { monthlyId: i.id, userId: i.userId }
          });

          if(callback && this.trigger === 'all') callback();
        }
      },
      (error: any) => {
        if(!environment.production) {
          console.log("Failed to retrieve for transfer monthly bonus rewards", error);
        }
      },
      () => this.forTransfer.silentRetrieval = false,
      this.forTransfer.totalNumberCount,
      1,
      "{'isTransferred':'false'}"
    );
  }

  protected isInList(id: number, userId: number): boolean {
    const item = this.forTransfer.selectedItems.find(i => i.monthlyId == id && i.userId == userId);
    console.log("IsInList", id, userId, item ? true : false);
    return item ? true : false;
  }
}
