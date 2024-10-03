import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryVerificationComponent } from './secondary-verification.component';

describe('KycStep2Component', () => {
  let component: SecondaryVerificationComponent;
  let fixture: ComponentFixture<SecondaryVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryVerificationComponent]
    });
    fixture = TestBed.createComponent(SecondaryVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
