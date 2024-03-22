import {
  Component,
  ElementRef,
  Renderer2,
  WritableSignal,
  signal,
} from '@angular/core';
import { DieSides } from '../../models/types';
// @ts-ignore
import DiceBox from '@3d-dice/dice-box';
import { DiceSidesSelectorComponent } from '../dice-sides-selector/dice-sides-selector.component';
import { SliderDisplayComponent } from '../slider-display/slider-display.component';
import { CommonModule } from '@angular/common';
import { DiceActionsComponent } from '../dice-actions/dice-actions.component';
import { DiceState } from '../../store/dice.reducers';
import { Store } from '@ngrx/store';
import { addToHistory, saveRoll } from '../../store/dice.actions';

@Component({
  selector: 'app-dice3d-roller',
  standalone: true,
  templateUrl: './dice3d-roller.component.html',
  styleUrl: './dice3d-roller.component.scss',
  imports: [
    DiceSidesSelectorComponent,
    SliderDisplayComponent,
    CommonModule,
    DiceActionsComponent,
  ],
})
export class Dice3dRollerComponent {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store<DiceState>
  ) {}

  diceBox: any;
  dice: WritableSignal<{ id: number; sides: DieSides }[]> = signal([
    { id: 0, sides: 6 },
  ]);
  result: number | undefined;
  canSave: WritableSignal<boolean> = signal(false);
  canRoll: WritableSignal<boolean> = signal(true);

  ngAfterViewInit() {
    this.diceBox = new DiceBox('#dice-box', {
      assetPath: '/assets/dice-box/',
      theme: 'default',
      themeColor: '#92d500',
      offscreen: true,
    });

    const canvas = this.el.nativeElement.querySelector('canvas');
    if (canvas) {
      this.renderer.setStyle(canvas, 'width', '100%');
      this.renderer.setStyle(canvas, 'height', '100%');
    }
    this.diceBox.init();
  }

  async rollDice(): Promise<void> {
    this.canRoll.set(false);
    this.canSave.set(false);
    const rollItems = this.dice().map((die) => `1d${die.sides}`);
    const roll = await this.diceBox.roll(rollItems);
    this.result = roll.reduce(
      (total: number, die: any) => total + die.value,
      0
    );

    this.store.dispatch(
      addToHistory(
        rollItems.map((val) => val.substring(1)).join(' '),
        this.result ?? 0
      )
    );
    this.canRoll.set(true);
    this.canSave.set(true);
  }

  diceCountChange(diceCount: number): void {
    this.dice.update((val) => {
      if (diceCount > val.length) {
        for (let i = val.length; i < diceCount; i++) {
          val.push({ id: i, sides: 6 });
        }
      } else {
        val = val.slice(0, diceCount);
      }
      return val;
    });
  }

  diceSidesChange(die: { id: number; sides: DieSides }): void {
    this.dice.update((dice) => {
      dice[die.id] = die;
      return dice;
    });
  }

  save(): void {
    this.canSave.set(false);
    this.store.dispatch(
      saveRoll(
        this.dice()
          .map((die) => `d${die.sides}`)
          .join(' '),
        this.result ?? 0
      )
    );
  }

  trackByFn<T extends { id: number }>(_: number, item: T): number {
    return item.id;
  }
}
