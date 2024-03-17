import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-display',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './slider-display.component.html',
  styleUrl: './slider-display.component.scss',
})
export class SliderDisplayComponent {
  @Output() countChange = new EventEmitter<number>();

  count = new FormControl(1);

  countValueChange(): void {
    this.countChange.emit(this.count.value || 1);
  }
}
