import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycStep2Component } from './kyc-step2.component';

describe('KycStep2Component', () => {
  let component: KycStep2Component;
  let fixture: ComponentFixture<KycStep2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycStep2Component]
    });
    fixture = TestBed.createComponent(KycStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
