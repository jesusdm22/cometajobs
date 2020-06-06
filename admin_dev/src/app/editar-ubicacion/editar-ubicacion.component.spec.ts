import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUbicacionComponent } from './editar-ubicacion.component';

describe('EditarUbicacionComponent', () => {
  let component: EditarUbicacionComponent;
  let fixture: ComponentFixture<EditarUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
