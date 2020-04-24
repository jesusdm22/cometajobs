import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisOfertasComponent } from './mis-ofertas.component';

describe('MisOfertasComponent', () => {
  let component: MisOfertasComponent;
  let fixture: ComponentFixture<MisOfertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisOfertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
