import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from '../../../core/services/user.service';
import { first } from 'rxjs';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';

@Component({
  selector: 'app-change-password-otp',
  templateUrl: './change-password-otp.component.html',
  styleUrls: ['./change-password-otp.component.scss']
})
export class ChangePasswordOTPComponent {
  error:any = '';
  submitted:any = false;
  sendOTPForm: UntypedFormGroup

  constructor(private toastr : ToastrService ,
     private formBuilder: UntypedFormBuilder, 
     private route: ActivatedRoute, 
     private router: Router, 
     private AuthfakeauthenticationService: AuthfakeauthenticationService,
     private spinner: NgxSpinnerService){

  }

  ngOnInit() {
    this.sendOTPForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]      
    });
  }

  get f() { return this.sendOTPForm.controls; }

  onSubmit(){
    this.submitted = true;



    if (this.sendOTPForm.invalid) {
      return;
    } else {
      this.AuthfakeauthenticationService.sendOTP(this.f.email.value).pipe(first()).subscribe(
        data => {
          this.router.navigate(['/account/forgotPasswordStep2']);
          this.error = null                                             
        },
        error => {
          this.error = error ? error : '';
        });      
    }
  }
}
