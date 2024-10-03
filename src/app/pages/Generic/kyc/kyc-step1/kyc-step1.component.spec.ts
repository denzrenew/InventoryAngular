import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycStep1Component } from './kyc-step1.component';

describe('KycStep1Component', () => {
  let component: KycStep1Component;
  let fixture: ComponentFixture<KycStep1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycStep1Component]
    });
    fixture = TestBed.createComponent(KycStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
