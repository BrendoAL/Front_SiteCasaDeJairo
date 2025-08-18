import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transparencia } from './transparencia';

describe('Transparencia', () => {
  let component: Transparencia;
  let fixture: ComponentFixture<Transparencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transparencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transparencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
