import { Component } from '@angular/core';
import { ReportsService } from 'src/app/core/services/reports.service';
import { TableColumn } from '../../Generic/interface/TableColumn';
import { tableColumns } from './definition';
import { ExportService } from 'src/app/core/services/export.service';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contract-reports',
  templateUrl: './contract-reports.component.html',
  styleUrls: ['./contract-reports.component.scss']
})
export class ContractReportsComponent {
  apiEndpoint: string = '';
  columns: TableColumn[] = tableColumns;

  constructor(private reportsService: ReportsService,
    private exportService: ExportService,
    private toastService: ToastrService) {
    this.apiEndpoint = this.reportsService.getDefaultData('contract');
  }

  // This is required for the app-basic-table
  private isDownloading: boolean = false;
  exportAllContracts(): void {
    this.isDownloading = true;
    const success = (response: HttpResponse<Blob>) => {
      this.toastService.success("Successfully exported all contracts!");
    }

    const error = (error: any) => {
      this.toastService.error("There was a problem exporting all contracts.");
      if(!environment.production) {
        console.log("Error while exporting all contracts", error); 
      }
    }

    const complete = () => {
      this.isDownloading = false;
    }

    this.exportService.exportAllContract(success, error, complete);
  }

  exportContractHistory(): void {
    this.isDownloading = true;
    const success = (response: HttpResponse<Blob>) => {
      this.toastService.success("Successfully exported all contract histories!");
    }

    const error = (error: any) => {
      this.toastService.error("There was a problem exporting all contract histories.");
      if(!environment.production) {
        console.log("Error while exporting all contract histories", error); 
      }
    }

    const complete = () => {
      this.isDownloading = false;
    }

    this.exportService.exportAllContractHistory(success, error, complete);
  }
}
