import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { FormDepositComponent } from './deposit/form-deposit/form-deposit.component';
import { SupportFormComponent } from './support/support-form/support-form.component';
import { ContractFormComponent } from './contract/contract-form/contract-form.component';
import { WalletDetailComponent } from './wallet-detail/wallet-detail.component';
import { FormWithdrawComponent } from './withdrawal/form-withdraw/form-withdraw.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { MatrixScreenComponent } from './matrix-screen/matrix-screen.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { WalletTransferComponent } from './wallet-detail/wallet-transfer/wallet-transfer.component';
import { BankDetailsFormComponent } from './bank-details/bank-details-form/bank-details-form.component';
import { DepoistListComponent } from './Admin/depoist-list/depoist-list.component';
import { WithdrawalListComponent } from './Admin/with-drawal-list/withdrawal-list.component';
import { BankListComponent } from './Admin/bank-list/bank-list.component';
import { DepoistApprovalFormComponent } from './Admin/depoist-list/depoist-approval-form/depoist-approval-form.component';
import { WithdrawalApprovalFormComponent } from './Admin/with-drawal-list/withdrawal-approval-form/withdrawal-approval-form.component';
import { DirectReferralListComponent } from './Admin/direct-referral-list/direct-referral-list.component';
import { MonthlyBonusesListComponent } from './Admin/monthly-bonuses-list/monthly-bonuses-list.component';
import { GroupBonusesListComponent } from './Admin/group-bonuses-list/group-bonuses-list.component';
import { GenealogyListComponent } from './Admin/genealogy-list/genealogy-list.component';
import { ProfileListComponent } from './Admin/profile-list/profile-list.component';
import { BankDetailAdminFormComponent } from './Admin/bank-list/bank-detail-admin-form/bank-detail-admin-form.component';
import { WithdrawalReportsComponent } from './Admin/withdrawal-reports/withdrawal-reports.component';
import { MainWalletReportsComponent } from './Admin/main-wallet-reports/main-wallet-reports.component';
import { DepositReportsComponent } from './Admin/deposit-reports/deposit-reports.component';
import { ContractReportsComponent } from './Admin/contract-reports/contract-reports.component';
import { DirectReferralAdminFormComponent } from './Admin/direct-referral-list/direct-referral-admin-form/direct-referral-admin-form.component';
import { GenealogyAdminFormComponent } from './Admin/genealogy-list/genealogy-admin-form/genealogy-admin-form.component';
import { GroupBonusesAdminFormComponent } from './Admin/group-bonuses-list/group-bonuses-admin-form/group-bonuses-admin-form.component';
import { MonthlyBonusesAdminFormComponent } from './Admin/monthly-bonuses-list/monthly-bonuses-admin-form/monthly-bonuses-admin-form.component';
import { ProfileAdminFormComponent } from './Admin/profile-list/profile-admin-form/profile-admin-form.component';
import { SupportFormAdminComponent } from './support/support-form-admin/support-form-admin.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { UserWithdrawalComponent } from './Admin/user-withdrawal/user-withdrawal.component';
import { WeeklyRunReportComponent } from './dashboards/weekly-run-report/weekly-run-report.component';
import { KycComponent } from './Generic/kyc/kyc.component';
import { KycGuard } from '../core/guards/kyc.guard';
import { KycListComponent } from './Admin/kyc-list/kyc-list.component';
import { KycUserProfileComponent } from './Admin/kyc-list/pages/kyc-user-profile/kyc-user-profile.component';
import { ConsolidatedBonusWalletComponent } from './wallets/consolidated-bonus/consolidated-bonus.component';
import { ComissionListComponent } from './comission-list/comission-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-list/order-details/order-details.component';

const routes: Routes = [
  { path: "", component: DefaultComponent, canActivate: [KycGuard] },
  { path: 'dashboard', component: DefaultComponent, canActivate: [KycGuard] },
  { path: 'home', component: HomeComponent, canActivate: [KycGuard] },
  { path: 'deposit', component: DepositComponent, canActivate: [KycGuard] },
  { path: 'deposit-admin', component: DepoistListComponent, canActivate: [KycGuard] },
  { path: 'deposit-admin-form', component: DepoistApprovalFormComponent, canActivate: [KycGuard] },
  { path: 'withdrawal-admin', component: WithdrawalListComponent, canActivate: [KycGuard] },
  { path: 'withdrawal-admin-form', component: WithdrawalApprovalFormComponent, canActivate: [KycGuard] },
  { path: 'bank-admin', component: BankListComponent, canActivate: [KycGuard] },
  { path: 'bank-detail-admin-form', component: BankDetailAdminFormComponent, canActivate: [KycGuard] },
  { path: 'bankdetails', component: BankDetailsComponent, canActivate: [KycGuard] },
  { path: 'bankDetailsForm', component: BankDetailsFormComponent, canActivate: [KycGuard] },
  { path: 'comissionlist', component: ComissionListComponent, canActivate: [KycGuard] },
  { path: 'orderlist', component: OrderListComponent, canActivate: [KycGuard] },
  { path: 'orderdetail', component: OrderDetailsComponent, canActivate: [KycGuard] },
  { path: 'matrix', component: MatrixScreenComponent, canActivate: [KycGuard] },
  { path: 'userprofile', component: UserProfileComponent, canActivate: [KycGuard] },
  { path: 'depositform', component: FormDepositComponent, canActivate: [KycGuard] },
  { path: 'withdrawal', component: WithdrawalComponent, canActivate: [KycGuard] },
  { path: 'RwalletDetails/:id', component: WalletDetailComponent, canActivate: [KycGuard] },
  { path: 'UwalletDetails/:id', component: WalletDetailComponent, canActivate: [KycGuard] },
  { path: 'FwalletDetails/:id', component: WalletDetailComponent, canActivate: [KycGuard] },
  { path: 'SwalletDetails/:id', component: WalletDetailComponent, canActivate: [KycGuard] },
  { path: 'GwalletDetails/:id', component: WalletDetailComponent, canActivate: [KycGuard] },
  { path: 'PwalletDetails/:id', component: WalletDetailComponent, canActivate: [KycGuard] },
  { path: 'DWallet-form', component: WalletTransferComponent, canActivate: [KycGuard] },
  { path: 'MWallet-form', component: WalletTransferComponent, canActivate: [KycGuard] },
  { path: 'GWallet-form', component: WalletTransferComponent, canActivate: [KycGuard] },
  { path: 'withdrawalform', component: FormWithdrawComponent, canActivate: [KycGuard] },
  { path: 'support-form', component: SupportFormComponent, canActivate: [KycGuard] },
  { path: 'manageContract/:id', component: ContractFormComponent, canActivate: [KycGuard] },
  { path: 'withdrawal/user/:id', component: UserWithdrawalComponent, canActivate: [KycGuard] },
  { path: 'weekly-run/report', component: WeeklyRunReportComponent, canActivate: [KycGuard] },
  { path: 'weekly-run/report/:userId', component: WeeklyRunReportComponent, canActivate: [KycGuard] },

  // Reports
  { path: 'reports/contracts', component: ContractReportsComponent, canActivate: [KycGuard] },
  { path: 'reports/deposit', component: DepositReportsComponent, canActivate: [KycGuard] },
  { path: 'reports/main-wallet', component: MainWalletReportsComponent, canActivate: [KycGuard] },
  { path: 'reports/withdrawal', component: WithdrawalReportsComponent, canActivate: [KycGuard] },
  { path: 'all-direct-referral', component: DirectReferralListComponent, canActivate: [KycGuard] },
  { path: 'all-monthly-bonuses', component: MonthlyBonusesListComponent, canActivate: [KycGuard] },
  { path: 'all-consolidated-bonuses', component: GroupBonusesListComponent, canActivate: [KycGuard] },
  { path: 'all-genealogy', component: GenealogyListComponent, canActivate: [KycGuard] },
  { path: 'all-profile', component: ProfileListComponent, canActivate: [KycGuard] },
  { path: 'direct-bonus-form', component: DirectReferralAdminFormComponent, canActivate: [KycGuard] },
  { path: 'genealogy-form', component: GenealogyAdminFormComponent, canActivate: [KycGuard] },
  { path: 'group-bonus-form', component: GroupBonusesAdminFormComponent, canActivate: [KycGuard] },
  { path: 'monthly-bonuses-form', component: MonthlyBonusesAdminFormComponent, canActivate: [KycGuard] },
  { path: 'profile-detail-form', component: ProfileAdminFormComponent, canActivate: [KycGuard] },
  { path: 'all-help-and-support', component: SupportFormAdminComponent, canActivate: [KycGuard] },
  { path: 'admin/dashboard/:id', component: AdminDashboardComponent, canActivate: [KycGuard] },
  // { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },

  { path: 'wallet/consolidated', component: ConsolidatedBonusWalletComponent, canActivate: [KycGuard] },

  { path: 'kyc', component: KycComponent, canActivate: [KycGuard] },
  { path: 'kyc-list', component: KycListComponent, canActivate: [KycGuard] },
  { path: 'kyc-list/user/:userId', component: KycUserProfileComponent, canActivate: [KycGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
