import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { finalize, first } from 'rxjs';
import Swal from 'sweetalert2';

import { ApiResponse } from 'src/app/core/models/api-response.model';
import { AccountService } from 'src/app/core/services/account.service';
import UserProfileModel from 'src/app/core/models/account/user-profile.model';
import UpdateUser from 'src/app/core/models/account/update-user.model';
import Country from 'src/app/core/models/country';

import { getUserUpdateFormGroup, setValidCountries, getUpdateReferralFormGroup, getChangePassFormGroup, passwordMatchValidator } from './user-profile.form-group';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/core/services/auth2.service';
import { DomSanitizer } from '@angular/platform-browser';

const REFERRAL_CODE_USED = "Referral code already in use";
const SUCCESS = "Success";
const ERROR = "Error";
const IN_PROGRESS = "In Progress";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isLoading: boolean = true;
  private attachment?: File;
  isFileExist: boolean = false;
  isEdit: boolean = false;
  isUpdating: boolean = false;
  isModalSubmitting: boolean = false;
  isCountriesLoaded: boolean = false;
  isRetrievingOTP: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  enable2fa: boolean = false;

  modalRef?: BsModalRef;
  userProfile?: UserProfileModel;
  form: FormGroup;
  updateReferralForm: FormGroup;
  changePassForm: FormGroup;
  countries: Country[] = []
  maxDate: string = ""
  minDate: string = "";
  countrySrc: string = "";

  otpRequestMessage: string = "";
  otpRequestResponse: string = "";
  image: any;
  /**
   *
   */
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private sanitizer:DomSanitizer,
    private datePipe: DatePipe,
    private httpClient: HttpClient,
    private modalService: BsModalService,
    private toastService: ToastrService) { 
    const options = { validator: passwordMatchValidator, };

    this.form = this.formBuilder.group({});
    this.updateReferralForm = this.formBuilder.group(getUpdateReferralFormGroup());
    this.changePassForm = this.formBuilder.group(getChangePassFormGroup(), options as AbstractControlOptions);
  }

  ngOnInit(): void {
    this.loadCountries();
    const dtMax = new Date();
    const dtMin = new Date();
    this.isModalSubmitting = false;
    
    this.maxDate = this.getInputDate(dtMax.setFullYear(dtMax.getFullYear() - 16).toString());
    this.minDate = this.getInputDate(dtMin.setFullYear(dtMin.getFullYear() - 120).toString());
  }

  private loadCountries(): void {
    const success = (response: Country[]) => {
      this.countries = response;
      setValidCountries(response);
    }

    const error = (error: any) => console.log("Unable to load countries!");
    const complete = () => { 
      this.isCountriesLoaded = true; 
      if(!this.isLoading && !this.countrySrc) {
        this.countrySrc = this.countries.find(i => i.country === this.userProfile.country)?.flag;
      }
      
      this.getUserProfile();
      this.getuserProfileImage();
    };

    this.httpClient.get<Country[]>('/assets/countries.json')
      .pipe(finalize(complete))
      .subscribe({ next: success, error });
  }

  private getUserProfile(): void {

    const success = (response: ApiResponse<UserProfileModel>) => {
      if(response && response.status === 'success') {
        this.userProfile = response.data;
        this.enable2fa = response.data.hasTwoAuth ?? false;
        this.form = this.formBuilder.group(getUserUpdateFormGroup(response.data));

      }
    }

    const error = (error: any) => { console.log("Error while retrieving the User's Profile"); }
    const complete = () => {
      this.isLoading = false;
      if(this.isCountriesLoaded && !this.countrySrc) {
        this.countrySrc = this.countries.find(i => i.country === this.userProfile.country)?.flag;
      }
    }

    this.accountService.viewUserProfile(success, error, complete);
  }


  getSubscriptionImage(): string {
    return this.userProfile && this.userProfile.accountType ? `assets/logos/${this.userProfile.accountType.toLowerCase()}.png` : "assets/logos/admin.png";
  }

  getuserProfileImage(): void {

    this.isLoading = true;
    const formData = new FormData();
    formData.append("userId", '0');
    this.accountService.getProfileImage(formData)
    .pipe(first())
    .subscribe(
      data => {
        let contentType = data.headers.get('Content-Type');
        let options = !!contentType ? { type: contentType } : {};
        let blob = new Blob(!!data.body ? [data.body] : undefined, options);
        let objectURL = URL.createObjectURL(blob);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.isLoading = false;
      },
      error => {

      });

  }

  getInputDate(value: string, format: string = "yyyy-MM-dd"): string {
    return this.datePipe.transform(value, format);
  }

  showError(key: string, form: FormGroup): string {
    const control = form!.get(key);
    const label = this.uniformWords(key);
    
    if(control?.hasError('required')) {
      return `${label} is required`;
    }

    if(control?.hasError('minlength')) {
      return `Minimum length for ${label} is not met`;
    }

    if(control?.hasError('maxlength')) {
      return `Max length for ${label} is not met`;
    }

    if(key == 'birthDate') {
      if(control.errors['maxDate']) {
        return `Your age should be atleast 16`;
      }

      if(control.errors['minDate']) {
        return `Invalid birth date`;
      }
    }

    if(key === 'mobile' && control.errors['invalidMobileNumber']) {
      return `Accepted values are numbers and ()+-`;
    }

    if(key === 'country' && control.errors['invalidCountry']) {
      return `Invalid country`;
    }

    // In use is placed manually after API call
    if(key === 'newReferralCode' && control.errors['inUse']) {
      return REFERRAL_CODE_USED;
    }

    if(key === 'confirmNewPassword' || key === 'newPassword') {
      const isPasswordMismatch = control.errors['passwordMismatch'] === true;
      return `The passwords do not match`;
    }

    return "";
  }

  isInvalid(key: string, form: FormGroup): boolean {
    const control = form!.get(key);

    if(control.errors) {
      if(key === 'birthDate' && control.errors) {
        return control.errors['maxDate'] === true || control.errors['minDate'] === true;
      }
  
      if(key === 'country') {
        return control.errors['invalidCountry'] === true;
      }

      if(key === 'confirmNewPassword' || key === 'newPassword') {
        const isPasswordMismatch = control.errors['passwordMismatch'] === true;
        if(isPasswordMismatch) {
          return true;
        }
      }

      if(key === 'mobile') {
        const isInvalidMobileNumber = control.errors['invalidMobileNumber'] === true;
        if(isInvalidMobileNumber) {
          return true;
        }
      }
    }

    return (control?.invalid && control?.touched);
  }

  uniformWords(words: string): string {
    const transformedText = words.replace(/([a-z])([A-Z])/g, '$1 $2');
    return transformedText.charAt(0).toUpperCase() + transformedText.slice(1);
  }

  changeBirthday($event: Event): void {
    const target: any = $event.target;
    const value: any = target.value;
    const { [0]: year, [1]: month, [2]: day} = value.split("-");
    const date = new Date(year, month - 1, day);
    
    this.form.get('birthDate')?.setValue(date);
  }

  changeCountry($event: Event): void {
    const target: any = $event.target;
    const value: any = target.value;
    const country = this.countries.find(i => i.country === value);

    this.form.get('country')?.setValue(value);
    this.form.get('countryCode')?.setValue(country.code);
  }

  protected convertToBlob(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
      const reader = new FileReader();

      // When the file is read successfully
      reader.onloadend = () => {
          // Retrieve the file content as a Blob
          const blob = new Blob([reader.result], { type: file.type });
          resolve(blob);
      };

      // If there's an error reading the file
      reader.onerror = (error) => {
          reject(error);
      };

      // Read the file content as a Blob
      reader.readAsArrayBuffer(file);
    });
  }

  protected async updatePersonalDetails(): Promise<void> {
    this.isUpdating = true;
    let filename = "";
    const data: UpdateUser = this.form.value;

    const success = (response: ApiResponse<null>) => {
      if(response && response.status === 'success') {
        this.isEdit = false;
        this.userProfile = { ...this.userProfile, ...this.form.value, ...{ hasTwoAuth: this.enable2fa } };
        this.countrySrc = this.countries.find(i => i.country === this.userProfile.country)?.flag;

        this.toastService.success("Account updated successfully!", "Nice! 🙌");
      } else {
        this.toastService.warning("Something seems off", "Something's off 😞")
      }
    }

    const error = (error: any) => { 
      console.log("Error updating data"); 
      this.toastService.error("There was a problem in your request, try again later.", "Apologies! 😓");
    }
    const complete = () => {
      this.isUpdating = false;
      this.getuserProfileImage();
    }

    if (!this.isFileExist) {
      filename = "";
      this.accountService.updateProfile(success, error, complete, { ...data, ...{ hasTwoAuth: this.enable2fa } } , true);
    } else {
      filename = this.attachment.name;
      const attachment64String = await this.convertToBlob(this.attachment);
      const attachBlob = new Blob([attachment64String], { type: this.attachment.type });
      this.accountService.updateProfileWithAttachment(success, error, complete, { ...data, ...{ hasTwoAuth: this.enable2fa } } , true, attachBlob, filename);
    }
    
  }

  updateReferralCode(): void {
    this.isModalSubmitting = true;
    const newReferralCode = this.updateReferralForm.value['newReferralCode'];

    const success = (response: ApiResponse<null>) => {
      if(response && response.status === 'success') {
        Swal.fire({
          title: 'Yay!', 
          html: `<span class='text-info'>You have successfully changed your referral code!</span>`,
          icon: 'success',
          timer: 4000,
          confirmButtonText: `Great!`
        });

        this.userProfile.referralCode = newReferralCode;
      } else {
        Swal.fire({
          title: `Ooohhh`, 
          html: `<span class='text-info'>It seems that we're unable to process your request, for now. Kindly try again later.</span>`,
          icon: 'warning',            
          timer: 4000,
          confirmButtonText: `Okay`
        });
      }

      this.closeModal();
    }

    const error = (error: any) => {
      // If in use, just display the error message
      if(error && error.toUpperCase() === REFERRAL_CODE_USED.toUpperCase()) {
        this.updateReferralForm.get('newReferralCode')?.setErrors({ inUse: true });
      } else {
        Swal.fire({
          title: 'Oops!', 
          html: `<span class='text-info'>There was an error in your request. Please try again a little later.</span>`,
          icon: 'error',
          timer: 4000,
          confirmButtonText: `Okay`
        });

        this.closeModal();
      }      
    }

    const complete = () => { this.isModalSubmitting = false; }

    this.accountService.updateReferralCode(success, error, complete, newReferralCode);
  }

  updatePassword(): void {
    this.isModalSubmitting = true;
    
    const success = (response: ApiResponse<null>) => {
      if(response && response.status === 'success') {
        Swal.fire({
          title: 'Hooray!', 
          html: `<span class='text-info'>You have successfully updated your password!</span>`,
          icon: 'success',
          timer: 4000,
          confirmButtonText: `Nice!`
        });
      } else {
        Swal.fire({
          title: `Ooohhh`, 
          html: `<span class='text-info'>It seems that we're unable to process your request, for now. Kindly try again later.</span>`,
          icon: 'warning',
          timer: 4000,
          confirmButtonText: `Okay`
        });
      }

      this.changePassForm.reset();
      this.closeModal();
    }

    const error = (error: any) => {
      console.log("ERROR IN UPDATE PASSWORD", error);
      Swal.fire({
        title: 'Oops!', 
        html: `<span class='text-info'>There was an error in your request. Please try again a little later.</span>`,
        icon: 'error',
        timer: 4000,
        confirmButtonText: `Okay`
      });
    }

    const complete = () => {
      this.isModalSubmitting = false;
      this.otpRequestResponse = IN_PROGRESS;
    }

    this.authService.ChangePassword(success, error, complete, this.changePassForm.value);
  }

  getUserInitials(): string {
    const { firstName, lastName } = this.userProfile;

    if(firstName && lastName) {
      return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }

    return '';
  }

  /**
   * Shows the update referral modal
   * @param templateRef 
   */
  showUpdateReferralModal(templateRef: any): void {
    this.modalRef = this.modalService.show(templateRef, { class: 'modal-sm' });
  }

  /**
   * Shows the change password modal
   * @param templateRef 
   */
  showChangePasswordModal(templateRef: any): void {
    this.isModalSubmitting = false;
    this.modalRef = this.modalService.show(templateRef, { class: 'modal-sm' });
  }

  /**
   * Hides the currently active modal
   */
  closeModal(): void {
    this.modalRef?.hide();
  }

  protected async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.attachment = file;
      this.isFileExist = true;
    } else  {
      this.isFileExist = false;
    }
  }
}
