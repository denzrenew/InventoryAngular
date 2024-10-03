import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalApprovalFormComponent } from './withdrawal-approval-form.component';

describe('WithdrawalApprovalFormComponent', () => {
  let component: WithdrawalApprovalFormComponent;
  let fixture: ComponentFixture<WithdrawalApprovalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawalApprovalFormComponent]
    });
    fixture = TestBed.createComponent(WithdrawalApprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
