import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth2.service';

@Injectable({
  providedIn: 'root'
})
export class KycGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const isKycRoute = state.url === '/kyc';
    const kycCompleted = true;

    if(isKycRoute) {
      if(!kycCompleted) {
        // Allow access to the "kyc" route if KYC is not completed
        return true;
      }

      this.router.navigate(['']);
      return false;
    } else if (!kycCompleted) {
      // Redirect to "kyc" route if KYC is not completed and the user is not accessing the "kyc" route
      this.router.navigate(['/kyc']);
      return false;
    }

    // Proceed with navigation if KYC is completed
    return true;
  }
}