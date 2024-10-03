import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DepositService } from 'src/app/core/services/deposit.service';
import { tableColumns } from './definition';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
  listApi = "/Deposit/GetDepositByUserId?filters=10&pageSize=10&pageNo=1"
  formRoute = "/depositform"
  detailFormRoute = "/depositform"
  allocateRoute = ""
  showAction = false
  showViewDetails = false
  showAllocate = false
  deleteApi = ""
  columns = tableColumns
  modalRef?: BsModalRef;
  config:any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  name: any;
  deposits:any=[]
  constructor(private modalService: BsModalService, private depositService:DepositService) { }

  ngOnInit() {


  }


  largeModal(largeDataModal: any) {
    this.modalRef = this.modalService.show(largeDataModal, { class: 'modal-lg  modal-dialog-centered' });
  }
}
