import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryVerificationComponent } from './primary-verification.component';

describe('PrimaryVerificationComponent', () => {
  let component: PrimaryVerificationComponent;
  let fixture: ComponentFixture<PrimaryVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimaryVerificationComponent]
    });
    fixture = TestBed.createComponent(PrimaryVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
