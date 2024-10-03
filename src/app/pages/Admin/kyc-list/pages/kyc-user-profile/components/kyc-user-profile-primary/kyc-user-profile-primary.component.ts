import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { PrimaryVerificationModel } from 'src/app/core/models/kyc/kyc-initial-data.model';
import { DownloadService } from 'src/app/core/services/download.service';
import { KycService } from 'src/app/core/services/kyc.service';
import { environment } from 'src/environments/environment';
import StateModel from '../../kyc-user-profile.states';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import KycUpdatePayload from 'src/app/core/models/kyc/kyc-update-payload.model';

@Component({
  selector: 'app-kyc-user-profile-primary',
  templateUrl: './kyc-user-profile-primary.component.html',
  styleUrls: ['./kyc-user-profile-primary.component.scss']
})
export class KycUserProfilePrimaryComponent implements OnInit {
  @Input() userId!: number;
  @Input() state!: StateModel;
  protected isLoading: boolean;
  protected isDownloadingFront: boolean = false;
  protected isDownloadingBack: boolean = false;
  protected isUpdating: boolean = false;
  protected model?: PrimaryVerificationModel;
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

    const next = (response: ApiResponse<PrimaryVerificationModel>) => {
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

    this.kycService.getPrimaryIdentificationByUserId(this.userId)
      .pipe(finalize(complete))
      .subscribe({ next, error });
  }

  protected downloadFile(type: 'FRONT' | 'BACK', fileName: string): void {
    let fileNamePrefix = this.userId + " - PRIMARY ATTACHMENT";

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

    this.kycService.updatePrimaryIdentificationStatus(
      (response: ApiResponse<null>) => {
        if(response.status === 'success') {
          this.toastService.success("Primary Identification has been updated!");
        } else {
          this.toastService.error("Failed to update Primary Identification!");
        }
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("Failed to update Primary Identification status!");
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
