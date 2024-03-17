import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DieSides } from '../../models/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DIESIDES } from '../../models/constants';

@Component({
  selector: 'app-dice-sides-selector',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dice-sides-selector.component.html',
  styleUrl: './dice-sides-selector.component.scss',
})
export class DiceSidesSelectorComponent {
  dieSides = DIESIDES;

  ngOnInit(): void {
    // TODO: fix, Probably not the cleanest way to do this
    this.form.controls.sides.setValue(this.sides || 6);
  }
  @Input() sides: DieSides | undefined;
  @Input() id: number | undefined;

  @Output() sidesChange = new EventEmitter<{ id: number; sides: DieSides }>();

  form = new FormGroup({
    sides: new FormControl<DieSides>(6),
  });

  sidesValueChange(): void {
    if (this.id !== undefined && this.form.value.sides) {
      this.sidesChange.emit({
        id: this.id,
        sides: this.form.value.sides,
      });
    }
  }
}
