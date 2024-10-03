import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoistApprovalFormComponent } from './depoist-approval-form.component';

describe('DepoistApprovalFormComponent', () => {
  let component: DepoistApprovalFormComponent;
  let fixture: ComponentFixture<DepoistApprovalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepoistApprovalFormComponent]
    });
    fixture = TestBed.createComponent(DepoistApprovalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
