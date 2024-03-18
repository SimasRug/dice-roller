import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DieComponent } from '../die/die.component';
import { FormsModule } from '@angular/forms';
import { SliderDisplayComponent } from '../slider-display/slider-display.component';
import { DiceSidesSelectorComponent } from '../dice-sides-selector/dice-sides-selector.component';
import { DieSides } from '../../models/types';
import {
  BehaviorSubject,
  Observable,
  Subject,
  delayWhen,
  map,
  merge,
  pairwise,
  scan,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { DiceState } from '../../store/dice.reducers';
import { Store } from '@ngrx/store';
import { addToHistory, saveRoll } from '../../store/dice.actions';
import { Die } from '../../models/interfaces';

enum Action {
  Count = 'count',
  Sides = 'sides',
}

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  imports: [
    CommonModule,
    DieComponent,
    FormsModule,
    SliderDisplayComponent,
    DiceSidesSelectorComponent,
  ],
  templateUrl: './dice-roller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './dice-roller.component.scss',
})
export class DiceRollerComponent {
  constructor(private store: Store<DiceState>) {}

  // dice: Die[] = [{ id: 0, sides: 6, value: 1 }];
  total: number | undefined;

  isRollingSubject = new BehaviorSubject<boolean>(false);
  saveDisabled = new BehaviorSubject<boolean>(true);

  isRolling$ = this.isRollingSubject.pipe(
    startWith(false),
    delayWhen((val) => (val ? timer(0) : timer(500)))
  );

  roll = new Subject<void>();
  total$: Observable<number> = this.roll.pipe(
    switchMap(() => this.dice$),
    // map((dice) =>
    //   dice.reduce((total: number, die: Die) => {
    //     const value = Math.floor(Math.random() * die.sides) + 1;
    //     return total + value;
    //   }, 0)
    // )
  );

  private destroy$ = new Subject<void>();

  diceCount = new BehaviorSubject<number>(1);
  diceSidesChange = new Subject<{ id: number; sides: DieSides }>();
  dice$: Observable<Die[]> = merge(
    this.diceCount.pipe(
      map((diceCount) => ({ type: Action.Count, diceCount }))
    ),
    this.diceSidesChange.pipe(
      map((diceSidesChange) => ({ type: Action.Sides, diceSidesChange }))
    )
  ).pipe(
    takeUntil(this.destroy$),
    scan(
      (dice: Die[], action) => {
        if (action.type === Action.Count && 'diceCount' in action) {
          return this.updateDiceCount(action.diceCount, dice);
        }
        if (action.type === Action.Sides && 'diceSidesChange' in action) {
          return this.diceSidesUpdate(
            action.diceSidesChange.id,
            action.diceSidesChange.sides,
            dice
          );
        }
        return dice;
      },
      [{ id: 0, sides: 6, value: 1 }]
    )
  );

  updateDiceCount(diceCount: number, dice: Die[]): Die[] {
    let newDice = [...dice];
    if (diceCount > dice.length) {
      for (let i = dice.length; i < diceCount; i++) {
        newDice.push({ id: i, sides: 6, value: 1 });
      }
    } else {
      newDice = dice.slice(0, diceCount);
    }
    return newDice;
  }

  diceSidesUpdate(id: number, sides: DieSides, dice: Die[]): Die[] {
    return dice.map((die) => (id === die.id ? { ...die, sides } : die));

    // const { id, sides } = action.diceSidesChange;
    // const die = dice.find((die) => die.id === id);
    // if (die) {
    //   die.sides = sides;
    // }
  }
  // rollDice(): void {
  //   this.isRollingSubject.next(true);
  //   const total = this.dice.reduce((total, die) => {
  //     const value = Math.floor(Math.random() * die.sides) + 1;
  //     return total + value;
  //   }, 0);
  //   this.total = total;
  //   this.isRollingSubject.next(false);
  //   this.store.dispatch(addToHistory(this.getDiceSides(this.dice), total));
  //   this.saveDisabled.next(false);
  // }
  // diceCountChange(diceCount: number): void {
  //   console.warn('diceCountChange', diceCount);
  //   if (diceCount > this.dice.length) {
  //     for (let i = this.dice.length; i < diceCount; i++) {
  //       this.dice.push({ id: i, sides: 6, value: 1 });
  //     }
  //   } else {
  //     this.dice = this.dice.slice(0, diceCount);
  //   }
  // }

  // dieSideChange(value: { id: number; sides: DieSides }): void {
  //   this.dice = this.dice.map((die) =>
  //     value.id === die.id ? { ...die, sides: value.sides } : die
  //   );
  // }

  // save(): void {
  //   if (this.total === undefined || this.total === 0) {
  //     return;
  //   }
  //   this.store.dispatch(saveRoll(this.getDiceSides(this.dice), this.total));
  //   this.saveDisabled.next(true);
  // }
  getDiceSides(dice: Die[]): string {
    return dice.map((die) => `d${die.sides}`).join(' ');
  }

  trackByFn(_: number, die: Die): number {
    return die.id;
  }
}
