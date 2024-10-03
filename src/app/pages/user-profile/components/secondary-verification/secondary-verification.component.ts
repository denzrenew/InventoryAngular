import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { PrimaryVerificationModel, SecondaryVerificationModel } from 'src/app/core/models/kyc/kyc-initial-data.model';
import { KycService } from 'src/app/core/services/kyc.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-secondary-verification',
  templateUrl: './secondary-verification.component.html',
  styleUrls: ['./secondary-verification.component.scss']
})
export class SecondaryVerificationComponent implements OnInit {
  protected isLoading: boolean;
  protected model: SecondaryVerificationModel;

  constructor(private kycService: KycService) { }

  ngOnInit(): void {
    this.retrieveDetails();
  }

  private async retrieveDetails(): Promise<void> {
    this.isLoading = true;

    const next = (response: ApiResponse<SecondaryVerificationModel>) => {
      if(response.status === 'success') {
        this.model = response.data;
      }
    }

    const error = (error: any) => {
      if(!environment.production) console.log(error);
    }

    const complete = () => this.isLoading = false;

    this.kycService.getSecondaryIdentificationByUserId()
      .pipe(finalize(complete))
      .subscribe({ next, error });
  }
}