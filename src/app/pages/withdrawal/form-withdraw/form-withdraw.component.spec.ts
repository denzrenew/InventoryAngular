import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWithdrawComponent } from './form-withdraw.component';

describe('FormWithdrawComponent', () => {
  let component: FormWithdrawComponent;
  let fixture: ComponentFixture<FormWithdrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormWithdrawComponent]
    });
    fixture = TestBed.createComponent(FormWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
