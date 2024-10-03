import { Component, OnInit } from '@angular/core';
import ConsolidatedWalletModel from 'src/app/core/models/wallets/consolidated-wallet.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { WalletsService } from 'src/app/core/services/wallets.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import StateModel from 'src/app/pages/Generic/simple-table/simple-table.states';

const SUCCESS = 'success';

@Component({
  selector: 'app-transferred-consolidated-bonus-wallet',
  templateUrl: './transferred-consolidated-bonus.component.html',
  styleUrls: ['./transferred-consolidated-bonus.component.scss']
})
export class TransferredConsolidatedBonusWalletComponent implements OnInit {
  protected tableState: StateModel<ConsolidatedWalletModel>;

  constructor(private walletService: WalletsService,
    private toastService: ToastrService) {
    this.tableState = {
      parentComponent: this,

      loading: true,
      tableName: "History",
      
      currentPage: 1,
      pageSize: 10,
      totalRecordCount: 0,

      model: [],
      definition: [
        {
          sort: 1,
          columnName: 'Transaction Id',
          objectName: 'id'
        },
        {
          sort: 2,
          columnName: 'Transaction Date',
          objectName: 'dateReceive',
          formatType: 'date',
          format: 'MM/dd/yyyy',
        },
        {
          sort: 3,
          columnName: 'Package Amount',
          objectName: 'packageAmount',
          formatType: 'number',
          format: '1.2-2'
        },
        {
          sort: 4,
          columnName: 'Package Reward',
          objectName: 'packageReward',
          formatType: 'number',
          format: '1.2-2'
        },
      ],
      onInitFn: function () { this.parentComponent.loadData(); },
      onNextClickFn: function() { this.parentComponent.loadNextRecords() },
      onPrevClickFn: function() { this.parentComponent.loadPreviousRecords() },
      onPageSelectFn: function(pageNo: number) { this.parentComponent.loadPaginatedRecords(pageNo) },

      loadingAggregate: true,
      aggregateColumn: 'packageReward',
      aggregateCb: function() {
        this.parentComponent.loadTotalAmount();
      }
    };
  }

  ngOnInit() {

  }
  
  protected loadData(): void {
    this.tableState.loading = true;

    this.walletService.getTransferredConsolidationMonthlyRewardByUserId(
      (response: ApiResponse<ConsolidatedWalletModel[]>) => {
        if(response.status === SUCCESS) {
          this.tableState.model = response.data;
          this.tableState.totalRecordCount = response.totalRecordCount
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("There was a problem retrieving the wallet.");
      },
      () => {
        this.tableState.loading = false;
      },
      this.tableState.pageSize, 1, {}
    )
  }

  protected loadNextRecords(): void {

  }

  protected loadPreviousRecords(): void {

  }

  protected loadPaginatedRecords(pageNo: number): void {

  }

  protected loadTotalAmount(): void {
    this.tableState.loadingAggregate = true;

    let totalRecord = 0;
    const secondCall = () => {
      this.walletService.getTransferredConsolidationMonthlyRewardByUserId(
        (response: ApiResponse<ConsolidatedWalletModel[]>) => {
          if(response.status === SUCCESS) {
            this.tableState.aggregate = response.data
              .map(i => i[this.tableState.aggregateColumn])
              .reduce((left, right) => left + right, 0);
          }
        },
        (error: any) => {
          if(!environment.production) console.log(error);
          this.toastService.error("There was a problem retrieving the aggregate.");
        },
        () => { 
          this.tableState.loadingAggregate = false;
        },
        totalRecord, 1, {}
      );
    }

    this.walletService.getTransferredConsolidationMonthlyRewardByUserId(
      (response: ApiResponse<ConsolidatedWalletModel[]>) => {
        if(response.status === SUCCESS) {
          totalRecord = response.totalRecordCount
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("There was a problem retrieving the aggregate.");
      },
      () => { 
        secondCall();
      },
      1, 1, {}
    );
  }
}
