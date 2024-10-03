import { Component, Input } from '@angular/core';
import StateModel from '../kyc.state';
import { AccountService } from 'src/app/core/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { environment } from 'src/environments/environment';
import UpdateUser from 'src/app/core/models/account/update-user.model';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-kyc-step1',
  templateUrl: './kyc-step1.component.html',
  styleUrls: ['./kyc-step1.component.scss']
})
export class KycStep1Component {
  @Input() state!: StateModel;
  @Input() retrieveUserData!: Function;
  @Input() toFormData!: Function;
  @Input() parentTab: TabsetComponent;
  private profilePicture?: File;

  constructor(private accountService: AccountService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder) { }

  protected async submitHandler(): Promise<void> {
    if(this.state.personalVerification?.invalid) {
      return;
    }
    
    this.state.tabLocks.primary = false; // Set the lock for the Primary Verification to false

    // if(!this.formHasModifications()) {
    //   this.parentTab.tabs[1].active = true; // Move to the next tab
    //   return;
    // }

    this.state.isSubmitting.personalInfo = true;

    const data: UpdateUser = this.state.personalVerification!.value;
    data.isActive = true;

    const profilePictureb64String = await this.convertToBlob(this.profilePicture);

    const profilePictureBlob = new Blob([profilePictureb64String], { type: this.profilePicture.type });

    const formData: FormData = this.toFormData(data);
    formData.append("attachment", profilePictureBlob, this.profilePicture.name);

    this.accountService.updateProfile(
      (response: ApiResponse<null>) => {
        if(response.status === 'success') {
          this.toastService.success("Successfully updated Personal information!");
          this.parentTab.tabs[1].active = true; // Move to the next tab
        } else {
          this.toastService.error("Failed updated Personal information!");
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("There was a problem while updating your personal information!");
      },
      () => {
        this.retrieveUserData();
        this.state.isSubmitting.personalInfo = false;
      },
      data,
      true
    );
  }

  protected isPersonalDetailsComplete(): boolean {
    const { loading, userModel } = this.state;
    if(loading) { return false; }

    return (userModel.address
      && userModel.city
      && userModel.nationality
      && userModel.occupation
      && userModel.state
      && userModel.zipCode
      && userModel.firstName
      && userModel.lastName
      && userModel.mobile
      && userModel.country) ? true : false;
  }

  protected getCountryCode(): string {
    const selectedCountry = this.state.personalVerification.controls['country']?.value;
    if(selectedCountry) {
      const dialCode = this.state.countries.find(i => i.country === selectedCountry)?.dial_code;

      if(dialCode) return dialCode;
    }
    
    return "---";
  }

  private formHasModifications(): boolean {
    const { touched, dirty } = this.state.personalVerification;

    return this.isPersonalDetailsComplete() && (touched || dirty);
  }

  // Function to convert file to Base64
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

  protected onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.profilePicture = file;
    }
  }

}
