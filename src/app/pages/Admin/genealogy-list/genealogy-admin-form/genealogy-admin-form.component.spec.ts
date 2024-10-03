import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyAdminFormComponent } from './genealogy-admin-form.component';

describe('GenealogyAdminFormComponent', () => {
  let component: GenealogyAdminFormComponent;
  let fixture: ComponentFixture<GenealogyAdminFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenealogyAdminFormComponent]
    });
    fixture = TestBed.createComponent(GenealogyAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
