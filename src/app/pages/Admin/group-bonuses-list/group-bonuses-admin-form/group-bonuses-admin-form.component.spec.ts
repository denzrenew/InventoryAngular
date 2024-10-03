import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBonusesAdminFormComponent } from './group-bonuses-admin-form.component';

describe('GroupBonusesAdminFormComponent', () => {
  let component: GroupBonusesAdminFormComponent;
  let fixture: ComponentFixture<GroupBonusesAdminFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupBonusesAdminFormComponent]
    });
    fixture = TestBed.createComponent(GroupBonusesAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
