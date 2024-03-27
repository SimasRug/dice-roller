import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DieSides } from '../../models/types';
import { CommonModule } from '@angular/common';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  interval,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-die',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './die.component.html',
  styleUrl: './die.component.scss',
})
export class DieComponent {
  @Input() sides: DieSides = 6;
  DieSideClasses = {
    4: 'triangle',
    6: 'square',
    8: 'hexagon',
    12: 'octagon',
    20: 'decagon',
  } as const;
  @Input() set value(value: number) {
    this.valueSubject.next(value);
  }
  @Input() isRolling$: Observable<boolean> = of(false);

  valueSubject = new BehaviorSubject(1);
  value$: Observable<number> | undefined;

  ngOnInit() {
    this.value$ = combineLatest([this.isRolling$, this.valueSubject]).pipe(
      switchMap((val) => {
        const [isRolling, value] = val;
        return isRolling
          ? interval(100).pipe(map(() => this.getRandomValue()))
          : of(value);
      }),
      startWith(this.valueSubject.getValue())
    );
  }
  getRandomValue(): number {
    if (!this.sides) {
      return this.value;
    }
    return Math.floor(Math.random() * this.sides) + 1;
  }
}
