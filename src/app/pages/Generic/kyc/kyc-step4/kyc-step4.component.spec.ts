import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycStep4Component } from './kyc-step4.component';

describe('KycStep4Component', () => {
  let component: KycStep4Component;
  let fixture: ComponentFixture<KycStep4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycStep4Component]
    });
    fixture = TestBed.createComponent(KycStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
