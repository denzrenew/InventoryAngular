import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyRunReportComponent } from './weekly-run-report.component';

describe('WeeklyRunReportComponent', () => {
  let component: WeeklyRunReportComponent;
  let fixture: ComponentFixture<WeeklyRunReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyRunReportComponent]
    });
    fixture = TestBed.createComponent(WeeklyRunReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
