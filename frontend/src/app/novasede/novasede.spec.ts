import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Novasede } from './novasede';

describe('Novasede', () => {
  let component: Novasede;
  let fixture: ComponentFixture<Novasede>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Novasede]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Novasede);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
