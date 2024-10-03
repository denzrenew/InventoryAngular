import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUserProfilePrimaryComponent } from './kyc-user-profile-primary.component';

describe('KycUserProfilePrimaryComponent', () => {
  let component: KycUserProfilePrimaryComponent;
  let fixture: ComponentFixture<KycUserProfilePrimaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycUserProfilePrimaryComponent]
    });
    fixture = TestBed.createComponent(KycUserProfilePrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
