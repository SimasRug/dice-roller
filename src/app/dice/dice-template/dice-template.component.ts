import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DiceHistoryComponent } from './components/dice-history/dice-history.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dice-template',
  standalone: true,
  templateUrl: './dice-template.component.html',
  styleUrl: './dice-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DiceHistoryComponent, RouterOutlet, RouterLink, RouterLinkActive],
})
export class DiceTemplateComponent {}
