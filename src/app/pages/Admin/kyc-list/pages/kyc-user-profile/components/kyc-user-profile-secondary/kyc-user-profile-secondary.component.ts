import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { PrimaryVerificationModel, SecondaryVerificationModel } from 'src/app/core/models/kyc/kyc-initial-data.model';
import { DownloadService } from 'src/app/core/services/download.service';
import { KycService } from 'src/app/core/services/kyc.service';
import { environment } from 'src/environments/environment';
import StateModel from '../../kyc-user-profile.states';
import KycUpdatePayload from 'src/app/core/models/kyc/kyc-update-payload.model';
import KycUserModel from 'src/app/core/models/kyc/kyc-user.model';

@Component({
  selector: 'app-kyc-user-profile-secondary',
  templateUrl: './kyc-user-profile-secondary.component.html',
  styleUrls: ['./kyc-user-profile-secondary.component.scss']
})
export class KycUserProfileSecondaryComponent implements OnInit {
  @Input() userId!: number;
  @Input() state!: StateModel;
  protected isLoading: boolean;
  protected isDownloadingFront: boolean = false;
  protected isDownloadingBack: boolean = false;
  protected isUpdating: boolean = false;
  protected model?: SecondaryVerificationModel;
  protected updateForm: FormGroup;

  constructor(private kycService: KycService,
    private downloadService: DownloadService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder) { 

      // Initialize Update form
      this.updateForm = this.formBuilder.group({
        comment: [ '', ],
        status: [ '', [ Validators.required ]]
      });
  }

  ngOnInit(): void {
    this.retrieveDetails();
  }

  private retrieveDetails(): void {
    this.isLoading = true;

    const next = (response: ApiResponse<SecondaryVerificationModel>) => {
      if(response.status === 'success') {
        this.model = response.data;
        
        // Override form
        const status = this.model.isApproved ? "Approve" : "Reject";
        this.updateForm = this.formBuilder.group({
          comment: [ this.model.comment ?? "", ],
          status: [ status ?? '', [ Validators.required ]]
        });
      }
    }

    const error = (error: any) => {
      if(!environment.production) console.log(error);
    }

    const complete = () => this.isLoading = false;

    this.kycService.getSecondaryIdentificationByUserId(this.userId)
      .pipe(finalize(complete))
      .subscribe({ next, error });
  }

  protected downloadFile(type: 'FRONT' | 'BACK', fileName: string): void {
    let fileNamePrefix = this.userId + " - SECONDARY ATTACHMENT";

    if(type === 'FRONT') {
      this.isDownloadingFront = true;
      fileNamePrefix += "(FRONT) - ";
    } else if (type === 'BACK') {
      this.isDownloadingBack = true;
      fileNamePrefix += "(BACK) - ";
    }
    
    this.downloadService.downloadStreamFile(
      (response: any) => {
        // Create object URL for the Blob
        const url = window.URL.createObjectURL(response);
  
        // Trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileNamePrefix}${fileName}`; // Set desired file name
        document.body.appendChild(a);
        a.click();
  
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("Failed to download file!");
      },
      () => {
        this.isDownloadingBack = false;
        this.isDownloadingFront = false;
      },
      fileName
    );
  }

  protected updateHandler(): void {
    this.isUpdating = true;

    const comment = this.updateForm.get('status').value == "Reject" 
      ? this.updateForm.get('comment')?.value
      : "";

    const data: KycUpdatePayload = {
      userId: this.userId,
      comment,
      isApproved: this.updateForm.get('status').value == "Approve",
    };

    this.kycService.updateSecondaryIdentificationStatus(
      (response: ApiResponse<null>) => {
        if(response.status === 'success') {
          this.toastService.success("Secondary Identification has been updated!");
        } else {
          this.toastService.error("Failed to update Secondary Identification!");
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("Failed to update Secondary Identification status!");
      },
      () => this.isUpdating = false,
      data
    )
  }

  protected canComment(): boolean {
    if(this.updateForm) {
      const selectedStatus = this.updateForm.get('status')!.value;

      if(selectedStatus === 'Approve') {
        this.updateForm.get('comment').disable();
        return false;
      }
    }

    this.updateForm.get('comment').enable();
    return true;
  }
}
