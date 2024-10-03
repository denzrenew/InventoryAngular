import { Component } from '@angular/core';
import { tableColumns } from './definitions';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.scss']
})
export class BankListComponent {
  breadCrumbItems:string="Test";
  listApi = "/Bank/GetAllBank"
  formRoute = "/bank-detail-admin-form"
  detailFormRoute = "/bank-detail-admin-form"
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
}
