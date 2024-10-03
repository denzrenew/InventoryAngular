import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { finalize, first } from 'rxjs';
import UserProfileModel from 'src/app/core/models/account/user-profile.model';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import Country from 'src/app/core/models/country';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-kyc-user-profile-personal-details',
  templateUrl: './kyc-user-profile-personal-details.component.html',
  styleUrls: ['./kyc-user-profile-personal-details.component.scss']
})
export class KycUserProfilePersonalDetailsComponent implements OnInit {
  @Input() userId!: number;
  protected loading: boolean;
  protected isCountriesLoaded: boolean = false;
  protected countrySrc: string = "";
  protected userProfile?: UserProfileModel;
  protected countries: Country[] = [];
  protected profilePicture: any;

  constructor(private accountService: AccountService,
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private httpClient: HttpClient) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getuserProfileImage();
    this.loadCountries();
  }

  private getUserProfile(): void {
    this.accountService.viewUserProfile(
      (response: ApiResponse<UserProfileModel>) => {
        if(response && response.status === 'success') {
          this.userProfile = response.data;
        }
      }, 
      (error: any) => { console.log("Error while retrieving the User's Profile"); }, 
      () => {
        this.loading = false;
        if(this.isCountriesLoaded && !this.countrySrc) {
          this.countrySrc = this.countries.find(i => i.country === this.userProfile.country)?.flag;
        }
      },
      this.userId
    );
  }

  private getuserProfileImage(): void {
    this.loading = true;
    const formData = new FormData();

    this.accountService.getProfileImage(formData, this.userId)
      .pipe(first())
      .subscribe(
        data => {
          const contentType = data.headers.get('Content-Type');
          const options = !!contentType ? { type: contentType } : {};
          const blob = new Blob(!!data.body ? [data.body] : undefined, options);
          const objectURL = URL.createObjectURL(blob);
          this.profilePicture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.loading = false;
        },
        error => { });
  }
  
  private loadCountries(): void {
    const success = (response: Country[]) => {
      this.countries = response;
    }

    const error = (error: any) => console.log("Unable to load countries!");
    const complete = () => { 
      this.isCountriesLoaded = true; 
      if(!this.loading && !this.countrySrc) {
        this.countrySrc = this.countries.find(i => i.country === this.userProfile.country)?.flag;
      }
    };

    this.httpClient.get<Country[]>('/assets/countries.json')
      .pipe(finalize(complete))
      .subscribe({ next: success, error });
  }
  
  protected getSubscriptionImage(): string {
    return this.userProfile && this.userProfile.accountType ? `assets/logos/${this.userProfile.accountType.toLowerCase()}.png` : "assets/logos/admin.png";
  }

  protected getUserInitials(): string {
    const { firstName, lastName } = this.userProfile;

    if(firstName && lastName) {
      console.log(firstName[0].toUpperCase() + lastName[0].toUpperCase());
      return firstName[0].toUpperCase() + lastName[0].toUpperCase();
    }

    return '';
  }

  protected getInputDate(value: string, format: string = "yyyy-MM-dd"): string {
    return this.datePipe.transform(value, format);
  }
}
