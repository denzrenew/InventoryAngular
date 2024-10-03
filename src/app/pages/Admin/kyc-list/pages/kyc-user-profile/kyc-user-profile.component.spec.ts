import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUserProfileComponent } from './kyc-user-profile.component';

describe('KycUserProfileComponent', () => {
  let component: KycUserProfileComponent;
  let fixture: ComponentFixture<KycUserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycUserProfileComponent]
    });
    fixture = TestBed.createComponent(KycUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
