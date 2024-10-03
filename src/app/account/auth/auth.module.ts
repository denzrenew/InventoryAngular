import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { SignupComponent } from './signup/signup.component';
import { Register2Component } from './register2/register2.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';

import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChangePasswordOTPComponent } from './change-password-otp/change-password-otp.component';
import { ChangePasswordStep2Component } from './change-password-otp/change-password-step2/change-password-step2.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [LoginComponent, Login2Component, SignupComponent, PasswordresetComponent, Register2Component, Recoverpwd2Component, ChangePasswordOTPComponent, ChangePasswordStep2Component],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule.forRoot(),
    UIModule,
    AuthRoutingModule,
    CarouselModule,
    NgSelectModule,
    NgxCaptchaModule
  ]
})
export class AuthModule { }
