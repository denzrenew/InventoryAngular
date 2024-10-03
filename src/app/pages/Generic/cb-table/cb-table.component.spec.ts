import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbTableComponent } from './cb-table.component';

describe('CbTableComponent', () => {
  let component: CbTableComponent;
  let fixture: ComponentFixture<CbTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CbTableComponent]
    });
    fixture = TestBed.createComponent(CbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
