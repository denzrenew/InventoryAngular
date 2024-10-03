import { Component } from '@angular/core';
import { tableColumns } from './definition';
import { BankService } from 'src/app/core/services/bank.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss']
})
export class BankDetailsComponent {
  breadCrumbItems:string="Test";
  listApi = "/Bank/GetBankByUserId?filters=10&pageSize=10&pageNo=1"
  formRoute = "/bankDetailsForm"
  detailFormRoute = "/bankDetailsForm"
  allocateRoute = ""
  showAction = true
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

