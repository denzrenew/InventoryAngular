import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { WithdrawService } from 'src/app/core/services/withdraw.service';
import { ApiResponse } from '../../dashboards/default/interfaces/response.interface';
import { MainWallet } from 'src/app/core/models/main-wallet.model';
import { WalletsService } from 'src/app/core/services/wallets.service';

@Component({
  selector: 'app-form-withdraw',
  templateUrl: './form-withdraw.component.html',
  styleUrls: ['./form-withdraw.component.scss']
})
export class FormWithdrawComponent {
  formId:String = "";
  error:any = '';
  successMessage:any = false;
  submitted:any = false;
  isOTPSent: boolean = false;
  bankoptions?: BankOptions[];
  walletAmount:Number = 0.00;
  form: UntypedFormGroup;
  selectedBank?: BankOptions;

  constructor(private toastr : ToastrService ,
     private formBuilder: UntypedFormBuilder, 
     private route: ActivatedRoute, 
     private router: Router, 
     private walletService: WalletsService,
     private withdrawalService: WithdrawService,
     private spinner: NgxSpinnerService){

  }
  ngOnInit() {

    this.route.queryParams
    .subscribe(params => {      
      this.formId = params['id'] ?? 'new'            
    }
  );
  this.getWalletBalance();
   this.withdrawalService.getBankList().subscribe((d:any)=>{ 
    this.bankoptions = d.data
   }); 

    this.form = this.formBuilder.group({
      withdrawalCategory: ['None',Validators.compose([Validators.required])],
      withdrawalAmount: ['0.00', Validators.compose([Validators.required])],
      withdrawalDetails: ['', Validators.compose([Validators.required])],
      bankOption: ['None', Validators.compose([Validators.required])],
      withdrawalFee: ['0.00', Validators.compose([Validators.required])],
      totalWithdrawal: ['0.00', Validators.compose([Validators.required])]
    });


  }

  get f() { return this.form.controls; }

  validateForm(): boolean{
    let valid = true;
    this.error = ''
    if (this.form.controls["withdrawalCategory"].value === 'None' || this.form.controls["withdrawalCategory"].value == '')    {
      this.error = 'Withdrawal category is required. Please select withdrawal category.';
      valid = false  
      return valid;
    }

    if (this.form.controls["bankOption"].value === 'None') {
      this.error = 'Bank is Required.';
      valid = false   
      return valid;
    }

    let amount = this.form.controls["withdrawalAmount"].value
    if(amount.toString().length > 7){
      this.error = 'You have entered the maximum amount allowed for withdrawal.';
      valid = false  
      return valid;
    } else if(amount < 100 || amount > 25000 ){
      this.error = 'Minimum withdrawal is 100.00 and the maximum is 25,000.00';
      valid = false  
      return valid;
    } else {
      if (Number(amount) < 10 )    {
        this.error = 'Minimum amount is 10. Please enter your withdrawal amount to proceed.';
        valid = false   
        return valid;
      }
    }

    let details = this.form.controls["withdrawalDetails"].value;
    if (details === '')    {

    } else {
      if (details.length > 255){
        this.error = 'Your details has exceeded tha maximum allowed characters';
        valid = false   
        return valid;
      }
    }
    return valid
  }

  onChangeEvent(event: any){

    let withdrawalFee = 0;
    let withdrawalAmount = Number(event.target.value);
    withdrawalFee = 0.03 * withdrawalAmount
    this.form.controls['withdrawalFee'].setValue(withdrawalFee);
    this.form.controls['totalWithdrawal'].setValue( withdrawalAmount - withdrawalFee);
    
  }

  changeBank(event: any): void {
    const { value } = event.target;

    this.selectedBank = this.bankoptions.find(i => i.id == value);
  }
  getCurrentTime(): Date {
    return new Date();
  }

  onSubmit(){
    this.spinner.show();
    this.submitted = true;

    const hours = new Date().getHours();

    if (hours >= 8 && hours < 17) {

    } else {
      this.toastr.error('Office Hours Validation', 'You can only withdraw between 8am to 5pm', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      });
      return;
    }


    if (!this.validateForm()) {
      return;
    }
    if(this.formId == 'new'){

      let body = {
        category: this.form.controls["withdrawalCategory"].value,
        details: this.form.controls["withdrawalDetails"].value,
        amount: Number(this.form.controls["totalWithdrawal"].value),
        fee: Number(this.form.controls["withdrawalFee"].value),
        bankId: Number(this.form.controls["bankOption"].value)
      }

      this.withdrawalService.createWithdrawal(body)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Successfully Saved!', 'Saving Record', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.router.navigate(['/withdrawal']);
          if (this.successMessage) {
            this.formId = 'saved';
            this.error = null;
          }
          this.spinner.hide();
        },
        error => {
          if(error === 'Invalid transaction') {
            this.error = error + ". Bad request or not enough funds.";
          } else {
            this.error = error ? error : "Bad request or not enough funds.";
          }
          this.spinner.hide();
        });
    }
  }

  onBackClick(){
    this.router.navigate(['/withdrawal']);
  }

  private getWalletBalance(): void {
    const success = (response: ApiResponse<MainWallet[]>): void => {
      if(response && response.status === 'success' && response.data.length > 0) {
        this.walletAmount = response.data[0].amount;
        console.log(this.walletAmount)
      }
    }

    const error = (error: any): void => console.log("Failed to retrieve wallet balance", error);

    const complete = () => {

    }

    this.walletService.getMainWalletByUserId(success, error, complete);
  }
  
}

export interface BankOptions {
  bankName: string;
  bankBranch: string;
  bsb: string;
  accountNumber: string;
  id: number;
}
