import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositReportsComponent } from './deposit-reports.component';

describe('DepositReportsComponent', () => {
  let component: DepositReportsComponent;
  let fixture: ComponentFixture<DepositReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositReportsComponent]
    });
    fixture = TestBed.createComponent(DepositReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
