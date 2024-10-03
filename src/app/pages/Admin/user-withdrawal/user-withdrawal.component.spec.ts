import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithdrawalComponent } from './user-withdrawal.component';

describe('UserWithdrawalComponent', () => {
  let component: UserWithdrawalComponent;
  let fixture: ComponentFixture<UserWithdrawalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserWithdrawalComponent]
    });
    fixture = TestBed.createComponent(UserWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
