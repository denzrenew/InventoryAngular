import { Component } from '@angular/core';
import { ReportsService } from 'src/app/core/services/reports.service';
import { TableColumn } from '../../Generic/interface/TableColumn';
import { tableColumns } from './definition';
import { HttpResponse } from '@angular/common/http';
import { ExportService } from 'src/app/core/services/export.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-deposit-reports',
  templateUrl: './deposit-reports.component.html',
  styleUrls: ['./deposit-reports.component.scss']
})
export class DepositReportsComponent {
  apiEndpoint: string = '';
  columns: TableColumn[] = tableColumns;

  constructor(private reportsService: ReportsService,
    private exportService: ExportService,
    private toastService: ToastrService) {
    this.apiEndpoint = this.reportsService.getDefaultData('deposit');
  }

  // This is required for the app-basic-table
  private isDownloading: boolean = false;
  export(): void {
    this.isDownloading = true;
    this.exportService.exportAllDeposit(
      (response: HttpResponse<Blob>) => {
        this.toastService.success("Successfully exported all deposits!");
      }, 
      (error: any) => {
        this.toastService.error("There was a problem exporting all deposits.");
        if(!environment.production) {
          console.log("Error while exporting all deposits", error); 
        }
      }, 
      () => this.isDownloading = false);
  }
}
