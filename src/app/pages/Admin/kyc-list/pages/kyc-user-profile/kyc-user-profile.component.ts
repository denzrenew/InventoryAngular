import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import StateModel, { InitialState } from './kyc-user-profile.states';
import { KycService } from 'src/app/core/services/kyc.service';

@Component({
  selector: 'app-kyc-user-profile',
  templateUrl: './kyc-user-profile.component.html',
  styleUrls: ['./kyc-user-profile.component.scss']
})
export class KycUserProfileComponent implements OnInit {
  protected state: StateModel;

  constructor(private route: ActivatedRoute,
    private kycService: KycService,
    private router: Router) {
    this.state = InitialState();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.state.userId = params['userId'];
    });
  }

  protected backClickHandler(): void {
    this.router.navigate(["/kyc-list"]);
  }
}
