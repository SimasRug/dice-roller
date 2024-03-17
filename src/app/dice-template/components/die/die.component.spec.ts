import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DieComponent } from './die.component';

describe('DieComponent', () => {
  let component: DieComponent;
  let fixture: ComponentFixture<DieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should generate random value when rolling', (done) => {
    component.sides = 6;
    component.isRolling$ = of(true);
    component.ngOnInit();
    if (component.value$ !== undefined) {
      component.value$.subscribe((value) => {
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(6);
        done();
      });
    }
  });

  it('should return correct die class', () => {
    component.sides = 4;
    expect(component.getDieClass()).toBe('triangle');
    component.sides = 6;
    expect(component.getDieClass()).toBe('square');
  });
});
