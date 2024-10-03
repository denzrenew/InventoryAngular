import { Component } from '@angular/core';
import { BankService } from 'src/app/core/services/bank.service';
import { tableColumns } from './definition';

@Component({
  selector: 'app-comission-list',
  templateUrl: './comission-list.component.html',
  styleUrls: ['./comission-list.component.scss']
})
export class ComissionListComponent {
  breadCrumbItems:string="Comission Equivalent";
  listApi = "/Comission/GetCommission?filters=10&pageSize=10&pageNo=1"
  formRoute = "/bankDetailsForm"
  detailFormRoute = "/bankDetailsForm"
  allocateRoute = ""
  showAction = false
  showViewDetails = false
  showAllocate = false
  deleteApi = ""
  columns = tableColumns
  name: any;
  deposits:any=[]
  constructor( private bankService:BankService) { }

  ngOnInit() {


  }


  largeModal(largeDataModal: any) {

  }

}


