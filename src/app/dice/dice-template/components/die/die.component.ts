import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
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
  @Input() sides: DieSides | undefined;
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

  getDieClass(): string {
    switch (this.sides) {
      case 4:
        return 'triangle';
      case 6:
        return 'square';
      case 8:
        return 'hexagon';
      case 12:
        return 'octagon';
      case 20:
        return 'decagon';
      default:
        return '';
    }
  }
}
