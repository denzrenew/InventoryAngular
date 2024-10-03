import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { form } from './change-password.forms';
import { AccountService } from 'src/app/core/services/account.service';
import { ApiResponse } from 'src/app/core/models/api-response.model';
import { ToastrService } from 'ngx-toastr';
import UpdatePassword from 'src/app/core/models/account/update-password.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Input() userId: number;
  @Input() callback?: any;
  @Input() modal?: any;
  
  protected form: FormGroup;
  protected captchaKey: string = environment.captcha.key;
  protected show: {
    password: boolean,
    confirmPassword: boolean,
    adminPassword: boolean
  };
  protected submitting: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastService: ToastrService) { 
    this.form = this.formBuilder.group(form());
    this.show = {
      password: false,
      confirmPassword: false,
      adminPassword: false
    };
  }

  /**
   * Captcha success event
   * @param evt 
   */
  protected handleSuccess(evt: any): void {
    this.form.get('captcha')?.setValue(evt);
  }

  /**
   * Captcha reset event
   */
  protected handleReset(): void {
    this.form.get('captcha')?.setValue('');
  }

  /**
   * Captcha expire event
   */
  protected handleExpire(): void {
    this.form.get('captcha')?.setValue('');
  }

  /**
   * Captcha on load event 
   */
  protected handleLoad(): void {
    if(!environment.production) console.log("HANDLE LOAD");
  }

  /**
   * Checks if the form key is invalid
   * @param key 
   * @returns 
   */
  protected isInvalid(key: string): boolean {
    const control = this.form?.get(key);

    return (control?.invalid && control?.touched);
  }

  /**
   * Retrieves the error message
   * @param key 
   * @param label 
   * @returns 
   */
  protected errorMessage(key: string, label: string): string {
    const control = this.form.get(key);

    if(control?.hasError('required')) {
      return `${label} is required.`;
    }

    if(control?.hasError('maxlength')) {
      const { requiredLength } = control.errors.maxlength;
      return `The length of ${label} should not exceed ${requiredLength}.`;
    }
    
    if(control?.hasError('minlength')) {
      const { requiredLength } = control.errors.minlength;
      return `The minimum length of ${label} is atleast ${requiredLength}.`;
    }

    if(control?.errors['weakPassword']) {
      return `${label} should atleast contain 1 uppercase, 1 lowercase and 1 special character.`;
    }

    if(control?.errors['passwordMismatch']) {
      return `New Password should be the same as the Confirm New Password.`;
    }

    if(!environment.production) console.log(control.errors);
    return '';
  }

  /**
   * On handle of the submit
   */
  protected onSubmitHandle(): void {
    const captcha = this.form.get('captcha');
    if(captcha.value.length <= 0) return;

    this.submitting = true;

    const data: UpdatePassword = this.form.value;

    this.accountService.updatePasswordByUserId(
      (response: ApiResponse<null>) => {
        if(response && response.status === 'success') {
          this.callback && this.callback(this.modal);
          this.toastService.success("Password change was successful!");
          return;
        }

        this.toastService.error("Failed to update password!");
      },
      (error: any) => {
        if(!environment.production) console.log(error);
        this.toastService.error("Failed to update password!");
      },
      () => {
        this.submitting = false;
      },
      this.userId,
      data
    )
  }
}
