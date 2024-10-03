import { Component } from '@angular/core';
import { tableColumns } from './definition';
import { ExportService } from 'src/app/core/services/export.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-depoist-list',
  templateUrl: './depoist-list.component.html',
  styleUrls: ['./depoist-list.component.scss']
})
export class DepoistListComponent {
  breadCrumbItems:string="Test";
  listApi = "/Deposit/GetAllDeposit"
  formRoute = "/deposit-admin-form"
  detailFormRoute = "/depositform"
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

  constructor(private exportService: ExportService,
    private toastService: ToastrService) {
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
