import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Charts, LoadingScreens } from './admin-dashboard.interfaces';
import { charts, loading, models as defaultModels, userProfile, wallets } from './admin-dashboard.defaults';
import AdminDashboardModels from './admin-dashboard.models';
import { adminDashboardService } from 'src/app/core/services/admin-dashboard.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { UserProfile } from "../../dashboards/default/interfaces/user-profile.interface";
import ContractModel from 'src/app/core/models/account/contract.model';
import WalletsModel from 'src/app/core/models/wallets.model';
import UnallocatedUsers from 'src/app/core/models/group/unallocated.model';
import { DirectBonus } from 'src/app/core/models/direct-bonus/direct-bonus.model';
import VolumeModel from 'src/app/core/models/group/volume.model';
import { environment } from 'src/environments/environment';
import EfficiencyData from '../../dashboards/default/interfaces/efficiency-data.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  protected userId: number = 0;
  protected loading: LoadingScreens = loading();
  protected charts: Charts = charts;
  protected models: AdminDashboardModels = defaultModels;
  bsModalRef?: BsModalRef;

  constructor(private route: ActivatedRoute, 
    private adminDashboardService: adminDashboardService,
    private router: Router,
    private modalService: BsModalService) {
      this.models.contractAmount = 0.00;
  }

  ngOnInit(): void {
    this.loading = loading();
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.startFetch();
  }
  
  backToProfiles(): void {
    window.history.back();
  }
  
  protected showModal(template: TemplateRef<any>, size: string = 'modal-lg'): void {
    this.bsModalRef = this.modalService.show(template, { class: size, animated: true });
  }

  closeModal(modalRef?: BsModalRef): void {
    if(modalRef) {
      return modalRef?.hide();
    }

    this.bsModalRef?.hide();
  }

  startFetch(): void {
    this.getUserProfile();
    this.getWalletsBalance();
    this.getUnallocatedUsers();
    this.getDirectReferralUsers();
    this.getNetworkData();
  }

  private getUserProfile(): void {
    this.adminDashboardService.viewUserProfile(
      (response: ApiResponse<UserProfile>) => this.models.userProfile = response && response.status === 'success' ? response.data : userProfile,
      (error: any) => console.log("Error fetching user profile", error),
      () => {
        this.getContractInfo();

        if(this.models.userProfile.accountType?.toUpperCase() === 'PREMIERE') {
          this.charts.pieChart.labels = [ this.charts.pieChart.labels[0], 'Direct', this.charts.pieChart.labels[1], "Group" ];
          this.charts.pieChart.colors = [ this.charts.pieChart.colors[0], '#b49d17', this.charts.pieChart.colors[1],"#800000" ];
        }
      },
      this.userId
    );
  }

  private getContractInfo(): void {
    this.adminDashboardService.getContractInfo(
      (response: ApiResponse<ContractModel[]>) => {
        if(response.status === 'success' && Array.isArray(response.data)) {
          if(response.data.length > 0) {
            const { [0]: remaining, [1]: direct, [2]: monthly, [3]: group } = this.models.series;
            this.models.contractAmount = response.data[0].amount;
            this.models.series = [ (this.models.contractAmount * 2), direct, monthly, ];
          }
        }
      },
      (error: any) => console.log("Error fetching Contract Info", error),
      () => {
        this.loading.profile = false;
        this.getEfficiencyData();
      },
      this.userId
    );
  }

  private getWalletsBalance(): void {
    this.adminDashboardService.getWalletsBalance(
      (response: ApiResponse<WalletsModel>) => {
        this.models.wallets = response && response.status === 'success' ? response.data : wallets;
      },
      (error: any) => console.log("Error fetching wallets", error),
      () => {
        this.loading.wallets.direct = false;
        this.loading.wallets.monthly = false;
        this.loading.wallets.group = false;
      },
      this.userId
    );
  }

  private getUnallocatedUsers(): void {
    this.adminDashboardService.getUnPositionedUsers(
      (response: ApiResponse<UnallocatedUsers[]>) => this.models.unallocatedUsers = response && response.status === 'success' ? response.data : [], 
      (error: any) => console.log("Error fetching unallocated users", error), 
      () => this.loading.referrals.unallocated = false,
      this.userId
    )
  }

  private getDirectReferralUsers(): void {
    this.adminDashboardService.getDirectBonusByUserId(
      (response: ApiResponse<DirectBonus[]>) => this.models.directReferralUsers = response && response.status === 'success' ? response.data : [], 
      (error: any) => console.log('Error fetching Direct Referral Users', error),
      () => this.loading.referrals.direct = false,
      this.userId
    )
  }

  private getNetworkData(): void {
    this.adminDashboardService.getMyNetworkVolume(
      (response: VolumeModel) => this.models.volumeModel = response && response.status === 'success' ? response : null,
      (error: any) => console.log("Error fetching network data", error),
      () => this.loading.myNetwork = false,
      this.userId
    );
  }

  private getEfficiencyData(): void {
    this.adminDashboardService.getEfficiencyData(
      (response: ApiResponse<EfficiencyData>) => {
        this.models.efficiencyData = response && response.status === 'success'? response.data : null;
      },
      (error: any) => console.log("Error while fetching efficiency data", error),
      () => {
        const totalRemaining = this.models.contractAmount * 2; // Multiply the Contract Amount (Plan Amount) by 2
        const { direct, monthly, group } = this.models.efficiencyData;

        if(this.models.userProfile.accountType?.toUpperCase() === 'PREMIERE') {
          const show200PercentageRemaining = totalRemaining === 0 
            && direct === 0
            && monthly === 0
            && group === 0;

          // The remaining balance displayed should be 
          // plan amount x 2 - (direct bonus + monthly bonus + group bonus) = remaining balance
          this.models.efficiencyData.remaining = totalRemaining - (direct + monthly + group);
          this.models.series = [show200PercentageRemaining ? 1 : this.models.efficiencyData.remaining, direct, monthly, group];
        } else { // SUBSCRIPTION TYPE USER
          const show200PercentageRemaining = totalRemaining === 0 && monthly === 0;

          // The remaining balance displayed should be 
          // plan amount x 2 - (direct bonus + monthly bonus + group bonus) = remaining balance
          this.models.efficiencyData.remaining = totalRemaining - (monthly);          
          this.models.series = [show200PercentageRemaining ? 1 : this.models.efficiencyData.remaining, monthly, ];
        }

        this.loading.efficiency = false;
      },
      this.userId
    )
  }

  /**
   * Retrieves the name of the user
   * @returns 
   */
  getName(): string {
    const { firstName, middleName, lastName } = this.models.userProfile;

    if(firstName && lastName) {
      return `${lastName}, ${firstName} ${middleName ?? ""}`;
    }

    return "";
  }

  /**
   * Generates the Referral link
   * @returns 
   */
  getReferralLink(): string {
    if(this.models.userProfile.referralCode) {
      return environment.appapiConfig.siteUrl + `/account/signup/${this.models.userProfile.referralCode}`;
    }

    return "";
  }

  /**
   * Copies the referral code to the clipboard
   */
  copyReferralCode(): void {
    const textarea = document.createElement('textarea');
    textarea.value = this.getReferralLink();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  getSubscriptionImage(): string {
    if(this.models.userProfile && this.models.userProfile.accountType) {
      return `assets/logos/${this.models.userProfile.accountType.toLowerCase()}.png`
    }
    return "";
  }

  navigate(where: string): void {
    // Ikaw na bahala dito boss Dennis
  }

  redirectToWithdraw(): void {
    this.router.navigate(["withdrawal/user/", this.userId]);
  }
}
