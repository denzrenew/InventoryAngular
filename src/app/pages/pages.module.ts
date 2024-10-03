import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { BasicTableComponent } from './Generic/basic-table/basic-table.component';
import { CbTableComponent } from './Generic/cb-table/cb-table.component';
import { DcjPaginationComponent } from './Generic/app-dcj-pagination/app-dcj-pagination.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SupportComponent } from './support/support.component';
import { SupportFormComponent } from './support/support-form/support-form.component';
import { ContractComponent } from './contract/contract.component';
import { ContractFormComponent } from './contract/contract-form/contract-form.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';
import { FormWithdrawComponent } from './withdrawal/form-withdraw/form-withdraw.component';
import { FormDepositComponent } from './deposit/form-deposit/form-deposit.component';
import { MatrixScreenComponent } from './matrix-screen/matrix-screen.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { HomeComponent } from './home/home.component';

import { MatrixChartComponent } from './matrix-screen/matrix-chart/matrix-chart.component';
import { WalletTransferComponent } from './wallet-detail/wallet-transfer/wallet-transfer.component';
import { BankDetailsFormComponent } from './bank-details/bank-details-form/bank-details-form.component';
import { DepoistListComponent } from './Admin/depoist-list/depoist-list.component';

import { BankListComponent } from './Admin/bank-list/bank-list.component';
import { DepoistApprovalFormComponent } from './Admin/depoist-list/depoist-approval-form/depoist-approval-form.component';
import { WithdrawalApprovalFormComponent } from './Admin/with-drawal-list/withdrawal-approval-form/withdrawal-approval-form.component';
import { WithdrawalListComponent } from './Admin/with-drawal-list/withdrawal-list.component';
import { DirectReferralListComponent } from './Admin/direct-referral-list/direct-referral-list.component';
import { MonthlyBonusesListComponent } from './Admin/monthly-bonuses-list/monthly-bonuses-list.component';
import { GroupBonusesListComponent } from './Admin/group-bonuses-list/group-bonuses-list.component';
import { GenealogyListComponent } from './Admin/genealogy-list/genealogy-list.component';
import { ProfileListComponent } from './Admin/profile-list/profile-list.component';
import { BankDetailAdminFormComponent } from './Admin/bank-list/bank-detail-admin-form/bank-detail-admin-form.component';
import { ContractReportsComponent } from './Admin/contract-reports/contract-reports.component';
import { DepositReportsComponent } from './Admin/deposit-reports/deposit-reports.component';
import { MainWalletReportsComponent } from './Admin/main-wallet-reports/main-wallet-reports.component';
import { WithdrawalReportsComponent } from './Admin/withdrawal-reports/withdrawal-reports.component';
import { DirectReferralAdminFormComponent } from './Admin/direct-referral-list/direct-referral-admin-form/direct-referral-admin-form.component';
import { GenealogyAdminFormComponent } from './Admin/genealogy-list/genealogy-admin-form/genealogy-admin-form.component';
import { GroupBonusesAdminFormComponent } from './Admin/group-bonuses-list/group-bonuses-admin-form/group-bonuses-admin-form.component';
import { MonthlyBonusesAdminFormComponent } from './Admin/monthly-bonuses-list/monthly-bonuses-admin-form/monthly-bonuses-admin-form.component';
import { ProfileAdminFormComponent } from './Admin/profile-list/profile-admin-form/profile-admin-form.component';
import { SupportFormAdminComponent } from './support/support-form-admin/support-form-admin.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { QRCodeModule } from 'angularx-qrcode';
import { UserWithdrawalComponent } from './Admin/user-withdrawal/user-withdrawal.component';
import { BuyContractComponent } from './Admin/admin-dashboard/buy-contract/buy-contract.component';
import { BankAccountWidgetComponent } from './deposit/bank-account-widget/bank-account-widget.component';
import { WeeklyRunReportComponent } from './dashboards/weekly-run-report/weekly-run-report.component';
import { ChangePasswordComponent } from './Admin/admin-dashboard/change-password/change-password.component';

import { NgxCaptchaModule } from 'ngx-captcha';
import { SharedModule } from '../cyptolanding/shared/shared.module';
import { KycGuard } from '../core/guards/kyc.guard';
import { KycComponent } from './Generic/kyc/kyc.component';
import { KycStep2Component } from './Generic/kyc/kyc-step2/kyc-step2.component';
import { KycStep3Component } from './Generic/kyc/kyc-step3/kyc-step3.component';
import { KycStep1Component } from './Generic/kyc/kyc-step1/kyc-step1.component';
import { KycStep4Component } from './Generic/kyc/kyc-step4/kyc-step4.component';
import { SecondaryVerificationComponent } from './user-profile/components/secondary-verification/secondary-verification.component';
import { PrimaryVerificationComponent } from './user-profile/components/primary-verification/primary-verification.component';
import { KycListComponent } from './Admin/kyc-list/kyc-list.component';
import { KycUserProfilePersonalDetailsComponent } from './Admin/kyc-list/pages/kyc-user-profile/components/kyc-user-profile-personal-details/kyc-user-profile-personal-details.component';
import { KycUserProfileComponent } from './Admin/kyc-list/pages/kyc-user-profile/kyc-user-profile.component';
import { KycUserProfilePrimaryComponent } from './Admin/kyc-list/pages/kyc-user-profile/components/kyc-user-profile-primary/kyc-user-profile-primary.component';
import { KycUserProfileSecondaryComponent } from './Admin/kyc-list/pages/kyc-user-profile/components/kyc-user-profile-secondary/kyc-user-profile-secondary.component';
import { SimpleTableComponent } from './Generic/simple-table/simple-table.component';
import { ConsolidatedBonusWalletComponent } from './wallets/consolidated-bonus/consolidated-bonus.component';
import { TransferredConsolidatedBonusWalletComponent } from './wallets/consolidated-bonus/components/for-transfer/transferred-consolidated-bonus.component';
import { UntransferredConsolidatedBonusWalletComponent } from './wallets/consolidated-bonus/components/history/untransferred-consolidated-bonus.component';
import { ComissionListComponent } from './comission-list/comission-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-list/order-details/order-details.component';

const WidgetComponents = [ BuyContractComponent, BankAccountWidgetComponent, ChangePasswordComponent ];
const KycComponents = [ KycComponent, KycStep1Component, KycStep2Component, KycStep3Component, KycStep4Component ];
const Verifications = [ PrimaryVerificationComponent, SecondaryVerificationComponent, 
  KycUserProfileComponent, KycUserProfilePersonalDetailsComponent, KycUserProfilePrimaryComponent, KycUserProfileSecondaryComponent ];
const WalletComponents = [ ConsolidatedBonusWalletComponent, TransferredConsolidatedBonusWalletComponent, UntransferredConsolidatedBonusWalletComponent ];

@NgModule({
  declarations: [ DepositComponent, WithdrawalComponent, 
                  BasicTableComponent, CbTableComponent, DcjPaginationComponent, SupportComponent, SupportFormComponent, 
                  WalletDetailComponent,
                  FormWithdrawComponent, FormDepositComponent, ContractComponent, ContractFormComponent, MatrixScreenComponent, UserProfileComponent, BankDetailsComponent, HomeComponent,
                  BankListComponent, DepoistApprovalFormComponent, WithdrawalApprovalFormComponent, BankDetailsFormComponent, BankDetailAdminFormComponent,ContractReportsComponent, DepositReportsComponent, MainWalletReportsComponent, WithdrawalReportsComponent,
                  UserProfileComponent, BankDetailsComponent, MatrixChartComponent, WalletTransferComponent, BankDetailsFormComponent, DepoistListComponent, WithdrawalListComponent, BankListComponent, DepoistApprovalFormComponent, WithdrawalApprovalFormComponent, 
                  DirectReferralListComponent, MonthlyBonusesListComponent, GroupBonusesListComponent, GenealogyListComponent, ProfileListComponent, DirectReferralAdminFormComponent, GenealogyAdminFormComponent, GroupBonusesAdminFormComponent, 
                  MonthlyBonusesAdminFormComponent, ProfileAdminFormComponent, SupportFormAdminComponent, AdminDashboardComponent, UserWithdrawalComponent, WeeklyRunReportComponent, KycListComponent,
                  ...WidgetComponents, ...KycComponents, ...Verifications, ...WalletComponents, SimpleTableComponent, ComissionListComponent, OrderListComponent, OrderDetailsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    UIModule,
    DashboardsModule,
    HttpClientModule,
    NgxSpinnerModule,
    WidgetModule,
    FullCalendarModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    SimplebarAngularModule,
    LightboxModule,
    PickerModule,
    TranslateModule,
    QRCodeModule,
    NgxCaptchaModule,
    SharedModule
  ],
  providers: [
    DatePipe,
    KycGuard,
  ]  
})
export class PagesModule { }
