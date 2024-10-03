import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import jwt_decode from 'jwt-decode';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { AuthService } from 'src/app/core/services/auth2.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor (private router: Router, 
    private spinner: NgxSpinnerService,
    private authService: AuthService) {

  }

  ngOnInit() {
    this.spinner.show();
    
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');

      console.log('home now')
      const userDetails = this.authService.getAccessTokenData();
      console.log(userDetails)
      if(userDetails?.role?.toUpperCase() === 'ADMINISTRATOR') {
        this.router.navigate(['/all-profile']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } 
  }
}
