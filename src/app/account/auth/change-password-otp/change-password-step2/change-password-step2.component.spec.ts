import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordStep2Component } from './change-password-step2.component';

describe('ChangePasswordStep2Component', () => {
  let component: ChangePasswordStep2Component;
  let fixture: ComponentFixture<ChangePasswordStep2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordStep2Component]
    });
    fixture = TestBed.createComponent(ChangePasswordStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
