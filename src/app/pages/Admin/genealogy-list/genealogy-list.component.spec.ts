import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenealogyListComponent } from './genealogy-list.component';

describe('GenealogyListComponent', () => {
  let component: GenealogyListComponent;
  let fixture: ComponentFixture<GenealogyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenealogyListComponent]
    });
    fixture = TestBed.createComponent(GenealogyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
