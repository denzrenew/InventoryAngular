import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/core/services/auth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted:any = false;
  error:any = '';
  returnUrl: string;
  hasOTP : boolean = false;
  isLoggingIn: boolean = false;
  protected captchaKey: string = environment.captcha.key;

  // set the currenr year
  year: number = new Date().getFullYear();
  visiblePassword: boolean = false;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService, private authService: AuthService) { }

  ngOnInit() {
    document.body.setAttribute('data-bs-theme', 'light');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      otp: ['',],
      captcha: ['', [Validators.required  ]]
    });


    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  seePassword(): void {
    this.visiblePassword = !this.visiblePassword;
  }

  /**
   * Captcha success event
   * @param evt 
   */
  protected handleSuccess(evt: any): void {
    this.loginForm.get('captcha')?.setValue(evt);
  }

  /**
   * Captcha reset event
   */
  protected handleReset(): void {
    this.loginForm.get('captcha')?.setValue('');
  }

  /**
   * Captcha expire event
   */
  protected handleExpire(): void {
    this.loginForm.get('captcha')?.setValue('');
  }

  /**
   * Captcha on load event 
   */
  protected handleLoad(): void {
    if(!environment.production) console.log("HANDLE LOAD");
  }

  /**
   * Form submit
   */
  async onSubmit() {
    this.error = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.isLoggingIn = true;
      
      if (environment.defaultauth === 'test') {
        this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
          this.router.navigate(['/dashboard']);
          this.isLoggingIn = false;
        })
          .catch(error => {
            this.isLoggingIn = false;
            this.error = error ? error : '';
          });
      } else {
        if (this.hasOTP) {
          this.authFackservice.loginWithOTP(this.f.email.value, this.f.password.value, this.f.otp.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['/home']);
              this.isLoggingIn = false;
            },
            error => {
              this.error = error ? error : '';
              this.isLoggingIn = false;
            });
        } else {
          this.authFackservice.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
              console.log("LOGIN COMPONENT START", data);
              if (data.message !== undefined) {
                if (data.message === 'login with otp') {
                  this.isLoggingIn = false;
                  this.hasOTP = true;
                }
              } else {

                console.log("REDIRECT TO HOME BIETCH")
                this.authService.resetUserDetails(data);
                this.router.navigate(['/home']);
                this.isLoggingIn = false;
              }
              
            },
            error => {
              this.isLoggingIn = false;
              this.error = error ? error : '';
            });
        }

      }
    }
  }
}
