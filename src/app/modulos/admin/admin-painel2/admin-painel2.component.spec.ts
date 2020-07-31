import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPainel2Component } from './admin-painel2.component';

describe('AdminPainel2Component', () => {
  let component: AdminPainel2Component;
  let fixture: ComponentFixture<AdminPainel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPainel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPainel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
