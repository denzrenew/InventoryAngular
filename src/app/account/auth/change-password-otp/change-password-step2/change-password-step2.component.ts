import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserProfileService } from '../../../../core/services/user.service'
import { first } from 'rxjs';

@Component({
  selector: 'app-change-password-step2',
  templateUrl: './change-password-step2.component.html',
  styleUrls: ['./change-password-step2.component.scss']
})
export class ChangePasswordStep2Component {
  error:any = '';
  submitted:any = false;

  resetPasswordForm: UntypedFormGroup
  constructor(private toastr : ToastrService ,
     private formBuilder: UntypedFormBuilder, 
     private route: ActivatedRoute, 
     private router: Router, 
     private userProfileservice: UserProfileService,
     private spinner: NgxSpinnerService){

  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      otp: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get f() { return this.resetPasswordForm.controls; }



  onSubmit(){
    this.submitted = true;
    
    if (this.resetPasswordForm.invalid) {
      return;
    } else {


      let body = {
        otp: this.resetPasswordForm.controls["otp"].value,
        newPassword: this.resetPasswordForm.controls["newPassword"].value,
        confirmPassword: this.resetPasswordForm.controls["confirmPassword"].value
      }
      this.userProfileservice.resetPassword(body).pipe(first()).subscribe(
        data => {
          this.router.navigate(['/account/login']);                
        },
        error => {
          this.error = error ? error : '';
        });  
    }
  }
}
