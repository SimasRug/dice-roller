import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice-history-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dice-history-list.component.html',
  styleUrl: './dice-history-list.component.scss',
})
export class DiceHistoryListComponent {
  @Input() history: { dice: string; total: number }[] | null = [];
}
