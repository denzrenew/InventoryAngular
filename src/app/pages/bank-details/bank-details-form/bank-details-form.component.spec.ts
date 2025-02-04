import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailsFormComponent } from './bank-details-form.component';

describe('BankDetailsFormComponent', () => {
  let component: BankDetailsFormComponent;
  let fixture: ComponentFixture<BankDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankDetailsFormComponent]
    });
    fixture = TestBed.createComponent(BankDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
