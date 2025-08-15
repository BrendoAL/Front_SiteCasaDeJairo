import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Doacao } from './doacao';

describe('Doacao', () => {
  let component: Doacao;
  let fixture: ComponentFixture<Doacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Doacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Doacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
