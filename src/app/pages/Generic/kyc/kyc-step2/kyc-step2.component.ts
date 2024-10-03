import { Component, Input } from '@angular/core';
import StateModel from '../kyc.state';
import { KycService } from 'src/app/core/services/kyc.service';
import { ToastrService } from 'ngx-toastr';
import { PrimaryVerificationModel } from 'src/app/core/models/kyc/kyc-initial-data.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { environment } from 'src/environments/environment';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-kyc-step2',
  templateUrl: './kyc-step2.component.html',
  styleUrls: ['./kyc-step2.component.scss']
})
export class KycStep2Component {
  @Input() state!: StateModel;
  @Input() toFormData!: Function;
  @Input() retrieveKYCData!: Function;
  @Input() parentTab: TabsetComponent;
  private identificationFront?: File;
  private identificationBack?: File;

  constructor(private kycService: KycService,
    private toastService: ToastrService) { }

  protected async submitHandler() {
    if(this.state.primaryVerification.invalid) {
      return;
    }

    if(this.formIsCompleted() && !this.formHasModifications()) {
      this.parentTab.tabs[2].active = true; // Move to the next tab
      return;
    }

    this.state.isSubmitting.primaryVerification = true;
    this.state.tabLocks.secondary = false; // Set the lock for the Secondary Verification to false

    const data: PrimaryVerificationModel = this.state.primaryVerification.value;

    const frontIdAsb64String = await this.convertToBlob(this.identificationFront);
    const backIdAsb64String = await this.convertToBlob(this.identificationBack);

    const frontIdBlob = new Blob([frontIdAsb64String], { type: this.identificationFront.type });
    const backIdBlob = new Blob([backIdAsb64String], { type: this.identificationBack.type });

    const formData: FormData = this.toFormData(data);
    formData.append("IndentificationFront", frontIdBlob, this.identificationFront.name);
    formData.append("IndentificationBack", backIdBlob, this.identificationBack.name);

    // Crete data if there are still no Primary Verificaiton data details
    if(!this.state.kycModel.primaryVerification) {
      this.kycService.createPrimaryIdentification(
        (response: ApiResponse<null>) => {
          if(response.status == 'success') {
            this.toastService.success("Primary KYC information was successfully created!");
            this.parentTab.tabs[2].active = true; // Move to the next tab
          } else {
            this.toastService.error("Failed to create your Primary Verification information!");
          }
        },
        (error: any) => {
          if(!environment.production) console.log(error);
          this.toastService.error("There was a problem with your request.")
        },
        () => {
          this.retrieveKYCData();
          this.state.isSubmitting.primaryVerification = false;
        },
        formData
      )
    } else {
      this.kycService.updatePrimaryIdentification(
        (response: ApiResponse<null>) => {
          if(response.status == 'success') {
            this.toastService.success("Primary KYC information successfully updated!");
            this.parentTab.tabs[2].active = true; // Move to the next tab
          } else {
            this.toastService.error("Failed to update your Primary Verification information!");
          }
        },
        (error: any) => {
          if(!environment.production) console.log(error);
          this.toastService.error("There was a problem with your request.")
        },
        () => {
          this.retrieveKYCData();
          this.state.isSubmitting.primaryVerification = false
        },
        formData
      )
    }
    
  }

  // Example method to handle file input change
  protected onFileSelected(event: any, formControlName: string) {
    const file: File = event.target.files[0];
    
    if (file) {
      if(formControlName === 'IndentificationFront') {
        this.identificationFront = file;
      } else {
        this.identificationBack = file;
      }
    }
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

  protected formIsCompleted(): boolean {
    return ["COMPLETED", "APPROVED"].includes(this.state.primaryVerificationStatus?.toUpperCase());
  }

  protected formHasModifications(): boolean {
    const { touched, dirty } = this.state.primaryVerification;

    return (touched || dirty);
  }
}