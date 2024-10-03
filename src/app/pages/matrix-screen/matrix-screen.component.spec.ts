import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixScreenComponent } from './matrix-screen.component';

describe('MatrixScreenComponent', () => {
  let component: MatrixScreenComponent;
  let fixture: ComponentFixture<MatrixScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixScreenComponent]
    });
    fixture = TestBed.createComponent(MatrixScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
