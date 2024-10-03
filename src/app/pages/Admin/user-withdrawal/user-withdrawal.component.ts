import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import BankOptions from 'src/app/core/models/bank/bank.model';
import { MainWallet } from 'src/app/core/models/main-wallet.model';
import { BanksService } from 'src/app/core/services/banks.service';
import { WalletsService } from 'src/app/core/services/wallets.service';
import form from './withdrawal.form';
import { WithdrawalService } from 'src/app/core/services/withdrawal.service';
import AdminWithdrawalModel from 'src/app/core/models/withdrawal/admin-withdrawal.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-withdrawal',
  templateUrl: './user-withdrawal.component.html',
  styleUrls: ['./user-withdrawal.component.scss']
})
export class UserWithdrawalComponent implements OnInit {
  protected userId: number = 0;
  protected loadingWallet: boolean = true;
  protected loadingBanks: boolean = true;
  protected isSubmitting: boolean = false;
  protected bankList: BankOptions[] = [];
  protected walletAmount: number = 0.00;
  protected form: FormGroup;

  constructor(private route: ActivatedRoute,
    private banksService: BanksService,
    private walletService: WalletsService,
    private withdrawalService: WithdrawalService,
    private toastr : ToastrService, 
    private formBuilder: FormBuilder) {
      this.bankList = [];
      this.walletAmount = 0.00;
      this.loadingWallet = true;
      this.loadingBanks = true;

      this.form = this.formBuilder.group({ });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.userId = params['id']);

    this.startFetch();
  }

  private startFetch(): void {
    this.getWalletBalance();
    this.getRegisteredBanks();
  }

  private getWalletBalance(): void {
    const success = (response: ApiResponse<MainWallet[]>): void => {
      if(response && response.status === 'success' && response.data.length > 0) {
        this.walletAmount = response.data[0].amount;
      }
    }

    const error = (error: any): void => console.log("Failed to retrieve wallet balance", error);

    const complete = () => {
      this.loadingWallet = false;
      this.initializeForm();
    }

    this.walletService.getMainWalletByUserId(success, error, complete, this.userId);
  }

  private getRegisteredBanks(): void {
    const success = (response: ApiResponse<BankOptions[]>): void => {
      if(response && response.status === 'success') {
        this.bankList = response.data;
      }
    }

    const error = (error: any): void => console.log("Failed to retrieve Bank list", error);

    const complete = () => {
      this.loadingBanks = false;
      this.initializeForm();
    }

    this.banksService.getBankByUserId(success, error, complete, this.userId);
  }

  private initializeForm(): void {
    if(!this.loadingBanks && !this.loadingWallet) {
      this.form = this.formBuilder.group(form(this.bankList, this.walletAmount));
    }
  }

  onChangeEvent(event: any){
    this.form.controls['fee'].setValue(Number(event.target.value) * 0.05);
  }

  protected backToProfiles(): void {
    window.history.back();
  }

  protected showError(key: string, label: string): string {
    const control = this.form!.get(key);
    
    if(control?.hasError('required')) {
      return `${label} is required`;
    }

    if(control?.hasError('minlength')) {
      return `Minimum length for ${label} is not met`;
    }

    if(control?.hasError('maxlength')) {
      return `Max length for ${label} is not met`;
    }

    if(control?.hasError('min')) {
      return `Amount should be atleast 100.00`;
    }

    if(control?.hasError('max')) {
      return `Max value for ${label} exceeded.`;
    }

    if(key === 'category' && control.errors['invalidCategory']) {
      return `The selected category is invalid`;
    }

    if(key === 'bankId' && control.errors['invalidBank']) {
      return `The selected bank is invalid`;
    }

    return "";
  }

  protected isInvalid(key: string): boolean {
    const control = this.form!.get(key);

    if(control.errors) {
      if(key === 'bank' && control.errors) {
        return control.errors['invalidBank'] === true;
      }

      if(key === 'category' && control.errors && control.errors['invalidCategory']) {
        return control.errors['invalidCategory'] === true;
      }
    }

    return (control?.invalid && control?.touched);
  }

  protected formSubmit(): void {
    if(this.form.invalid) return;

    this.isSubmitting = true;
    const data: AdminWithdrawalModel = {...this.form.value, userId: this.userId };

    const success = (response: ApiResponse<null>) => {
      if(response && response.status === 'success') {
        this.toastr.success(`Successfully withdrawn  ${data.amount}`, "Great!");
        this.form.reset();
        this.backToProfiles();
      }
    }

    const error = (error: any) => {
      this.toastr.error("Failed to request withdrawal", "Oops!");
      console.log("Failed to request withdrawal", error);
    }

    const complete = () => this.isSubmitting = false;

    this.withdrawalService.createWithdrawalAdministratorAsync(success, error, complete, data);
  }
}
