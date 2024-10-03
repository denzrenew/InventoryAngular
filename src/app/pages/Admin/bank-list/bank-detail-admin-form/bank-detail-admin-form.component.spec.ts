import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailAdminFormComponent } from './bank-detail-admin-form.component';

describe('BankDetailAdminFormComponent', () => {
  let component: BankDetailAdminFormComponent;
  let fixture: ComponentFixture<BankDetailAdminFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankDetailAdminFormComponent]
    });
    fixture = TestBed.createComponent(BankDetailAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
