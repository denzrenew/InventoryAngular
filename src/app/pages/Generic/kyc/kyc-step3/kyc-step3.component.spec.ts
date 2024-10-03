import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycStep3Component } from './kyc-step3.component';

describe('KycStep2Component', () => {
  let component: KycStep3Component;
  let fixture: ComponentFixture<KycStep3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycStep3Component]
    });
    fixture = TestBed.createComponent(KycStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
