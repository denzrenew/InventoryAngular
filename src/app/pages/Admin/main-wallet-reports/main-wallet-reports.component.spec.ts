import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWalletReportsComponent } from './main-wallet-reports.component';

describe('MainWalletReportsComponent', () => {
  let component: MainWalletReportsComponent;
  let fixture: ComponentFixture<MainWalletReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainWalletReportsComponent]
    });
    fixture = TestBed.createComponent(MainWalletReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
