import { Routes } from '@angular/router';
import { DiceTemplateComponent } from './dice-template/dice-template.component';
export const routes: Routes = [
  { path: '', redirectTo: 'dice-roller', pathMatch: 'full' },
  {
    path: 'dice-roller',
    component: DiceTemplateComponent,
  },
];
