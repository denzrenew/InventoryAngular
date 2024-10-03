import { Component, Input } from '@angular/core';
import StateModel from '../kyc.state';
import { KycService } from 'src/app/core/services/kyc.service';
import { ToastrService } from 'ngx-toastr';
import { SecondaryVerificationModel } from 'src/app/core/models/kyc/kyc-initial-data.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { environment } from 'src/environments/environment';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-kyc-step3',
  templateUrl: './kyc-step3.component.html',
  styleUrls: ['./kyc-step3.component.scss']
})
export class KycStep3Component {
  @Input() state!: StateModel;
  @Input() toFormData!: Function;
  @Input() retrieveKYCData!: Function;
  @Input() parentTab: TabsetComponent;
  private identificationFront?: File;
  private identificationBack?: File;

  constructor(private kycService: KycService,
    private toastService: ToastrService) { }

  protected async submitHandler(): Promise<void> {
    if(this.state.secondaryVerification.invalid) {
      return;
    }

    if(this.formIsCompleted() && !this.formHasModifications()) {
      this.parentTab.tabs[3].active = true; // Move to the next tab
      return;
    }

    this.state.isSubmitting.secondaryVerification = true;
    this.state.tabLocks.bank = false; // Set the lock for the Primary Verification to false

    const data: SecondaryVerificationModel = this.state.secondaryVerification.value;

    const frontIdAsb64String = await this.convertToBlob(this.identificationFront);
    const backIdAsb64String = await this.convertToBlob(this.identificationBack);

    const frontIdBlob = new Blob([frontIdAsb64String], { type: this.identificationFront.type });
    const backIdBlob = new Blob([backIdAsb64String], { type: this.identificationBack.type });

    const formData: FormData = this.toFormData(data);
    formData.append("IndentificationFront", frontIdBlob, this.identificationFront.name);
    formData.append("IndentificationBack", backIdBlob, this.identificationBack.name);

    // Craete data if there are still no Secondary Verifiction data details
    if(!this.state.kycModel.secondaryVerification) {
      this.kycService.createSecondaryIdentification(
        (response: ApiResponse<null>) => {
          if(response.status == 'success') {
            this.toastService.success("Successfully created your Secondary KYC information!");
            this.parentTab.tabs[3].active = true; // Move to the next tab
          } else {
            this.toastService.error("Failed to create your Secondary Verification information!");
          }
        },
        (error: any) => {
          if(!environment.production) console.log(error);
          this.toastService.error("There was a problem with your request.")
        },
        () => {
          this.retrieveKYCData();
          this.state.isSubmitting.secondaryVerification = false;
        },
        formData
      )
    } else {
      this.kycService.updateSecondaryIdentification(
        (response: ApiResponse<null>) => {
          if(response.status == 'success') {
            this.toastService.success("Successfully updated your Secondary KYC information!");
            this.parentTab.tabs[3].active = true; // Move to the next tab
          } else {
            this.toastService.error("Failed to update your Secondary Verification information!");
          }
        },
        (error: any) => {
          if(!environment.production) console.log(error);
          this.toastService.error("There was a problem with your request.")
        },
        () => {
          this.retrieveKYCData();
          this.state.isSubmitting.secondaryVerification = false;
        },
        formData     
      )
    }
  }

  // Example method to handle file input change
  protected async onFileSelected(event: any, formControlName: "IndentificationFront" | "IndentificationBack") {
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
    return ["COMPLETED", "APPROVED"].includes(this.state.secondaryVerificationStatus?.toUpperCase());
  }

  protected formHasModifications(): boolean {
    const { touched, dirty } = this.state.secondaryVerification;

    return (touched || dirty);
  }
}