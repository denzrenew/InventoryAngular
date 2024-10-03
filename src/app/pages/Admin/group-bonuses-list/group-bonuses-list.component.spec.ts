import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBonusesListComponent } from './group-bonuses-list.component';

describe('GroupBonusesListComponent', () => {
  let component: GroupBonusesListComponent;
  let fixture: ComponentFixture<GroupBonusesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupBonusesListComponent]
    });
    fixture = TestBed.createComponent(GroupBonusesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
