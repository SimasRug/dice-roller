import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DieComponent } from '../die/die.component';
import { FormsModule } from '@angular/forms';
import { SliderDisplayComponent } from '../slider-display/slider-display.component';
import { DiceSidesSelectorComponent } from '../dice-sides-selector/dice-sides-selector.component';
import { DieSides } from '../../models/types';
import { BehaviorSubject, delayWhen, startWith, timer } from 'rxjs';
import { DiceState } from '../../store/dice.reducers';
import { Store } from '@ngrx/store';
import { addToHistory, saveRoll } from '../../store/dice.actions';
import { Die } from '../../models/interfaces';
import { DiceActionsComponent } from '../dice-actions/dice-actions.component';

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  templateUrl: './dice-roller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './dice-roller.component.scss',
  imports: [
    CommonModule,
    DieComponent,
    FormsModule,
    SliderDisplayComponent,
    DiceSidesSelectorComponent,
    DiceActionsComponent,
  ],
})
export class DiceRollerComponent {
  constructor(private store: Store<DiceState>) {}

  dice: Die[] = [{ id: 0, sides: 6, value: 1 }];
  total: number | undefined;

  isRollingSubject = new BehaviorSubject<boolean>(false);
  saveDisabled = new BehaviorSubject<boolean>(true);

  isRolling$ = this.isRollingSubject.pipe(
    startWith(false),
    delayWhen((val) => (val ? timer(0) : timer(500)))
  );

  rollDice(): void {
    this.isRollingSubject.next(true);
    const total = this.dice.reduce((total, die) => {
      const value = Math.floor(Math.random() * die.sides) + 1;
      return total + value;
    }, 0);
    this.total = total;
    this.isRollingSubject.next(false);
    this.store.dispatch(addToHistory(this.getDiceSides(this.dice), total));
    this.saveDisabled.next(false);
  }
  diceCountChange(diceCount: number): void {
    if (diceCount > this.dice.length) {
      for (let i = this.dice.length; i < diceCount; i++) {
        this.dice.push({ id: i, sides: 6, value: 1 });
      }
    } else {
      this.dice = this.dice.slice(0, diceCount);
    }
  }

  dieSideChange(value: { id: number; sides: DieSides }): void {
    this.dice = this.dice.map((die) =>
      value.id === die.id ? { ...die, sides: value.sides } : die
    );
  }

  save(): void {
    if (this.total === undefined || this.total === 0) {
      return;
    }
    this.store.dispatch(saveRoll(this.getDiceSides(this.dice), this.total));
    this.saveDisabled.next(true);
  }
  getDiceSides(dice: Die[]): string {
    return dice.map((die) => `d${die.sides}`).join(' ');
  }

  trackByFn(_: number, die: Die): number {
    return die.id;
  }
}
