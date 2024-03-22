import { Component, Input } from '@angular/core';
import { DieSides } from '../../models/types';
import { CommonModule } from '@angular/common';
import { Observable, interval, map, of, startWith, switchMap } from 'rxjs';
@Component({
  selector: 'app-die',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './die.component.html',
  styleUrl: './die.component.scss',
})
export class DieComponent {
  @Input() sides: DieSides | undefined;
  @Input() value = 1;
  @Input() isRolling$: Observable<boolean> | undefined;

  value$: Observable<number> | undefined;

  ngOnInit() {
    this.value$ = this.isRolling$?.pipe(
      switchMap((isRolling) =>
        isRolling
          ? interval(100).pipe(map(() => this.getRandomValue()))
          : of(this.value)
      ),
      startWith(this.value)
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
