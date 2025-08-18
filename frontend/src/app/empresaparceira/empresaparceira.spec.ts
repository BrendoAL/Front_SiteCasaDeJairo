import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empresaparceira } from './empresaparceira';

describe('Empresaparceira', () => {
  let component: Empresaparceira;
  let fixture: ComponentFixture<Empresaparceira>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empresaparceira]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Empresaparceira);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
