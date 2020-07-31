import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPainel1Component } from './admin-painel1.component';

describe('AdminPainel1Component', () => {
  let component: AdminPainel1Component;
  let fixture: ComponentFixture<AdminPainel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPainel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPainel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
