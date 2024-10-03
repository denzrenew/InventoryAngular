import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import DepositAccountModel from 'src/app/core/models/bank/deposit-account.model';
import { BanksService } from 'src/app/core/services/banks.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bank-account-widget',
  templateUrl: './bank-account-widget.component.html',
  styleUrls: ['./bank-account-widget.component.scss']
})
export class BankAccountWidgetComponent implements OnInit {
  protected models?: DepositAccountModel[];
  protected loading: boolean = true;

  constructor(private banksService: BanksService) {

  }

  ngOnInit(): void {
    this.getDepositAccountInformation();
  }

  getDepositAccountInformation(): void {
    this.loading = true;

    this.banksService.getDepositAccount(
      (response: ApiResponse<DepositAccountModel[]>) => {
        if(response && response.status === 'success') {
          this.models = response.data;
        }
      },
      (error: any) => {
        if(!environment.production) {
          console.log("There was a problem retrieving the data of the deposit bank account", error);
        }
      },
      () => {
        this.loading = false;
      }
    );
  }


}
