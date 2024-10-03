import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReferralAdminFormComponent } from './direct-referral-admin-form.component';

describe('DirectReferralAdminFormComponent', () => {
  let component: DirectReferralAdminFormComponent;
  let fixture: ComponentFixture<DirectReferralAdminFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectReferralAdminFormComponent]
    });
    fixture = TestBed.createComponent(DirectReferralAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
