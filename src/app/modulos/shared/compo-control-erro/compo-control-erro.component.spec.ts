import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoControlErroComponent } from './compo-control-erro.component';

describe('CompoControlErroComponent', () => {
  let component: CompoControlErroComponent;
  let fixture: ComponentFixture<CompoControlErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoControlErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoControlErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
