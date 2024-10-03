import { Component } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WithdrawService } from 'src/app/core/services/withdraw.service';
import { tableColumns } from './definition';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent {
  breadCrumbItems:string="Withdrawal";
  listApi = "/Withdrawal/GetWithdrawalByUserId"
  formRoute = "/withdrawalform"
  detailFormRoute = "/withdrawalform"
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

  constructor(private modalService: BsModalService) { }

  largeModal(largeDataModal: any) {
    this.modalRef = this.modalService.show(largeDataModal, { class: 'modal-lg  modal-dialog-centered' });
  }
}
