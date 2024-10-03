import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDcjPaginationComponent } from './app-dcj-pagination.component';

describe('AppDcjPaginationComponent', () => {
  let component: AppDcjPaginationComponent;
  let fixture: ComponentFixture<AppDcjPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppDcjPaginationComponent]
    });
    fixture = TestBed.createComponent(AppDcjPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
