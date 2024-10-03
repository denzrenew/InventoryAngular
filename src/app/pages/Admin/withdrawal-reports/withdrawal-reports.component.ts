import { Component } from '@angular/core';
import { TableColumn } from '../../Generic/interface/TableColumn';
import { tableColumns } from './definition';
import { ReportsService } from 'src/app/core/services/reports.service';
import { ExportService } from 'src/app/core/services/export.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-withdrawal-reports',
  templateUrl: './withdrawal-reports.component.html',
  styleUrls: ['./withdrawal-reports.component.scss']
})
export class WithdrawalReportsComponent {
  apiEndpoint: string = '';
  columns: TableColumn[] = tableColumns;

  constructor(private reportsService: ReportsService,
    private exportService: ExportService,
    private toastService: ToastrService) {
    this.apiEndpoint = this.reportsService.getDefaultData('withdrawal');
  }

  // This is required for the app-basic-table
  private isDownloading: boolean = false;
  export(): void {
    this.isDownloading = true;
    this.exportService.exportAllWithdrawal(
      (response: HttpResponse<Blob>) => {
        this.toastService.success("Successfully exported all withdrawals!");
      }, 
      (error: any) => {
        this.toastService.error("There was a problem exporting all withdrawals.");
        if(!environment.production) {
          console.log("Error while exporting all withdrawals", error); 
        }
      }, 
      () => this.isDownloading = false);
  }
}
