import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFormAdminComponent } from './support-form-admin.component';

describe('SupportFormAdminComponent', () => {
  let component: SupportFormAdminComponent;
  let fixture: ComponentFixture<SupportFormAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportFormAdminComponent]
    });
    fixture = TestBed.createComponent(SupportFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
