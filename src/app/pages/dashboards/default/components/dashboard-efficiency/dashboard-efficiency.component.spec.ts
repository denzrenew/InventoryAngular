import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEfficiencyComponent } from './dashboard-efficiency.component';

describe('DashboardEfficiencyComponent', () => {
  let component: DashboardEfficiencyComponent;
  let fixture: ComponentFixture<DashboardEfficiencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEfficiencyComponent]
    });
    fixture = TestBed.createComponent(DashboardEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
