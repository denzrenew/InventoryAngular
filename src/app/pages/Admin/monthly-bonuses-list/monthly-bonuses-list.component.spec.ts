import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyBonusesListComponent } from './monthly-bonuses-list.component';

describe('MonthlyBonusesListComponent', () => {
  let component: MonthlyBonusesListComponent;
  let fixture: ComponentFixture<MonthlyBonusesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyBonusesListComponent]
    });
    fixture = TestBed.createComponent(MonthlyBonusesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
