import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalReportsComponent } from './withdrawal-reports.component';

describe('WithdrawalReportsComponent', () => {
  let component: WithdrawalReportsComponent;
  let fixture: ComponentFixture<WithdrawalReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WithdrawalReportsComponent]
    });
    fixture = TestBed.createComponent(WithdrawalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
