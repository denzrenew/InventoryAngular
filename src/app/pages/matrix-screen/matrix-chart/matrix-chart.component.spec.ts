import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixChartComponent } from './matrix-chart.component';

describe('MatrixChartComponent', () => {
  let component: MatrixChartComponent;
  let fixture: ComponentFixture<MatrixChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixChartComponent]
    });
    fixture = TestBed.createComponent(MatrixChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
