import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', redirectTo: 'dice-roller', pathMatch: 'full' },
  {
    path: 'dice-roller',
    loadComponent: () =>
      import('./dice-template/dice-template.component').then(
        (m) => m.DiceTemplateComponent
      ),
  },
];
