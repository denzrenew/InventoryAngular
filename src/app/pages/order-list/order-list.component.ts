import { Component } from '@angular/core';
import { tableColumns } from './definition';
import { orderservice } from 'src/app/core/services/orderservice';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  breadCrumbItems:string="Order List";
  listApi = "/Order/GetOrderListByUserId?filters=10&pageSize=10&pageNo=1"
  formRoute = "/orderdetail"
  detailFormRoute = "/orderdetail"
  allocateRoute = ""
  showAction = false
  showViewDetails = true
  showAllocate = false
  deleteApi = ""
  columns = tableColumns
  name: any;
  deposits:any=[]
  constructor( private bankService:orderservice) { }

  ngOnInit() {
  }
}