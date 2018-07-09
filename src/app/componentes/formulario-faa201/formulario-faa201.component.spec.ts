import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFaa201Component } from './formulario-faa201.component';

describe('FormularioFaa201Component', () => {
  let component: FormularioFaa201Component;
  let fixture: ComponentFixture<FormularioFaa201Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioFaa201Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFaa201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
