import { AuthenticationService } from './../../../../core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import StateModel from '../kyc.state';
import NewBankPayload from 'src/app/core/models/bank/new-bank-payload.model';
import { BanksService } from 'src/app/core/services/banks.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { environment } from 'src/environments/environment';
import UpdateBankPayload from 'src/app/core/models/bank/update-bank-payload.model';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc-step4',
  templateUrl: './kyc-step4.component.html',
  styleUrls: ['./kyc-step4.component.scss']
})
export class KycStep4Component implements OnInit {
  @Input() state!: StateModel;
  @Input() retrieveBankDetails!: Function;
  @Input() parentTab: TabsetComponent;
  protected hasOtpRequested: boolean = false;
  protected isRequestingOTP: boolean = false;

  constructor(private banksService: BanksService,
    private toastService: ToastrService,
    private authFackservice: AuthfakeauthenticationService,
    private router: Router) {

  }

  ngOnInit(): void {

  }

  protected submitHandler(): void {
    if(this.state.bankRegistration.invalid) {
      return;
    }

    this.state.isSubmitting.bankRegistration = true;

    // Create new bank details. Add only
    if(!this.state.bank) {

      const data: NewBankPayload = this.state.bankRegistration.value;

      this.banksService.createBankAsyncNoOtp(
        (response: ApiResponse<null>) => {
          if(response.status === 'success') {
            this.toastService.success("Bank details successfully registered! <br/> Please login to continue");
            this.authFackservice.logout();
            this.router.navigate(['/account/login']);
          } else {
            this.toastService.error("Failed to register bank details!");
          }
        },
        (error: any) => {
          if(!environment.production) console.log(error);
          this.toastService.error("There was a problem with your bank registration request");
        },
        () => {
          this.retrieveBankDetails();
          this.state.isSubmitting.bankRegistration = false;
        },
        data
      );
    }
  }

  protected getOTPPlaceholder(): string {
    if(this.isRequestingOTP) {
      return `Requesting OTP...`;
    }

    if(this.state.retrievedOTP && this.hasOtpRequested) {
      return `Place your OTP here!`;
    }

    return 'Request another OTP!';
  }
}
