import { Component } from '@angular/core';
import { tableColumns } from './definitions';
import { ExportService } from 'src/app/core/services/export.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-direct-referral-list',
  templateUrl: './direct-referral-list.component.html',
  styleUrls: ['./direct-referral-list.component.scss']
})
export class DirectReferralListComponent {
  breadCrumbItems:string="Test";
  listApi = "/DirectBonus/GetAllDirectBonus"
  formRoute = "/direct-bonus-form"
  detailFormRoute = "/direct-bonus-form"
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
    private toastService: ToastrService) { }

  // This is required for the app-basic-table
  private isDownloading: boolean = false;
  export(): void {
    this.isDownloading = true;
    this.exportService.exportAllDirectBonus(
      (response: HttpResponse<Blob>) => {
        this.toastService.success("Successfully exported all direct referral bonuses!");
      }, 
      (error: any) => {
        this.toastService.error("There was a problem exporting all direct referral bonuses.");
        if(!environment.production) {
          console.log("Error while exporting all direct referral bonuses", error); 
        }
      }, 
      () => this.isDownloading = false);
  }
}
