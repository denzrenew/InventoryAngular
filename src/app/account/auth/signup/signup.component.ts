import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: UntypedFormGroup;
  submitted:any = false;
  error:any = '';
  image: any;
  isDisabled: boolean = true;
  successmsg:any = false;
  hasReferralCode:any = false;
  countryCode : string
  country :string = null
  isRegistering: boolean = false;
  captchaKey: string = environment.captcha.key;

  // set the currenr year
  year: number = new Date().getFullYear();
  countries:any
  private routeSub: Subscription;
  referralCode:string = ""
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private userService: UserProfileService, private accountService: AccountService, private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.countries =[
    
      {
        "flag": "https://twemoji.maxcdn.com/2/svg/1f1f5-1f1ed.svg",
        "country": "Philippines",
        "dial_code": "+63",
        "code": "PH"
      },
    
    ]
    this.country = "Philippines"
    this.countryCode ="+63"
    this.routeSub = this.route.params.subscribe(params => {
      this.referralCode = params['id']
      if (this.referralCode !== undefined) {
        this.hasReferralCode = true
      }
    });

    document.body.setAttribute('data-bs-theme', 'light');
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      parentReferralCode: [this.referralCode, Validators.required],
      middleName: [''],
      country: [null, Validators.required],
      countryCode: ['', Validators.required],
      birthDate: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      captcha: ['', [Validators.required  ]]
    });
    this.getuserProfileImage();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.image = reader.result;
    }, false);
 
    if (image) {
      console.log('image');
       reader.readAsDataURL(image);
    }
 }

  getuserProfileImage(): void {
    this.accountService.getImageByReferalCode(this.referralCode)
    .pipe(first())
    .subscribe(
      data => {
        this.createImageFromBlob(data);
      },
      error => {

      });

  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * Captcha success event
   * @param evt 
   */
  protected handleSuccess(evt: any): void {
    this.signupForm.get('captcha')?.setValue(evt);
  }

  /**
   * Captcha reset event
   */
  protected handleReset(): void {
    this.signupForm.get('captcha')?.setValue('');
  }

  /**
   * Captcha expire event
   */
  protected handleExpire(): void {
    this.signupForm.get('captcha')?.setValue('');
  }

  /**
   * Captcha on load event 
   */
  protected handleLoad(): void {
    if(!environment.production) console.log("HANDLE LOAD");
  }

  /**
   * On submit form
   */
  onSelectionchange(value:any){
    console.log(value )
    if (value.dial_code === undefined) {
      this.countryCode= "NA"  
    } else {
      this.countryCode = value.dial_code 
    }
    
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.submitted)
    console.log(this.f.lastName.errors)
    // stop here if form is invalid
    if (this.signupForm.invalid) {

      return;
    } else {
      this.isRegistering = true;
      this.userService.register(this.signupForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.isRegistering = false;
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/account/login']);
          }
        },
        error => {
          this.isRegistering = false;
          this.error = error ? error : '';
        });
    }
  }
}
