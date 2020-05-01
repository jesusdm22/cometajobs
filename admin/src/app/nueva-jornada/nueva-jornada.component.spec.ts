import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaJornadaComponent } from './nueva-jornada.component';

describe('NuevaJornadaComponent', () => {
  let component: NuevaJornadaComponent;
  let fixture: ComponentFixture<NuevaJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
