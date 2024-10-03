import { Component } from '@angular/core';
import { tableColumns } from './definition';
import { SupportTicketService } from 'src/app/core/services/supportticket.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  breadCrumbItems:string="Test";
  listApi = "/SupportTicket/GetSupportTicketByUserId?filters=10&pageSize=10&pageNo=1"
  formRoute = "/supportform"
  detailFormRoute = "/supportform"
  allocateRoute = ""
  showAction = false
  showViewDetails = true
  showAllocate = false
  deleteApi = ""
  columns = tableColumns
  name: any;
  deposits:any=[]
  constructor(private depositService:SupportTicketService) { }

  ngOnInit() {


  }
}
