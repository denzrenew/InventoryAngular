import { Component, Input } from '@angular/core';
import { KycService } from 'src/app/core/services/kyc.service';
import { PrimaryVerificationModel } from 'src/app/core/models/kyc/kyc-initial-data.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-primary-verification',
  templateUrl: './primary-verification.component.html',
  styleUrls: ['./primary-verification.component.scss']
})
export class PrimaryVerificationComponent {
  protected isLoading: boolean;
  protected model: PrimaryVerificationModel;

  constructor(private kycService: KycService) { }

  ngOnInit(): void {
    this.retrieveDetails();
  }

  private async retrieveDetails(): Promise<void> {
    this.isLoading = true;

    const next = (response: ApiResponse<PrimaryVerificationModel>) => {
      if(response.status === 'success') {
        console.log(response.data);
        this.model = response.data;
      }
    }

    const error = (error: any) => {
      if(!environment.production) console.log(error);
    }

    const complete = () => this.isLoading = false;

    this.kycService.getPrimaryIdentificationByUserId()
      .pipe(finalize(complete))
      .subscribe({ next, error });
  }
}