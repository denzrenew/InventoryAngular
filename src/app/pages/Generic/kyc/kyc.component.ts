import { Component, OnInit, ViewChild } from '@angular/core';
import StateModel, { InitialData, bankRegistrationForm, personalVerification, primaryVerification, secondaryVerification } from './kyc.state';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth2.service';
import { AccountService } from 'src/app/core/services/account.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import UserProfileModel from 'src/app/core/models/account/user-profile.model';
import { environment } from 'src/environments/environment';
import { KycService } from 'src/app/core/services/kyc.service';
import KycInitialData from 'src/app/core/models/kyc/kyc-initial-data.model';
import { BanksService } from 'src/app/core/services/banks.service';
import BankDetailsModel from 'src/app/core/models/bank/bank-details.model';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import Country from 'src/app/core/models/country';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {
  @ViewChild('kycTabset', { static: false }) kycTabset: TabsetComponent;
  protected state: StateModel;

  constructor(private formBuilder: FormBuilder, 
    private authService: AuthService,
    private accountService: AccountService,
    private kycService: KycService,
    private banksService: BanksService,
    private httpClient: HttpClient) {
    const userDetails = this.authService.getAuthUserDetails();

    this.state = InitialData(this.formBuilder, userDetails);
    this.state.isMobile = window.innerWidth < 768;
    console.log({ isMobile: this.state.isMobile });
  }

  ngOnInit(): void {
    this.retrieveKycData();
    this.retrieveUserDetails();
    this.retrieveBankTypes();
    this.retrieveBankDetails();
  }

  protected retrieveKycData(): void {
    this.state.load.verifications = true;
    
    this.kycService.getInitialData(
      (response: ApiResponse<KycInitialData>) => {
        if(response.status === 'success') {
          this.state.kycModel = response.data;

          if(response.data.primaryVerification && this.state.loading) {
            this.state.tabLocks.primary = false; // Set the lock for the Primary Verification to false
            this.state.primaryVerification = this.formBuilder.group(primaryVerification(response.data.primaryVerification));
          }
          
          if(response.data.secondaryVerification && this.state.loading) {
            this.state.tabLocks.secondary = false; // Set the lock for the Secondary Verification to false
            this.state.secondaryVerification = this.formBuilder.group(secondaryVerification(response.data.secondaryVerification));
          }
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
      },
      () => {
        this.state.loading = false;
        this.state.load.verifications = false;
      },
    )
  }

  protected retrieveUserDetails(): void {
    this.state.load.personalInfo = true;

    this.accountService.viewUserProfile(
      (response: ApiResponse<UserProfileModel>) => {
        if(response.status === "success") {
          this.state.userModel = response.data;
          this.state.personalVerification = this.formBuilder.group(personalVerification(response.data));
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
      },
      () => {
        this.state.loading = false;
        this.state.load.personalInfo = false;
        this.loadCountries();
      },
    )
  }

  protected toFormData(object: any): FormData {
    const identificationIds: string[] = ["IndentificationFront", "IndentificationBack"];

    const formData = new FormData();
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if(identificationIds.includes(key)) {

        }
        formData.append(key, object[key]);
      }
    }
    return formData;
  }

  private retrieveBankTypes(): void {
    this.state.load.bank = true;

    this.banksService.getBankTypes(
      (response: ApiResponse<string[]>) => {
        
        if(response.status === 'success') {
          this.state.bankTypes = response.data;
          this.state.tabLocks.bank = false; // Set the lock for the Bank tab to false
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
      },
      () => { 
        this.state.load.bank = false;
      }
    );
  }

  protected retrieveBankDetails(): void {
    this.banksService.getBanksByUserId(
      (response: ApiResponse<BankDetailsModel[]>) => {
        if(response.status === 'success' && response.totalRecordCount > 0) {
          this.state.bank = response.data[0]; // Get first bank
          this.state.bankRegistration = this.formBuilder.group(bankRegistrationForm(this.state.bank));
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
      },
      () => { }
    )
  }

  private loadCountries(): void {
    const success = (response: Country[]) => {
      this.state.countries = response.filter(i => i.country);
    }

    const error = (error: any) => console.log("Unable to load countries!", error);
    const complete = () => { };

    this.httpClient.get<Country[]>('/assets/countries.json')
      .pipe(finalize(complete))
      .subscribe({ next: success, error });
  }

  private isPersonalDetailsComplete(): boolean {
    const { loading, userModel } = this.state;
    if(loading) { return false; }

    return (userModel?.address
      && userModel?.city
      && userModel?.nationality
      && userModel?.occupation
      && userModel?.state
      && userModel?.zipCode
      && userModel.firstName
      && userModel.lastName
      && userModel.mobile
      && userModel.country) ? true : false;
  }

  /**
   * Retrieves the tab color for "Personal information"
   * @returns 
   */
  protected personalInfoColor(): string {
    const { bank, verifications, personalInfo } = this.state.load;
    if(bank || verifications || personalInfo) return '';

    let status = "incomplete";

    if(this.isPersonalDetailsComplete()) {
      status = "approved";
    }

    return `tab-class ${status}`;
  }

  /**
   * Retrieves the tab color for "Primary Verification"
   * @returns 
   */
  protected primaryStatusColor(): string {
    const { bank, verifications, personalInfo } = this.state.load;
    if(bank || verifications || personalInfo) return '';

    return `tab-class ${this.state.primaryVerificationStatus.toLowerCase()}`;
  }

  /**
   * Retrieves the tab color for "Secondary Verification"
   * @returns 
   */
  protected secondaryStatusColor(): string {
    const { bank, verifications, personalInfo } = this.state.load;
    if(bank || verifications || personalInfo) return '';

    return `tab-class ${this.state.secondaryVerificationStatus.toLowerCase()}`;
  }

  /**
   * Retrieves the tab color for "Add a Bank"
   * @returns 
   */
  protected bankStatusColor(): string {
    const { bank, verifications, personalInfo } = this.state.load;
    if(bank || verifications || personalInfo) return '';

    let status = "incomplete";
    
    if(this.state.bank) {
      status = "approved";
    }

    return `tab-class ${status}`;
  }

}
