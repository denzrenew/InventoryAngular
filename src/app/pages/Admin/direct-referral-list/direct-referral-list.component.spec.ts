import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReferralListComponent } from './direct-referral-list.component';

describe('DirectReferralListComponent', () => {
  let component: DirectReferralListComponent;
  let fixture: ComponentFixture<DirectReferralListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectReferralListComponent]
    });
    fixture = TestBed.createComponent(DirectReferralListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
