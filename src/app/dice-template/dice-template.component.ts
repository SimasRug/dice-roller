import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DiceHistoryComponent } from './components/dice-history/dice-history.component';
import { DiceRollerComponent } from './components/dice-roller/dice-roller.component';

@Component({
  selector: 'app-dice-template',
  standalone: true,
  templateUrl: './dice-template.component.html',
  styleUrl: './dice-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DiceHistoryComponent, DiceRollerComponent],
})
export class DiceTemplateComponent {}
