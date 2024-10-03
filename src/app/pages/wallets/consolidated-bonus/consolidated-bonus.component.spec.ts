import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatedBonusWalletComponent } from './consolidated-bonus.component';

describe('ConsolidatedBonusWalletComponent', () => {
  let component: ConsolidatedBonusWalletComponent;
  let fixture: ComponentFixture<ConsolidatedBonusWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolidatedBonusWalletComponent]
    });
    fixture = TestBed.createComponent(ConsolidatedBonusWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
