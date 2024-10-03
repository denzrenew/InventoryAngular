import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tableColumns } from './definition';
import { tableColumns2 } from './definition2';
import WalletDefinition, { WALLET_CONFIGURATION, WALLET_TYPES } from './wallet-detail.definition';
import { WalletsService } from 'src/app/core/services/wallets.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../dashboards/default/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.scss']
})
export class WalletDetailComponent implements OnInit {
  protected breadCrumbItems:string="Withdrawal";
  protected listApi = "/DirectBonus/GetDirectBonusByUserId";
  protected formRoute = "";
  protected transferPostUrl = "";
  protected transferAllPostUrl = "";
  protected transferCheckUrl = "";
  protected totalUrl = "";
  protected showAction = false;
  protected isTransferred = true;
  protected showViewDetails = false;
  protected showTotal = true;
  protected showTransfer = false;
  protected deleteApi = "";
  protected walletType = "";
  protected columns = tableColumns;
  protected columns2 = tableColumns2;
  protected config: any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  protected name: any;
  protected deposits: any = [];
  protected selectedWalletType: string = "";
  protected transferringAll: boolean = false;

  constructor(private route: ActivatedRoute,
    private walletsService: WalletsService,
    private toast: ToastrService
    ) {

  }

  ngOnInit() {
    this.selectedWalletType = this.route.snapshot.paramMap.get('id');

    const config: WalletDefinition = WALLET_CONFIGURATION[this.selectedWalletType];

    if(config) {
      this.walletType = config.walletType;
      this.listApi = config.listApi;
      this.transferPostUrl = config.transferPostUrl;
      this.transferAllPostUrl = config.transferAllPostUrl;
      this.transferCheckUrl = config.transferCheckUrl;
      this.totalUrl = config.totalUrl;
      this.columns = config.columns;
      this.columns2 = config.columns2;
    }
  }

  protected transferAllHandler(): void {
    const monthlyBonuses = [ WALLET_TYPES.FAST_START, WALLET_TYPES.DIAMOND, WALLET_TYPES.GOLD, WALLET_TYPES.PLATINUM ];
    const directBonuses = [ WALLET_TYPES.UNILEVEL, WALLET_TYPES.REFERRAL_BONUS ];
    const { selectedWalletType } = this;

    if(monthlyBonuses.includes(selectedWalletType)) {
      this.transferAllMonthlyBonus(selectedWalletType);
    }

    if(directBonuses.includes(selectedWalletType)) {
      this.transferAllDirectBonus();
    }
  }

  private transferAllDirectBonus(): void {
    this.transferringAll = true;

    this.walletsService.transferAllDirectBonus(
      (response: ApiResponse<any>) => {
        if(response.status === 'success') {
          this.toast.success(`Successfully transferred all balance for: \`${this.walletType}\`'s!`);
        } else {
          if(!environment.production) console.log(response);
          this.toast.error("There was a problem with your request");
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toast.error("There was a problem with your request.");
      },
      () => this.transferringAll = false,
      this.transferAllPostUrl
    );
  }

  private transferAllMonthlyBonus(type: string): void {
    this.transferringAll = true;

    this.walletsService.transferAllMonthlyByCategory(
      (response: ApiResponse<any>) => {
        if(response.status === 'success') {
          this.toast.success(`Successfully transferred all balance for: \`${this.walletType}\`'s!`);
        } else {
          if(!environment.production) console.log(response);
          this.toast.error("There was a problem with your request");
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toast.error("There was a problem with your request.");
      },
      () => this.transferringAll = false,
      this.transferAllPostUrl,
      type
    );
  }
}
