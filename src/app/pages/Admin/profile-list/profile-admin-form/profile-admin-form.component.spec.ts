import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdminFormComponent } from './profile-admin-form.component';

describe('ProfileAdminFormComponent', () => {
  let component: ProfileAdminFormComponent;
  let fixture: ComponentFixture<ProfileAdminFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileAdminFormComponent]
    });
    fixture = TestBed.createComponent(ProfileAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
