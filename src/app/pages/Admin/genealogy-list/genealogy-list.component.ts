import { Component } from '@angular/core';
import { tableColumns } from './definitions';

@Component({
  selector: 'app-genealogy-list',
  templateUrl: './genealogy-list.component.html',
  styleUrls: ['./genealogy-list.component.scss']
})
export class GenealogyListComponent {
  breadCrumbItems:string="Test";
  listApi = "/Member/GetAllMember"
  formRoute = "/genealogy-form"
  detailFormRoute = "/genealogy-form"
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
}
