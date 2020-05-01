import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarJornadaComponent } from './editar-jornada.component';

describe('EditarJornadaComponent', () => {
  let component: EditarJornadaComponent;
  let fixture: ComponentFixture<EditarJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
