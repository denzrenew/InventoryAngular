import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUserProfilePersonalDetailsComponent } from './kyc-user-profile-personal-details.component';

describe('KycUserProfilePersonalDetailsComponent', () => {
  let component: KycUserProfilePersonalDetailsComponent;
  let fixture: ComponentFixture<KycUserProfilePersonalDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycUserProfilePersonalDetailsComponent]
    });
    fixture = TestBed.createComponent(KycUserProfilePersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
