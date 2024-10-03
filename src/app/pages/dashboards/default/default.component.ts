import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { pieChartData, directBonusChart, monthlyBonusChart, groupBonusChart, defaultUser, getNewDefaultWallet, totalLifetimeEarningsChart } from './data';
import { ChartType } from './dashboard.model';

import { EventService } from 'src/app/core/services/event.service';
import { UserProfileService } from 'src/app/core/services/user.service';
import { WalletsService } from 'src/app/core/services/wallets.service';
import { ContractService } from 'src/app/core/services/contractService';

import { UserProfile } from './interfaces/user-profile.interface';
import { Wallets } from './interfaces/wallet.interface';

import { environment } from 'src/environments/environment';
import { MainWallet } from 'src/app/core/models/main-wallet.model';

import Endpoints from 'src/app/shared/endpoints';
import { SupportTicketService } from 'src/app/core/services/support-ticket.service';
import { SupportTicketResponse } from 'src/app/core/models/support-ticket-response.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import ticketForm from './form-group/ticket.form-group';

import { DirectBonusService } from 'src/app/core/services/direct-bonus.service';
import { MonthlyBonusService } from 'src/app/core/services/monthly-bonus.service';
import { GroupService } from 'src/app/core/services/group.service';
import EfficiencyData from './interfaces/efficiency-data.interface';
import UnallocatedUsers from 'src/app/core/models/group/unallocated.model';
import { DirectBonus } from 'src/app/core/models/direct-bonus/direct-bonus.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';
import VolumeModel from 'src/app/core/models/group/volume.model';
import { AuthService } from 'src/app/core/services/auth2.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import UserProfileModel from 'src/app/core/models/account/user-profile.model';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  modalRef?: BsModalRef;
  isVisible: string;
  parentName: string;
  parentId: number= 0;
  originalparentId: number= 0;
  isUpgradingToPremiere: boolean = false;
  isSubmittingTicket: boolean = false;
  isViewTicket: boolean = false;
  ticketDetails?: SupportTicketResponse = null;
  loading: {
    profile: boolean, // Profile section
    efficiency: boolean, // Efficiency section
    wallets: { direct: boolean, unilevel: boolean, fast: boolean,diamond: boolean, gold: boolean,platinum: boolean}, // Wallets section
    myNetwork: boolean, // Network section
    support: boolean, // Help & Support section
    referrals: { direct: boolean, unallocated: boolean, } // Referrals section
  };

  pieChart: ChartType = pieChartData;
  bitconinChart: ChartType = directBonusChart;
  ethereumChart: ChartType = monthlyBonusChart;
  litecoinChart: ChartType = groupBonusChart;
  totalEarningsChart: ChartType = totalLifetimeEarningsChart;

  userProfile: UserProfile;
  efficiencyData: EfficiencyData;
  wallets: Wallets = getNewDefaultWallet();
  untransferredWallets: Wallets = getNewDefaultWallet();
  supportTickets: SupportTicketResponse[] = [];
  unallocatedUsers: UnallocatedUsers[] = [];
  directReferralUsers: DirectBonus[] = [];
  volumeModel?: VolumeModel;
  totalLifeEarnings: number = 0;

  series: number[] = [1, 0];
  isLoading: boolean = true;
  subscriptionType: string = "SUBSCRIPTION";
  contractAmount: number = 0;
  form: FormGroup;

  @ViewChild('content') content;
  @ViewChild('center', { static: false }) center?: ModalDirective;

  constructor(
    private httpClient: HttpClient,
    private modalService: BsModalService,
    private eventService: EventService,
    private userProfService: UserProfileService,
    private walletService: WalletsService,
    private contractService: ContractService,
    private supportTicketService: SupportTicketService,
    private directBonusService: DirectBonusService,
    private monthlyBonusService: MonthlyBonusService,
    private groupService: GroupService,
    private sharedService: SharedService,
    private authService: AuthService,
    private authService2: AuthfakeauthenticationService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.userProfile = defaultUser;
      this.loading = {
        profile: true,
        efficiency: true,
        wallets: { direct: true, unilevel: true, fast: true, gold: true,diamond: true,platinum: true },
        myNetwork: true,
        support: true,
        referrals: { direct: true, unallocated: true, }
      };
      this.efficiencyData = {
        remaining: 0,
        direct: 0,
        monthly: 0,
        group: 0
      }

      this.form = this.formBuilder.group({ });
  }

  ngOnInit() {
    let kyc : string  = "incomplete"
    if(this.authService.getAccessTokenData().role === 'Administrator') {
      return this.router.navigate(['all-profile']);
    }
    if(kyc === 'incomplete') {
    // return this.router.navigate(['kyc']);
    }
    const attribute = document.body.getAttribute('data-layout');

    this.isVisible = attribute;
    const vertical = document.getElementById('layout-vertical');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (attribute == 'horizontal') {
      const horizontal = document.getElementById('layout-horizontal');
      if (horizontal != null) {
        horizontal.setAttribute('checked', 'true');
      }
    }

    this.fetchData();
  }

  private getHeaders(): HttpHeaders {
    const service = this.authService2.currentUserValue;
    if(!service.access_token) {
      console.log("User not authenticated");
      this.authService2.logout();
    }

    return new HttpHeaders({
      "Authorization": `Bearer ${service.access_token}`
    });
  }
  /**
   * Generates the Referral link
   * @returns
   */
  getReferralLink(): string {
    if(this.userProfile.referralCode) {
      return environment.appapiConfig.regUrl + `/${this.userProfile.referralCode}`;
    }

    return "";
  }

  getAffiliatelLink(): string {
    if(this.userProfile.referralCode) {
      return environment.appapiConfig.regUrl + `/?ref=${this.userProfile.referralCode}`;
    }

    return "";
  }

  getSubscriptionImage(): string {
    if(this.userProfile && this.userProfile.accountType) {
      return `assets/logos/${this.userProfile.accountType.toLowerCase()}.png`
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

  copyAffiliateCode(): void {
    const textarea = document.createElement('textarea');
    textarea.value = this.getAffiliatelLink();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  /**
   * Retrieves the name of the user
   * @returns
   */
  getName(): string {
    const { firstName, middleName, lastName } = this.userProfile;

    if(firstName && lastName) {
      return `${lastName}, ${firstName} ${middleName ?? ""}`;
    }

    return "";
  }

  ngAfterViewInit() { }

  /**
   * Shows the Confirm Premiere Modal
   * @param templateRef
   */
  showConfirmPremiereModal(templateRef: any): void {
    this.modalRef = this.modalService.show(templateRef, { class: 'modal-sm' });
  }

  /**
   * Shows the Create New ticket modal
   * @param templateRef
   */
  showCreateNewTicketModal(templateRef: any): void {
    this.form = this.formBuilder.group(ticketForm);
    this.modalRef = this.modalService.show(templateRef, { class: 'modal-lg' });
  }

  /**
   * Shows the view ticket modal
   * @param templateRef
   * @param id
   * @returns
   */
  showViewTicketModal(templateRef: any, id: number): void {
    const ticket = this.supportTickets.find(i => i.id === id);
    if(!ticket) {
      return console.log(`No ticket with id of ${id} is found!`);
    }

    this.isViewTicket = true;
    this.ticketDetails = ticket;

    this.modalRef = this.modalService.show(templateRef, { class: 'modal-lg' })
  }

  /**
   * Click event to hide the view ticket modal
   */
  closeViewTicket(): void {
    this.modalRef.hide();
    this.isViewTicket = false;
  }

  /**
   * Retrieves the logo based on the account type of the user
   * @returns string
   */
  getAccountTypeLogo(): string {
    if(this.userProfile && this.userProfile.accountType) {
      const { accountType } = this.userProfile;
      return `assets/logos/${accountType.toLowerCase()}.png`;
    }

    return "";
  }

  /**
   * Creates a post function method to upgrade the user to premiere subscription
   */
  upgradeToPremiere(): void {
    this.isUpgradingToPremiere = true;

    const success = (response: ApiResponse<any>) => {
      if(response && response.status === "success") {
        const tokenData = this.userProfService.getTokenData();
        const accessToken = this.userProfService.currentUser.access_token;
        if(!tokenData || (tokenData && !tokenData.userId)) {
          console.error("NO TOKEN DATA!");
        }

        // Reload the sidebar component using the shared service
        const sidebarComponent = this.sharedService.getService("SIDEBAR")?.service;
        sidebarComponent?.ngOnInit();

        this.getUserProfile(tokenData, accessToken, () => {
          this.isUpgradingToPremiere = false;
          this.modalRef?.hide();
          Swal.fire({
            title: 'Success!',
            html: `<span class='text-info'>Your account is now upgraded to <span class='text-warning' style='font-weight: 500;'>Premiere</span>!</span>`,
            icon: 'success',
            timer: 4000,
            confirmButtonText: `Great!`
          });
        });
      }
    }

    const error = (error: any) => {
      this.isUpgradingToPremiere = false;
      this.modalRef?.hide();

      Swal.fire({
        title: 'Sorry!',
        html: `<span class="text-info">Your upgrade request can't be processed as of the moment. Please try again after a little while.</span>`,
        icon: 'error',
        confirmButtonText: `Retry later`
      });
    }

    this.contractService.updatePremiereAccount(success, error, () => { });
  }

  /**
   * Creates a support ticket and sends it to the server
   */
  submitSupportTicket(): void {
    this.isSubmittingTicket = true;

    const success = (response: ApiResponse<null>) => {
      if(response.status === 'success') {
        const newSupportTicket: SupportTicketResponse = {
          id: -1,
          userId: -1,
          subject: this.form.value['subject'],
          content: this.form.value['content'],
          isReadByAdmin: null,
          adminReply: "",
          createdDate: new Date(),
          lastModified: null,
        };
        this.supportTickets = [ newSupportTicket, ...this.supportTickets ];
        Swal.fire({
          title: 'Ticket sent!',
          html: `<span class='text-info'>Thank you for submitting your cocnern! We'll get back to you as soon as possible.</span>`,
          icon: 'success',
          timer: 4000,
          confirmButtonText: `Thanks!`
        });
      } else {
        Swal.fire({
          title: 'Oops!',
          html: `<span class='text-info'>Sorry! There was a problem submitting your ticket. Please try to send again after a few minutes.</span>`,
          icon: 'warning',
          confirmButtonText: `Sure!`
        });
      }
    }

    const error = (error: any) => {
      Swal.fire({
        title: 'Oops!',
        html: `<span class='text-info'>Sorry! There was a problem submitting your ticket. Please try to send again after a few minutes.</span>`,
        icon: 'error',
        confirmButtonText: `Thanks!`
      });
    }

    const complete = () => {
      this.modalRef?.hide(); // Hide the modal
      this.isSubmittingTicket = false;
      this.form = this.formBuilder.group({ }); // Clear the form
    }

    this.supportTicketService.createTicketAsync(success, error, complete, this.form.value);
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }

  /**
   * Navigates the user to other pages
   * @param location
   */
  navigate(location: string): void {
    if (location === 'direct') {
      this.router.navigate(['/RwalletDetails/referralbonus']);
    } else if (location === 'unilevel') {
      this.router.navigate(['/UwalletDetails/unilevel']);
    } else if (location === 'fast') {
      this.router.navigate(['/FwalletDetails/faststart']);
    } else if (location === 'diamond') {
      this.router.navigate(['/SwalletDetails/diamond']);
    } else if (location === 'gold') {
      this.router.navigate(['/GwalletDetails/gold']);
    } else if (location === 'platinum') {
      this.router.navigate(['/PwalletDetails/platinum']);
    }
    
  }

  /* ============ API CALLS BEGIN ============ */

  /**
   * Creates a synchronous function to retrieve the data for the dashboard
   */
  private fetchData() {
    const tokenData = this.userProfService.getTokenData();
    const accessToken = this.userProfService.currentUser.access_token;
    if(!tokenData || (tokenData && !tokenData.userId)) {
      console.error("NO TOKEN DATA!");
    }

    this.getUserProfile(tokenData, accessToken, () => {
      this.getContractInfo();
    });
    this.getWalletsBalance();
    this.getUntransferredWalletBalance();
    //this.getSupportTickets();
    //this.getUnallocatedUsers();
    this.getDirectReferralUsers();

    //this.getNetworkData();
  }

  /**
   * Retrieves the volume of the network data
   */
  private getNetworkData(): void {
    this.loading.myNetwork = true;

    const success = (response: VolumeModel) => {
      if(response.status === 'success') {
        this.volumeModel = response;
      }
    }

    const error = (error: any) => {
      console.log("There's a problem loading getting Network data", error);
    }

    const complete = () => { this.loading.myNetwork = false; }

    this.groupService.getMyNetworkVolume(success, error, complete);
  }

  /**
   * Retrieves users to display in the Direct Referrals section
   */
  getDirectReferralUsers(): void {
    const success = (response: ApiResponse<DirectBonus[]>) => {
      if(response && response.status === "success") {
          console.log('Directreferal');
          console.log(response);
          this.parentId = 0;
          this.parentName = "My Affiliates";
          this.directReferralUsers = response.data;
      }
    }

    const error = (error: any) => { console.log("Error retrieving direct referral users"); }
    const complete = () => {
      this.loading.referrals.direct = false;

    }

    this.directBonusService.getDirectReferalByUserId(success, error, complete);
  }
    /**
   * Retrieves users to display in the Direct Referrals section
   */
    getDirectReferralUsersById(userId : number, parendId:number, parentName:string ): void {
      const success = (response: ApiResponse<DirectBonus[]>) => {
        if(response && response.status === "success") {         
            this.directReferralUsers = response.data;
            this.parentName = "Affiliates of " + parentName;
            this.parentId = parendId;
            if(this.parentId === this.originalparentId) {
              this.parentId = 0;
            }
        }
      }
  
      const error = (error: any) => { console.log("Error retrieving direct referral users"); }
      const complete = () => {
        this.loading.referrals.direct = false;
  
      }
  
      this.directBonusService.getDirectReferalByUserIdWithId(userId, success, error, complete);
    }

  
  /**
   * Retrieves the unallocated users for Unallocated Referrals section
   */
  private getUnallocatedUsers(): void {
    const success = (response: ApiResponse<UnallocatedUsers[]>) => {
      if(response && response.status === 'success') {
        this.unallocatedUsers = response.data.map(i => {
          i.createdDate = new Date(i.createdDate);

          return i;
        });
      }
    }

    const error = (error: any) => { console.log("Failed to get unallocated users"); };
    const complete = () => {
      this.loading.referrals.unallocated = false;
    }

    this.groupService.getUnPositionedUsers(success, error, complete);
  }

  /**
   * Retrieves the Contract info of the user
   */
  private getContractInfo(): void {
    const success = (response: ApiResponse<any>) => {
      if(response.status === 'success' && Array.isArray(response.data)) {
        if(response.data.length > 0) {
          const { [0]: remaining, [1]: direct, [2]: monthly, [3]: group } = this.series;

          //this.contractAmount = response.data[0].amount;
          //loop through the response data and get the amount
          response.data.forEach((data: any) => {
            this.contractAmount += data.amount;
          });
          this.series = [ (this.contractAmount * 2), direct, monthly, ];
        }
      }
    }

    const error = (error: any) => { console.log("Error on Contract Info"); }
    const complete = () => { this.getEfficiencyData(); }

    this.contractService.getContractInfo2(success, error, complete);
  }

  /**
   * Retrieves data for the Efficiency section
   */
  private getEfficiencyData(): void {
    const fetching = {
      direct: true,
      monthly: true,
      group: true,
    };

    const success = {
      direct: (response: ApiResponse<number>) => this.efficiencyData.direct = response && response.status === 'success' ? response.data : 0,
      monthly: (response: ApiResponse<number>) => this.efficiencyData.monthly = response && response.status === 'success' ? response.data : 0,
      group: (response: ApiResponse<number>) => this.efficiencyData.group = response && response.status === 'success' ? response.data : 0,
    };

    const error = (error: any) => { console.log("Error retrieving efficiency data", error); }
    const complete = {
      direct: () => { fetching.direct = false; computeRemaining(); },
      monthly: () => { fetching.monthly = false; computeRemaining(); },
      group: () => { fetching.group = false; computeRemaining(); },
    };

    const computeRemaining = () => {
      if(!fetching.direct && !fetching.monthly && !fetching.group) {
        const totalRemaining = this.contractAmount * 2; // Multiply the Contract Amount (Plan Amount) by 2
        const { direct, monthly, group } = this.efficiencyData;

        const show200PercentageRemaining = totalRemaining === 0
        && direct === 0
        && monthly === 0
        && group === 0;

      // The remaining balance displayed should be
      // plan amount x 2 - (direct bonus + monthly bonus + group bonus) = remaining balance
      this.efficiencyData.remaining = totalRemaining - (direct + monthly + group);
      this.series = [show200PercentageRemaining ? 1 : this.efficiencyData.remaining, direct, monthly, group];

        this.loading.efficiency = false; // Loading for efficiency section is done
      }
    }

    this.directBonusService.getTotalDirectBonusByDegreeAndUserId(success.direct, error, complete.direct);
    this.monthlyBonusService.getTotalMonthlyBonusByDegreeAndUserId(success.monthly, error, complete.monthly);
    this.groupService.getTotalMonthlyBonusByDegreeAndUserId(success.group, error, complete.group);
  }

  /**
   * Retrieves the list of support tickets
   */
  private getSupportTickets(): void {
    this.loading.support = true;
    const success = (response: ApiResponse<SupportTicketResponse[]>) => {
      if(response && response.status === "success") {
        if(response.data.length > 0) {
          this.supportTickets = response.data;
        }
      }
    }

    const error = (error: any) => {
      console.log("%cFailed to retrieve list of support tickets", 'color: red; background: #FF2222');
    }

    const complete = () => {
      this.loading.support = false;
    }

    this.supportTicketService.getSupportTicketByUserId( success,  error, complete, { subject: "", content: "" });
  }

  /**
   * Retrieves the user Profile data
   * @param tokenData
   * @param accessToken
   * @param callback optional.
   */
  private getUserProfile(tokenData: any, accessToken: string, callback: () => void | null = null): void {
    const success = (response: ApiResponse<UserProfile>) => {
      if(response) {
        if (response.data.accountType === null) {
          response.data.accountType = 'admin'
        }
        this.userProfile = response.data;
        this.subscriptionType = response.data.accountType.toUpperCase();
      }

      callback && callback();
    }

    const error = (error: any) => console.log("ERROR FOUND!", error);

    const complete = () => {
      this.isLoading = false;

      this.pieChart.labels = [ this.pieChart.labels[0], 'Direct', this.pieChart.labels[1], "Group" ];
      this.pieChart.colors = [ this.pieChart.colors[0], '#b49d17', this.pieChart.colors[1],"#800000" ];
    }

    const apiUrl = environment.appapiConfig.apiUrl;
    const requestUrl = `${apiUrl}${Endpoints.Account.ViewUserProfile.GET}`;

    this.httpClient.get<ApiResponse<UserProfile>>(requestUrl, {
      headers: new HttpHeaders(
        { 'Authorization': `Bearer ${accessToken}` }
      )
    }).pipe(finalize(complete))
      .subscribe({ next: success, error });
  }

  private getUntransferredWalletBalance(): void {
    this.totalLifeEarnings = 0;
    const success = {
      direct: (response: ApiResponse<number>) => {
        this.untransferredWallets.directWallet = response && response.data ? response.data : 0;
        this.loading.wallets.direct = false;
      },
      unilevel: (response: ApiResponse<number>) => {
        this.untransferredWallets.unilevelWallet = response && response.data ? response.data : 0;
        this.loading.wallets.unilevel = false;
      },
      fast: (response: ApiResponse<number>) => {
        this.untransferredWallets.fastWallet = response && response.data ? response.data : 0;
        this.loading.wallets.fast = false;
      }

    };

    const error = (error: any) => console.log("ERROR FOUND!", error);
    const complete = () => this.isLoading = false;


    this.walletService.getDirectWalletAmount(success.direct, error, complete, false);
    this.walletService.getUnilevelWalletAmount(success.unilevel, error, complete, false);
    this.walletService.getProfitWalletAmount(success.fast, error, complete, false);

  }

  private getWalletsBalance(): void {
    const success = {
      direct: (response: ApiResponse<number>) => {
        this.wallets.directWallet = response && response.data ? response.data : 0;
        this.loading.wallets.direct = false;
      },
      unilevel: (response: ApiResponse<number>) => {
        this.wallets.unilevelWallet = response && response.data ? response.data : 0;
        this.loading.wallets.unilevel = false;
      },
      fast: (response: ApiResponse<number>) => {
        this.wallets.fastWallet = response && response.data ? response.data : 0;
        this.loading.wallets.fast = false;
      }
    };

    const error = (error: any) => console.log("ERROR FOUND!", error);
    const complete = () => this.isLoading = false;

    this.walletService.getDirectWalletAmount(success.direct, error, complete);
    this.walletService.getUnilevelWalletAmount(success.unilevel, error, complete);
    this.walletService.getProfitWalletAmount(success.fast, error, complete);
  }

  /* ============ API CALLS END ============ */
}
