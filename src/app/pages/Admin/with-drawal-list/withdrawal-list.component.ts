import { Component } from '@angular/core';
import { tableColumns } from './definitions';
import { ExportService } from 'src/app/core/services/export.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-with-drawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.scss']
})
export class WithdrawalListComponent {
  breadCrumbItems:string="Test";
  listApi = "/Withdrawal/GetAllWithdrawal"
  formRoute = "/withdrawal-admin-form"
  detailFormRoute = "/withdrawal-admin-form"
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
  withdrawal:any=[]

  constructor(private exportService: ExportService,
    private toastService: ToastrService) {
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
