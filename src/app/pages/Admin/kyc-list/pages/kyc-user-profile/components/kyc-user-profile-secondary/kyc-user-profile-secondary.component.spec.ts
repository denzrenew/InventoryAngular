import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUserProfileSecondaryComponent } from './kyc-user-profile-secondary.component';

describe('KycUserProfileSecondaryComponent', () => {
  let component: KycUserProfileSecondaryComponent;
  let fixture: ComponentFixture<KycUserProfileSecondaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycUserProfileSecondaryComponent]
    });
    fixture = TestBed.createComponent(KycUserProfileSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
