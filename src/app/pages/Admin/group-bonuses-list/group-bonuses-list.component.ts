import { Component } from '@angular/core';
import { tableColumns } from './definitions';
import { ExportService } from 'src/app/core/services/export.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-bonuses-list',
  templateUrl: './group-bonuses-list.component.html',
  styleUrls: ['./group-bonuses-list.component.scss']
})
export class GroupBonusesListComponent {
  breadCrumbItems:string="Test";
  listApi = "/ConsolidatedMonthly/GetAllConsolidationMonthlyReward"
  formRoute = "/group-bonus-form"
  detailFormRoute = "/group-bonus-form"
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
    this.exportService.exportAllGroupBonus(
      (response: HttpResponse<Blob>) => {
        this.toastService.success("Successfully exported all group bonuses!");
      }, 
      (error: any) => {
        this.toastService.error("There was a problem exporting all group bonuses.");
        if(!environment.production) {
          console.log("Error while exporting all group bonuses", error); 
        }
      }, 
      () => this.isDownloading = false);
  }
}
