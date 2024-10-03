import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoistListComponent } from './depoist-list.component';

describe('DepoistListComponent', () => {
  let component: DepoistListComponent;
  let fixture: ComponentFixture<DepoistListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepoistListComponent]
    });
    fixture = TestBed.createComponent(DepoistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
