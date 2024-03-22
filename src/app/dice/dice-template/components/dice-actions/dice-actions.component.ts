import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SliderDisplayComponent } from "../slider-display/slider-display.component";

@Component({
    selector: 'app-dice-actions',
    standalone: true,
    templateUrl: './dice-actions.component.html',
    styleUrl: './dice-actions.component.scss',
    imports: [SliderDisplayComponent]
})
export class DiceActionsComponent {
  @Input() isRollDisabled = true;
  @Input() isSaveDisabled = true;

  @Output() rollDice = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() diceCountChange = new EventEmitter<number>();
}
