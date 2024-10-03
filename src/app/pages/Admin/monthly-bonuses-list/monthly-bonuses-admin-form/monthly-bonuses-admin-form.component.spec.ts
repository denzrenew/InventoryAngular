import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBonusesAdminFormComponent } from './monthly-bonuses-admin-form.component';

describe('MonthlyBonusesAdminFormComponent', () => {
  let component: MonthlyBonusesAdminFormComponent;
  let fixture: ComponentFixture<MonthlyBonusesAdminFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyBonusesAdminFormComponent]
    });
    fixture = TestBed.createComponent(MonthlyBonusesAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
