import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisInscripcionesComponent } from './mis-inscripciones.component';

describe('MisInscripcionesComponent', () => {
  let component: MisInscripcionesComponent;
  let fixture: ComponentFixture<MisInscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisInscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
