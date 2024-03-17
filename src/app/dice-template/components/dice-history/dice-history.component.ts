import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DiceState,
  historySelector,
  savedSelector,
} from '../../store/dice.reducers';
import { Store } from '@ngrx/store';
import { ListType } from '../../models/enums';

@Component({
  selector: 'app-dice-history',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dice-history.component.html',
  styleUrl: './dice-history.component.scss',
})
export class DiceHistoryComponent {
  constructor(private store: Store<{ dice: DiceState }>) {}

  history$ = this.store.select(historySelector);
  saved$ = this.store.select(savedSelector);

  ListType = ListType;
  listType = ListType.HISTORY;

  showList(type: ListType): void {
    this.listType = type;
  }
}
